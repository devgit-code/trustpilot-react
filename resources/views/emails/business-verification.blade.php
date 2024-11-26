<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        /* For email clients that support <style> tag */
        body {
            font-family: Arial, sans-serif;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1 style="font-size: 24px; color: #333;">Hello,</h1>
    <p style="font-size: 16px; color: #333;">Please click the button below to verify your business email address:</p>

    <!-- Use inline styles for better email client compatibility -->
    <a href="{{ $verificationUrl }}"
       class="button"
       style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; text-align: center;">
        Verify Email Address
    </a>

    <p style="font-size: 16px; color: #333;">If you did not register for this service, no further action is required.</p>
    <p style="font-size: 16px; color: #333;">Thank you!</p>
</body>
</html>
