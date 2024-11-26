import React, { useState } from "react";

const PhoneNumberInput = ({ onChange }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1"); // Default country code

    const handlePhoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setPhoneNumber(input);

        if (onChange) {
            onChange(`${countryCode}${input}`);
        }
    };

    const handleCountryCodeChange = (e) => {
        setCountryCode(e.target.value);

        if (onChange) {
            onChange(`${e.target.value}${phoneNumber}`);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Country Code Selector */}
            <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="p-2 border rounded"
            >
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+61">🇦🇺 +61</option>
                {/* Add more country codes as needed */}
            </select>

            {/* Phone Number Input */}
            <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                className="p-2 border rounded flex-1"
                maxLength={15} // Adjust maximum length as needed
            />
        </div>
    );
};

export default PhoneNumberInput;
