<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessCategory extends Model
{
    use HasFactory;
    protected $fillable = ['business_id', 'sub_category_id'];
    public $timestamps = false;

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    // public function subcategories()
    // {
    //     return $this->hasMany(SubCategory::class , 'category_id');
    // }
}
