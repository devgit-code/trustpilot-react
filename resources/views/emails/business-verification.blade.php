<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;

        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Hello,</h1>
    <p>Please click the button below to verify your business email address:</p>
    <a href="{{ $verificationUrl }}" class="button">Verify Email Address</a>
    <p>If you did not register for this service, no further action is required.</p>
    <p>Thank you!</p>
</body>
</html>
