<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessProfile extends Model
{
    use HasFactory;
    protected $primaryKey = 'business_id';
    public $timestamps = false;
    protected $fillable = [
        'description',
        'logo',
        'email',
        'phone',
        'location',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    protected $appends = array('img');

    public function getImgAttribute()
    {
        return $this->logo;
    }
}
