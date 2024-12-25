import React, { useState } from 'react';


export default function CompanyStatusFilter({ verified, onVerifyChange, claimed, onClaimChange }) {
    return (
        <div className="mt-6">
            <h3 className="font-semibold text-lg">Company Only</h3>
            <div className="flex justify-between mt-2">
                <label htmlFor="verified" className="text-gray-700">Verified</label>
                <input type="checkbox" id="verified" className="right-2" checked={verified == 'true'}
                    onChange={()=>onVerifyChange(!verified)}/>
            </div>
            <div className="flex justify-between mt-2">
                <label htmlFor="claimed" className="text-gray-700">Claimed</label>
                <input type="checkbox" id="claimed" className="right-2"checked={claimed == 'true'}
                    onChange={()=>onClaimChange(!claimed)}/>
            </div>
        </div>
    );
}
