<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Business;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = SubCategory::with('category')->get();

        $businesses = Business::latest()->take(4)->get();
        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        $reviews = Review::with('reply')->latest()->take(8)->get();
        $reviews = $reviews->map(function ($review, $index) {
            $review['user'] = [
                'name'=>$review->user->name,
                'avatar'=>$review->user->profile?->image,
            ];
            $review['company'] = [
                'id'=>$review->business->id,
                'name'=>$review->business->company_name,
                'website'=>$review->business->website,
                'logo'=>$review->business->profile?->logo,
            ];
            return $review;
        });

        return Inertia::render('Welcome/Index', [
            'data' => [
                'categories' => $categories,
                'businesses' => $businesses,
                'reviews' => $reviews,
            ]
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);
    }

    public function apiSearchHome(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $businesses = Business::where('role', 'owner')
            ->where('company_name', 'like', '%' . $searchTerm . '%')
            ->orWhere('website', 'like', '%' . $searchTerm . '%')
            ->orderBy('created_at', 'desc') // Order by creation date, optional
            ->limit(5) // Limit to 5 results
            ->get();

        $businesses = $businesses->map(function ($business, $index) {
            $business['logo'] = $business->profile?->logo;
            $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            $business['count_reviews'] = count($business->reviews);
            return $business;
        });

        $categories = Category::where('categories.name', 'like', '%' . $searchTerm . '%') // Specify table name explicitly
            ->select(
                'id',
                'name',
                'slug',
                'image',
                DB::raw('1 as is_category'),
                DB::raw('NULL as parent_category')
            );

        $sub_categories = SubCategory::where('sub_categories.name', 'like', '%' . $searchTerm . '%') // Specify table name explicitly
            ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
            ->select(
                'sub_categories.id',
                'sub_categories.name',
                'sub_categories.slug',
                'sub_categories.image',
                DB::raw('0 as is_category'),
                DB::raw('JSON_OBJECT("id", categories.id, "name", categories.name, "slug", categories.slug, "image", categories.image) as parent_category')
            );

        $results = $categories->union($sub_categories)
            ->orderBy('name', 'asc') // Sorting still works on the alias
            ->limit(3)
            ->get();

        $results->transform(function ($item) {
            if (isset($item->parent_category)) {
                $item->parent_category = json_decode($item->parent_category, true); // Convert to an array
            }
            return $item;
        });

        return response()->json([
            'companies' => $businesses,
            'categories' => $results,
        ]);
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

    public function apiAddCompany(Request $request)
    {
        try {
            $validated = $request->validate([
                'url' => [
                    'required',
                    'regex:/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/'
                ],
            ]);

            $searchTerm = $request->input('url', '');

            $businesses = Business::where('role', 'owner')
                ->where('website', 'like', '%' . $searchTerm)
                ->get();

            if(count($businesses))
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Already Registered Company',
                ]);
            }

            try {
                $response = Http::timeout(10)->get('http://' . $searchTerm);
                if($response->successful()){
                    $company_name = $this->extractCompanyName('http://' . $searchTerm);

                    $businesss = Business::create([
                        'website' => $searchTerm,
                        'company_name' => ucfirst($company_name),
                    ]);

                    return response()->json([
                        'success' => true,
                        'message' => $businesss->website,
                    ], 200);
                }else{
                    return response()->json([
                        'success' => false,
                        'message' => "Can't reach the website.",
                    ], 200);
                }
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => "Can't reach the website.",
                ], 200);
            }

            // $scriptPath = base_path('screen_check.js');
            // $command = "node $scriptPath ".$searchTerm;
            // $output = shell_exec($command);

            // if(trim($output) == 'false'){
            //     return response()->json([
            //         'success' => false,
            //         'message' => "Can't find the website.",
            //     ], 200);
            // }

            // $company_name = $this->extractCompanyName('https://' . $searchTerm);

            // $businesss = Business::create([
            //     'website' => $searchTerm,
            //     'company_name' => ucfirst($company_name),
            // ]);

            // return response()->json([
            //     'success' => true,
            //     'message' => $businesss->website,
            // ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'The url field format is invalid.',
            ], 200);
        }
    }

    public function search()
    {
        return Inertia::render('Welcome/Search');
    }

    public function show()
    {

    }

    public function update(Request $request)
    {

    }

    public function store(Request $request)
    {

    }
}
