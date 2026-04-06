import React from 'react';

const EditorialQuote: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-16 py-8 md:py-16 bg-transparent font-['Lexend_Giga'] flex flex-col items-center text-center">
      <div className="max-w-4xl space-y-8 md:space-y-12">
        {/* Main Heading */}
        <h2 className="text-xl md:text-3xl lg:text-4xl tracking-widest uppercase leading-tight text-black/90">
          The Art of Fewer, Better Choices
        </h2>

        {/* Philosophy Text */}
        <p className="text-[12px] md:text-sm lg:text-base leading-relaxed tracking-wide text-gray-600 font-light max-w-2xl mx-auto italic">
          Opting for quality over quantity means selecting timeless, durable, and responsibly 
          made items. This approach simplifies our lives and fosters a deeper appreciation for 
          our surroundings. Emphasizing longevity and responsible production resonates with 
          a more sustainable and mindful lifestyle.
        </p>

        {/* Optional: Minimalist Divider */}
        <div className="w-12 h1px bg-black/20 mx-auto mt-8"></div>
      </div>
    </section>
  );
};

export default EditorialQuote;