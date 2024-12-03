<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Contracts\Auth\CanResetPassword;
// use App\Notifications\BusinessVerifyEmail;
use App\Mail\BusinessVerificationMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class Business extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'website',
        'company_name',
        'first_name',
        'last_name',
        'job_title',
        'company_email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getEmailForVerification()
    {
        return $this->company_email;
    }

    public function sendEmailVerificationNotification()
    {
        $verificationUrl = URL::temporarySignedRoute(
            'admin.verification.verify',
            now()->addMinutes(60),
            ['id' => $this->id, 'hash' => sha1($this->company_email)]
        );
// Mail::raw('Test email', function ($message) {
//     $message->to('admin@eniyi.co')
//             ->subject('Test Email');
// });
        try {
            Mail::to($this->company_email)->send(new BusinessVerificationMail($verificationUrl));
            logger('Email sent successfully to @eniyi.co');
        } catch (\Exception $e) {
            logger('Email failed: ' . $e->getMessage());
        }

    }

    public function profile()
    {
        return $this->hasOne(BusinessProfile::class);
    }

    public function businessCategories()
    {
        return $this->hasMany(BusinessCategory::class)->with('subCategory');
    }

    public function primaryBusinessCategory()
    {
        return $this->hasOne(BusinessCategory::class)
            ->where('is_primary', true)
            ->with('subCategory');
    }
}
