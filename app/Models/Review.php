<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'rating', 'user_id', 'business_id', 'date_experience', 'is_product'];
    protected $hidden = [];
    // public $timestamps = false;

    protected $casts = [
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reply()
    {
        return $this->hasOne(Reply::class);
    }

    public function thumbs()
    {
        return $this->hasMany(ReviewThumb::class);
    }
}
