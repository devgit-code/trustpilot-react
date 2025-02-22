<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'business_id', 'slug'];
    protected $hidden = [];

    protected $casts = [
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
