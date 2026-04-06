import React from "react";
// Import images as modules to work with Vite
import newArrivalsImg from "../../assets/new-arrivals.jpg";
import casualEditImg from "../../assets/casual-edit.jpg";
import bestSellersImg from "../../assets/best-sellers.jpg";

const CategoryGrid: React.FC = () => {
  const categories = [
    { title: "New Arrivals", img: newArrivalsImg },
    { title: "The Casual Edit", img: casualEditImg },
    { title: "Best-Sellers", img: bestSellersImg },
  ];

  return (
    <section className="w-full px-4 md:px-10 pt-1 pb-10 bg-transparent font-['Lexend_Giga']">
      
      {/* Editorial Heading Section */}
      <div className="w-full py-8 md:py-10">
        <h2 className="text-[13px] md:text-[18px] leading-relaxed max-w-4xl text-black/80 font-medium">
          Elevate your lifestyle with a more intelligent, superior wardrobe.
          <br />
          <span>Our range is crafted sustainably with longevity in mind.</span>
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="relative group overflow-hidden h-[60vh] md:h-[70vh] bg-gray-100"
          >
            {/* Image with subtle hover zoom */}
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-1000ms ease-out"
            />
            
            {/* Text Overlay - Bottom Left (Figma Style) */}
            <div className="absolute inset-0 bg-black/5 flex items-end justify-start p-8">
              <h2 className="text-white text-[14px] md:text-[16px] uppercase tracking-[0.2em] drop-shadow-md">
                {cat.title}
              </h2>
            </div>

            {/* Subtle Gradient for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;