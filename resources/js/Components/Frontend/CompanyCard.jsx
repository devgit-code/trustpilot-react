import React from "react";
import logo from "../../../images/company-logo.png"
import { Badge, Button } from "@material-tailwind/react";
import {CheckIcon} from "@heroicons/react/24/outline";

function Card({ image, title, link, rating, reviews }) {
    return (
        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col group border border-gray-200 hover:bg-blue-100" style={{minWidth: '240px'}}>
            <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                <img src={logo} alt={title} className="w-20 object-cover rounded border-2 border-white" />
                <span class="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute -top-1 -right-1"></span>
            </div>
<span width="50" height="50"><i class="fa-thin fa-shield-check"></i></span>
<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4CAF50" d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
  <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
</svg>


    <Badge
      content={<CheckIcon className="h-4 w-4 text-white" strokeWidth={2.5} />}
      className="bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20"
    >
      <Button>Notifications</Button>
    </Badge>

            <h3 className="text-lg font-semibold">{title}</h3>
            <a href={link} className="text-sm text-gray-500">
                {link.replace("https://", "").replace("www.", "")}
            </a>
            <div className="flex items-center mt-3 space-x-1">
                <div className="flex space-x-1">
                    {/* Add star icons or other rating symbols as needed */}
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                </div>
                <span className="text-gray-700 font-semibold">{rating}</span>
                <span className="text-gray-400">({reviews})</span>
            </div>
        </div>
    );
}

export default Card;
