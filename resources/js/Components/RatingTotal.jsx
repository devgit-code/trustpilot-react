import React from "react";

function RatingTotal({ className, total=0}) {
    function formatReviewTotal(total) {
        if (total >= 1_000_000) {
            return (total / 1_000_000).toFixed(1) + "M";
        } else if (total >= 1_000) {
            return (total / 1_000).toFixed(1) + "K";
        } else {
            return total.toString();
        }
    }
    return (
        <span className={`${className} `}>
        {formatReviewTotal(total)}
        </span>
    );
}

export default RatingTotal;
