import React from "react";
import logo from "../../../images/company-logo.png"
import { Badge, Button } from "@material-tailwind/react";
import {CheckIcon} from "@heroicons/react/24/outline";

function Card({ image, title, link, rating, reviews }) {
    return (
        <div className="bg-white rounded-lg p-4 m-2 flex flex-col group border border-gray-200 hover:shadow-2xl" style={{minWidth: '240px', boxShadow: '0 .125rem .25rem rgba(0, 0, 0, .075)'}}>
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


            {/* Rating Section */}
            <div className="flex items-center mt-4 space-x-1">
                {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${
                    index < rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.258L12 18.9l-7.417 4.955L6 15.596 0 9.748l8.332-1.73L12 .587z" />
                </svg>
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
                <span className="text-xs text-gray-500">({reviews})</span>
            </div>
        </div>
    );
}

export default Card;
