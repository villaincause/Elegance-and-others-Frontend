import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedMenuImg from "../../assets/menu-feature.jpg"; 

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void; // Added for hover persistence
  onMouseLeave: () => void; // Added for hover persistence
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      style={{ backgroundColor: 'var(--color-brand-bg)' }}
      onMouseEnter={onMouseEnter} // Keep menu open when mouse moves into it
      onMouseLeave={onMouseLeave} // Close menu when mouse leaves it
      className={`absolute top-24 left-0 w-full border-b border-black/5 transition-all duration-500 ease-in-out overflow-y-auto z-40 ${
        isOpen ? "max-h-[100vh] md:max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full px-6 py-8 md:px-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 font-['Lexend_Giga']">
        
        {/* Categories Column */}
        <div className="col-span-1 md:col-span-3 space-y-4 md:space-y-6">
          <h3 className="text-gray-600 text-[14px] md:text-[15px] uppercase tracking-widest font-bold mb-4 md:mb-8 border-b border-black/5 pb-2">Categories</h3>
          <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] uppercase tracking-tighter">
            {[
              { name: 'Outerwear', slug: 'Outerwear' },
              { name: 'Knitwear', slug: 'Knitwear' },
              { name: 'Pants', slug: 'Pants' },
              { name: 'Dresses', slug: 'Dresses' }
            ].map((item) => (
              <li key={item.name} className="hover:pl-2 transition-all duration-300 cursor-pointer">
                <Link to={item.slug ? `/shop?category=${item.slug}` : '/shop'} className="block w-full">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Column */}
        <div className="col-span-1 md:col-span-3 space-y-4 md:space-y-6">
          <h3 className="text-gray-600 text-[14px] md:text-[15px] uppercase tracking-widest font-bold mb-4 md:mb-8 border-b border-black/5 pb-2">Featured</h3>
          <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] uppercase tracking-tighter">
            <li>
              <Link to="/shop" className="hover:pl-2 transition-all duration-300 block">Bestsellers</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:pl-2 transition-all duration-300 block">Most Popular</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:pl-2 transition-all duration-300 block">Trending Now</Link>
            </li>
          </ul>
        </div>

        {/* Collections Column */}
        <div className="col-span-1 md:col-span-3 space-y-4 md:space-y-6">
          <h3 className="text-gray-600 text-[14px] md:text-[15px] uppercase tracking-widest font-bold mb-4 md:mb-8 border-b border-black/5 pb-2">Collections</h3>
          <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] uppercase tracking-tighter">
            {['Office looks', 'Online Exclusive', 'Basics'].map((item) => (
              <li key={item} className="hover:pl-2 transition-all duration-300 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Image Feature Column */}
        <div className="col-span-1 md:col-span-3 h-[250px] md:h-[350px] overflow-hidden group relative">
          <img 
            src={FeaturedMenuImg} 
            alt="New Collection" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <Link to="/shop" className="text-white text-[10px] md:text-xs uppercase tracking-[0.3em] border-b border-white pb-1">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;