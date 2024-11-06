import React from 'react';

function Article() {
    return (
        <div className="max-w-3xl mx-auto p-2 bg-white text-gray-900">
            <img
                src="/storage/images/blog/Disability_insurance.webp" // Replace with your image path
                alt="Spring cleaning"
                className="min-w-96 h-auto object-cover"
                />

            {/* Intro Section */}
            <section className="mb-8 mt-5">
                <p className="text-lg font-semibold">
                Humans are very emotionally driven creatures. Often, the shopping experiences that stick out in our minds are the ones that brought us so much joy that we couldn’t contain it — and the ones that made us never want to shop again...
                </p>
            </section>

            {/* Leave Honest Reviews Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Leave honest, specific, and good reviews for your fellow consumers
                </h2>
                <p className="text-gray-700 mb-4">
                There are more brands than ever to choose from, but when you don’t have prior experience buying from a company, it can be easy to feel weary and unsure — which is why good reviews are so important...
                </p>
                <p className="text-gray-700 mb-4">
                But what happens when we only review our best and worst experiences and don’t share those experiences that lie somewhere between perfection and despicable?
                </p>
                <blockquote className="bg-gray-100 border-l-4 border-blue-500 text-gray-700 p-4 italic my-4">
                “More and more people are getting suspicious of 5-star ratings,” says Professor Karen Cook, Director of the Institute of Research for Social Sciences at Stanford University.
                </blockquote>
                <p className="text-gray-700 mb-4">
                In a <span className="text-blue-600 underline">2020 survey</span> we conducted with Canvas8, we found that 53% of consumers selected a mix of positive and negative reviews as their top prompt to purchase...
                </p>
            </section>

            {/* Importance of 2, 3, and 4-star reviews */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Honest and constructive reviews are good reviews — and they help brands be better for their customers
                </h2>
                <p className="text-gray-700">
                Part of the reason we are so wary of 5-star reviews is that we want to know the worst-case scenario with a purchase...
                </p>
            </section>
        </div>
    );
}

export default Article;
