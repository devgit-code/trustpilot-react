import React, { useState } from "react";

const DynamicCompanyEmailForm = () => {
  const [website, setWebsite] = useState("");
  const [workEmailDomain, setWorkEmailDomain] = useState("");

  const handleWebsiteChange = (e) => {
    const url = e.target.value;
    setWebsite(url);

    // Extract domain dynamically
    try {
      const hostname = new URL(url).hostname; // Extract hostname (e.g., "example.com")
      const domain = hostname.replace(/^www\./, ""); // Remove "www." if present
      setWorkEmailDomain(`@${domain}`);
    } catch {
      setWorkEmailDomain(""); // Reset domain if the URL is invalid
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Website Input */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          value={website}
          onChange={handleWebsiteChange}
          placeholder="https://example.com"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Work Email */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Work email
        </label>
        <div className="flex items-center w-full p-2 border rounded-md">
          <input
            type="text"
            placeholder="Your name"
            className="flex-1 outline-none"
          />
          <span className="text-gray-500">
            {workEmailDomain || "@domain.com"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DynamicCompanyEmailForm;
