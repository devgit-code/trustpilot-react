<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Business;

class OwnerController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Owner/Index');
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
            // $business['trustscore'] = number_format($business->reviews->avg('rating'), 1);
            // $business['reviews_count'] = count($business->reviews);
            // $business['count_products'] = count($business->products);
            // $business['categories'] = $business->businessCategories;
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

    public function destroy(String $business)
    {
        $business = Business::findOrFail($business);

        $business->company_email=null;
        $business->first_name=null;
        $business->last_name=null;
        $business->job_title=null;
        $business->email_verified_at=null;
        $business->message=null;
        $business->is_approved=0;
        $business->save();

        return redirect()->route('admin.owners.index')->with('success', 'Owner info cleared successfully.');
    }

    public function approve(String $id)
    {
        $business = Business::findOrFail($id);

        $business->is_approved=1;
        $business->save();

        return redirect()->route('admin.owners.index')->with('success', 'Owner info cleared successfully.');
    }

    public function update(Request $request, String $business)
    {
        $business = Business::findOrFail($business);

        $company_email = $request->input('company_email');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $job_title = $request->input('job_title');
        $verified = $request->input('verified');

        $business->company_email = $company_email;
        $business->first_name = $first_name;
        $business->last_name = $last_name;
        $business->job_title = $job_title;

        if ($business->isDirty('company_email')) {
            $business->email_verified_at = null;
            $business->is_approved = 0;

            $companyDomain = preg_replace('/^www\./', '', $business->website);  // Remove 'www.' prefix from the domain if present
            $emailDomain = substr(strrchr($business->company_email, "@"), 1); // Extract part after '@'
            if ($emailDomain == $companyDomain) {
                $business->markEmailAsVerified();
            }
        }

        if($verified == 'true')
        {
            if($business->company_email)
                $business->markEmailAsVerified();
        }
        else
            $business->email_verified_at = null;
        $business->save();

        return redirect()->route('admin.owners.index');
    }

}
