import React from 'react';
import { Facebook } from 'lucide-react';

// Using .jpg imports as per your preferred method
import fb1 from '../../assets/fb-1.jpg';
import fb2 from '../../assets/fb-2.jpg';
import fb3 from '../../assets/fb-3.jpg';
import fb4 from '../../assets/fb-4.jpg';
import fb5 from '../../assets/fb-5.jpg';

const socialImages = [fb1, fb2, fb3, fb4, fb5];

const SocialFeed: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 py-20 bg-transparent font-['Lexend_Giga']">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-2">
          Shop Facebook
        </h2>
      </div>

      {/* 5-Column Grid - Edge-to-Edge DNA */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {socialImages.map((img, index) => (
          <a 
            key={index} 
            href="https://www.facebook.com/others3legance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group aspect-square overflow-hidden bg-gray-100"
          >
            <img 
              src={img} 
              alt={`Facebook feature ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Hover Overlay with Facebook Icon */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Facebook className="text-white" size={24} strokeWidth={1.2} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialFeed;