<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessOwner extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id',
        'first_name',
        'last_name',
        'job_title',
        'company_email',
        'password',
        'message',
    ];

    public function business()
    {
        return $this->belongsToMany(Business::class);
    }
}
