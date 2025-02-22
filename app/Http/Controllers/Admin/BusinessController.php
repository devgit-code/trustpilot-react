<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\BusinessCategory;
use App\Models\BusinessProfile;
use App\Models\Review;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Business/Index');
    }

    public function apiIndex(Request $request)
    {
        $page = $request->input('page', 1); // Default to page 1
        $searchTerm = $request->input('search');

        $query = Business::query()->where('role', 'owner')->with(['profile']);

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('company_name', 'like', "%{$searchTerm}%");
                    // ->where('company_name', 'like', "%{$searchTerm}%");
            });
        }

        $query->orderByDesc('updated_at');
        // Paginate the results
        $data = $query->paginate(10, ['*'], 'page', $page);
        $businesses = collect($data->items())->map(function ($business, $index) {
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['reviews_count'] = count($business->reviews);
            $business['count_products'] = count($business->products);
            $business['categories'] = $business->businessCategories;
            return $business;
        });

        return response()->json([
            'businesses' => $businesses,
            'filters' => $request->only('page', 'search'),
            'pagination' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'links' => [
                    'first' => $data->url(1),
                    'last' => $data->url($data->lastPage()),
                    'next' => $data->nextPageUrl(),
                    'prev' => $data->previousPageUrl(),
                ],
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Business/Create');
    }

    public function extractCompanyName($url) {
        // Parse the URL to get the host
        $host = parse_url($url, PHP_URL_HOST);

        if (!$host) {
            return 'Example'; // Return null if the URL is invalid
        }

        // Remove 'www.' or other common subdomains
        $host = preg_replace('/^www\./', '', $host);

        // Split the host into parts
        $parts = explode('.', $host);

        // Handle domains with multi-segment TLDs (e.g., '.com.tr', '.co.uk')
        if (count($parts) > 2) {
            $companyName = $parts[count($parts) - 3]; // Get the second-to-last segment
        } else {
            $companyName = $parts[0]; // Get the first part of the domain
        }

        return $companyName;
    }

    public function checkDomain(String $domain)
    {
        $pattern = '/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/';

        if (!preg_match($pattern, $domain)) {
            return 'wrong domain input';
        }

        $businesses = Business::where('role', 'owner')
            ->where('website', 'like', '%' . $domain)
            ->get();

        if(count($businesses))
        {
            return 'already exist domain';
        }

        try {
            $response = Http::timeout(10)->get('http://' . $domain);

            if($response->successful()){
                $company_name = $this->extractCompanyName('http://' . $domain);

                $businesss = Business::create([
                    'website' => $domain,
                    'company_name' => ucfirst($company_name),
                ]);

                return 'success';
            }else{
                return "can't reach to this site";
            }
        } catch (\Exception $e) {
            return "can't reach to this site";
        }

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'companies' => 'required',
        ]);

        $companiesArray = explode("\n", $validated['companies']);
        $companiesArray = array_map('trim', $companiesArray);
        $companiesArray = array_filter($companiesArray);

        $results = array_map(function($domain) {
            return [
                'domain' => $domain,
                'status' => $this->checkDomain($domain)
            ];
        }, $companiesArray);

        return Inertia::render('Admin/Business/Create', [
            'results' => $results
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $website)
    {
        $business = Business::where('website', $website)->with('profile', 'businessCategories')->first();

        $products = $business->products;
        $products = $products->map(function ($product, $index) {
            $product['trustscore'] = number_format(Review::where('is_product', $product->id)->avg('rating'), 1);
            $product['count_reviews'] = count(Review::where('is_product', $product->id)->get());
            return $product;
        });

        $sub_categories = SubCategory::all();
        $categories = $business->businessCategories;    //primaryBusinessCategory

        return Inertia::render('Admin/Business/Show', [
            'business' => $business,
            'has_reviews' => count($business->reviews),
            'trustscore' => number_format($business->reviews->avg('rating'), 1),
            'products' => $products,
            'sub_categories' => $sub_categories,
            'categories' => $categories,
        ]);
    }


    public function edit(String $id)
    {
        //
    }


    public function apiDetail(Request $request, string $id)
    {
        $business = Business::where('id', $id)->with('profile')->first();

        $page = $request->input('page', 1); // Default to page 1
        $sortOrder = $request->input('sort_by_date', 'desc');
        $rating = $request->input('rating');
        $searchTerm = $request->input('search');

        $query = Review::query()->where('business_id', $business->id)->with(['user', 'business']);

        if ($rating) {
            $query->where('rating', $rating);
        }

        if($searchTerm){
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                        $userQuery->where('name', 'like', "%{$searchTerm}%");
                    });
                    // ->orWhereHas('business', function ($businessQuery) use ($searchTerm) {
                    //     $businessQuery->where('name', 'like', "%{$searchTerm}%");
                    // });
            });
        }

        $query->orderBy('date_experience', $sortOrder);

        // Paginate the results
        $reviews = $query->paginate(10, ['*'], 'page', $page);

        return response()->json([
            'reviews' => $reviews->items(),
            'filters' => $request->only('sort_by_date', 'rating'),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
                'links' => [
                    'first' => $reviews->url(1),
                    'last' => $reviews->url($reviews->lastPage()),
                    'next' => $reviews->nextPageUrl(),
                    'prev' => $reviews->previousPageUrl(),
                ],
            ],
        ]);

    }

    public function update(Request $request)
    {

    }

    public function verify(Request $request, string $business)
    {
        $business = Business::findOrFail($business);
        $business->markEmailAsVerified();

        $companyDomain = preg_replace('/^www\./', '', $business->website);  // Remove 'www.' prefix from the domain if present
        $emailDomain = substr(strrchr($business->company_email, "@"), 1); // Extract part after '@'
        if ($emailDomain == $companyDomain) {
            $business->is_approved = 1;
        }
        $business->save();

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function approve(Request $request, string $business)
    {
        $business = Business::findOrFail($business);
        $business->is_approved = 1;
        $business->save();

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function change(Request $request, string $business)
    {
        $business = Business::findOrFail($business);
        $businessProfile = $business->profile;

        $company_email = $request->input('company_email');
        $company_name = $request->input('company_name');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $job_title = $request->input('job_title');

        if (
            $business->company_email !== $company_email ||
            $business->company_name !== $company_name ||
            $business->first_name !== $first_name ||
            $business->last_name !== $last_name ||
            $business->job_title !== $job_title
        ) {
            $business->company_email = $company_email;
            $business->company_name = $company_name;
            $business->first_name = $first_name;
            $business->last_name = $last_name;
            $business->job_title = $job_title;

            if ($business->isDirty('company_email')) {
                $business->email_verified_at = null;
                $business->is_approved = 0;
            }

            $business->save();
        }

        if (!$businessProfile) {
            $businessProfile = new BusinessProfile();
            $businessProfile->business_id = $business->id;
        }

        $email = $request->input('email');
        $phone = $request->input('phone');
        $country = $request->input('country');
        $city = $request->input('city');
        $location = $request->input('location');

        if (
            $businessProfile->email !== $email ||
            $businessProfile->phone !== $phone ||
            $businessProfile->country !== $country ||
            $businessProfile->city !== $city ||
            $businessProfile->location !== $location
        ) {
            $existingBusinessProfile = BusinessProfile::where('business_id', $business->id)->first();

            if ($existingBusinessProfile) {
                $existingBusinessProfile->email = $email;
                $existingBusinessProfile->phone = $phone;
                $existingBusinessProfile->country = $country;
                $existingBusinessProfile->city = $city;
                $existingBusinessProfile->location = $location;

                if ($request->hasFile('image')) {
                    $extension = $request->file('image')->getClientOriginalExtension();
                    $imageName = "BusinessProfile-" . now()->timestamp . "." . $extension;
                    $path = $request->file('image')->storeAs('images/logo', $imageName, 'public');
                    $existingBusinessProfile["logo"] = $imageName;
                }

                $existingBusinessProfile->save();
            } else {
                $businessProfile->email = $email;
                $businessProfile->phone = $phone;
                $businessProfile->country = $country;
                $businessProfile->city = $city;
                $businessProfile->location = $location;

                if ($request->hasFile('image')) {
                    $extension = $request->file('image')->getClientOriginalExtension();
                    $imageName = "BusinessProfile-" . now()->timestamp . "." . $extension;
                    $path = $request->file('image')->storeAs('images/logo', $imageName, 'public');
                    $businessProfile["logo"] = $imageName;
                }

                $businessProfile->save();
            }
            return redirect()->route('admin.businesses.show', $business->website)->with('status', 'Profile information updated successfully');
        }

        return redirect()->route('admin.businesses.show', $business->website);

    }

    public function destroy(Business $business)
    {
        $business->delete();
        return redirect()->route('admin.businesses.index')->with('success', 'Business deleted successfully.');
    }

    public function productAdd(Request $request, String $business)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $business = Business::findOrFail($business);
        $validated['business_id'] = $business->id;
        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "product-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/product', $imageName, 'public');
            $validated['image'] = $path; // Add the avatar path to the validated data
        }

        $product = Product::create($validated);

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function productUpdate(Request $request, String $business, String $product)
    {
        $validated = $request->validate([
            "name" => "required|string|max:255",
        ]);

        $business = Business::findOrFail($business);
        $product = Product::findOrFail($product);

        $product->name = $request->input('name');
        $product->slug = Str::slug($request->input('name'));

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = "product-" . now()->timestamp . "." . $extension;
            $path = $request->file('image')->storeAs('images/product', $imageName, 'public');
            $product->image = $path; // Add the avatar path to the validated data
        }

        $product->save();

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function productDelete(Request $request, String $business, Product $product)
    {
        $product->delete();
        $business = Business::findOrFail($business);

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function categoryAdd(Request $request, String $business)
    {
        $business = Business::findOrFail($business);

        $creationData = [
            "sub_category_id" => $request->input('id'),
            "business_id" => $business->id,
        ];

        $businessCat = BusinessCategory::create($creationData);
        if(count($business->businessCategories) === 1) //only one
        {
            $businessCat->is_primary = true;
            $businessCat->save();
        }

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function categoryRemove(Request $request, String $business, BusinessCategory $category)
    {
        $business = Business::findOrFail($business);

        $category->delete();

        $primaryCategory = $business->primaryBusinessCategory;
        if(!$primaryCategory){
            $firstCategory = $business->businessCategories->first();

            if ($firstCategory) {
                $firstCategory->is_primary = true;
                $firstCategory->save();
            }
        }

        return redirect()->route('admin.businesses.show', $business->website);
    }

    public function categoryPrimary(Request $request, String $business, String $category)
    {
        $business = Business::findOrFail($business);

        $primaryCategory = $business->primaryBusinessCategory;

        if($primaryCategory)
        {
            $primaryCategory->is_primary = false;
            $primaryCategory->save();
        }

        $category = BusinessCategory::findOrFail($category);
        $category->is_primary = true;
        $category->save();

        return redirect()->route('admin.businesses.show', $business->website);
    }
}
