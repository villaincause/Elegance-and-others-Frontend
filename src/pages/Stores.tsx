import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const STORES = [
  {
    city: "New York",
    name: "SoHo Flagship",
    address: "124 Prince Street, New York, NY 10012",
    phone: "+1 (212) 555-0198",
    hours: "Mon-Sat: 11am - 7pm | Sun: 12pm - 6pm",
    image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&q=80&w=1000"
  },
  {
    city: "London",
    name: "Mayfair Boutique",
    address: "42 Bruton Place, London W1J 6PA",
    phone: "+44 20 7946 0123",
    hours: "Mon-Sat: 10am - 6pm | Sun: Closed",
    image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=1000"
  },
  {
    city: "Paris",
    name: "Le Marais",
    address: "18 Rue Vieille du Temple, 75004 Paris",
    phone: "+33 1 42 74 20 20",
    hours: "Tue-Sun: 11am - 7pm",
    image: "https://images.unsplash.com/photo-1555529771-7888783a18d3?auto=format&fit=crop&q=80&w=1000"
  }
];

const Stores: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        
        {/* Page Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4">Visit Us</p>
          <h1 className="text-[28px] md:text-[40px] uppercase tracking-[0.6em] font-bold">Our Stores</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Featured Image (Sticky on Desktop) */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-40">
            <div className="aspect-[4/5] overflow-hidden bg-white shadow-sm border border-white/50">
              <img 
                src={STORES[0].image} 
                alt="Store Interior" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-gray-500 italic">
              Our spaces are designed to reflect the same quiet luxury as our collections.
            </p>
          </div>

          {/* Right: Store Locations List */}
          <div className="w-full lg:w-1/2 space-y-12">
            {STORES.map((store, index) => (
              <div 
                key={index} 
                className="group bg-white/40 backdrop-blur-sm p-10 border border-white/20 hover:bg-white transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold block mb-2">
                      {store.city}
                    </span>
                    <h2 className="text-[18px] uppercase tracking-[0.3em] font-bold">{store.name}</h2>
                  </div>
                  <div className="w-8 h-[1px] bg-black mt-4 group-hover:w-16 transition-all duration-500"></div>
                </div>

                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-4">
                    <MapPin size={16} strokeWidth={1} className="mt-1" />
                    <p className="text-[11px] uppercase tracking-widest leading-relaxed">{store.address}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={16} strokeWidth={1} />
                    <p className="text-[11px] uppercase tracking-widest">{store.phone}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={16} strokeWidth={1} />
                    <p className="text-[11px] uppercase tracking-widest">{store.hours}</p>
                  </div>
                </div>

                <button className="mt-10 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:text-blue-400 hover:border-blue-400 transition-colors">
                  Get Directions
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Stores;