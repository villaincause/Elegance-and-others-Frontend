import React from "react";
import promoImg from "../../assets/img1.jpg";
import { Link } from 'react-router-dom';

const PromoSection: React.FC = () => {
  return (
    <section
      /* Added mt-[141px] to push the section below the fixed header */
      className="w-full mt-[141px] h-[calc(85vh-141px)] bg-cover bg-center flex items-end justify-start overflow-hidden relative font-['Lexend_Giga']"
      style={{ backgroundImage: `url(${promoImg})` }}
    >
      {/* Subtle overlay for text contrast */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <div className="w-full px-6 md:px-16 pb-16 relative z-10">
        <div className="max-w-4xl text-white">
          <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase leading-[1.1] font-medium text-white">
            Elevate Your Style
            <br />
            <span className="opacity-90">Timeless Fashion,</span>
            <br />
            <span className="opacity-90">Sustainable Choices</span>
          </h2>

          <Link to="/shop">
            <button className="bg-white text-black mt-10 px-8 py-4 text-[14px] font-bold uppercase tracking-[0.3em] hover:bg-gray-100 transition-all duration-300 active:scale-95 border-none outline-none">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;