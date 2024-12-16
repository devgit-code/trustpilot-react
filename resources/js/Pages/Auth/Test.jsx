import React, { useRef } from "react";


const CardContainer = ({ cards }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300; // Adjust scroll amount as needed
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* If no cards, show 'No Cards' message */}
      {cards.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500">
          No cards
        </div>
      ) : (
        <div className="relative">
          {/* Left Scroll Button */}
          {cards.length > 4 && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
            >
              &#8592;
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={containerRef}
            className={`flex items-center gap-5 ${
              cards.length < 4 ? "justify-center" : "justify-start"
            } overflow-hidden`}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-1/4 min-w-[200px] h-60 bg-white rounded-lg shadow p-4 mb-3 flex flex-col items-center justify-between"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          {cards.length > 4 && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
            >
              &#8594;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mockCards = [
];

const Index = () => {
    return (
        <>
            <CardContainer cards={mockCards}/>
        </>
    )
}
export default Index;
