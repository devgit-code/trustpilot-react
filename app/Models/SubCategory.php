<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'image', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function businesses()
    {
        return $this->hasManyThrough(
            Business::class,
            BusinessCategory::class,
            'sub_category_id', // Foreign key on BusinessSubCategoriesRelation table
            'id',              // Foreign key on Businesses table
            'id',              // Local key on SubCategories table
            'business_id'      // Local key on BusinessSubCategoriesRelation table
        );
    }

}
