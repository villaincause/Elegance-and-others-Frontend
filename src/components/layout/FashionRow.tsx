import React from "react";
import { Plus } from "lucide-react"; // Matching the Figma '+' icon

// Import .jpg assets as per preference
import cottonTop from "../../assets/cotton-top.jpg";
import cropHoodies from "../../assets/crop-hoodies.jpg";
import bowSkirt from "../../assets/bow-skirt.jpg";
import cottonShirt from "../../assets/cotton-shirt.jpg";
import cropJacket from "../../assets/crop-jacket.jpg";

const products = [
  { name: "Cotton Top", img: cottonTop },
  { name: "Crop Hoodies", img: cropHoodies },
  { name: "Bow Skirt", img: bowSkirt },
  { name: "Cotton shirt", img: cottonShirt },
  { name: "Crop Jacket", img: cropJacket },
];

const FashionRow: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 pt-2 pb-12 bg-transparent font-['Lexend_Giga']">
      
      {/* Editorial Heading */}
      <div className="w-full mb-6">
        <h2 className="text-[15px] md:text-[18px] uppercase tracking-[0.2em] font-bold border-b border-black/5 pb-4">
          What to Wear Now
        </h2>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-start group cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-3/4 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Quick Add Icon from Figma (+) */}
              <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm hover:bg-white">
                <Plus size={18} strokeWidth={1.5} className="text-black" />
              </button>
            </div>

            {/* Product Meta */}
            <div className="mt-4 space-y-1">
              <p className="text-[13px] md:text-[14px] text-gray-900 uppercase tracking-tight leading-tight">
                {product.name}
              </p>
              {/* Added a placeholder price to match the "Best-Sellers" aesthetic in Figma */}
              <p className="text-[12px] text-gray-600 font-medium">Coming Soon</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FashionRow;