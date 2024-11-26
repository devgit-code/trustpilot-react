<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class BusinessVerifyEmail extends BaseVerifyEmail
{
    public function toMail($notifiable)
    {
        // Generate the verification URL
        $verificationUrl = $this->verificationUrl($notifiable);

// Generate the signed verification URL
        $verificationUrl = URL::temporarySignedRoute(
            'admin.verification.verify',
            now()->addMinutes(60),
            ['id' => $notifiable->id, 'hash' => sha1($notifiable->company_email)]
        );

Mail::to($notifiable->company_email)->send(new BusinessVerificationMail($verificationUrl));
        Mail::raw("Click here to verify your email: $verificationUrl", function ($message) use ($notifiable) {
            $message->to($notifiable->company_email)
                    ->subject('Verify Your Business Email');
        });

        // return (new MailMessage)
        //     ->subject('Verify Your Business Email Address')
        //     ->greeting('Hello!')
        //     ->line('Please click the button below to verify your business email address.')
        //     ->action('Verify Email Address', $verificationUrl)
        //     ->line('If you did not register your business, no further action is required.');
    }
}
