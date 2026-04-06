import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';
import FashionRow from '../components/layout/FashionRow';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Updated to use the backend image server logic
  const resolveImagePath = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Assuming your images are served from http://localhost:5000/images/
    return `http://localhost:5000/images/${path}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
        <h1 className="text-[14px] uppercase tracking-[0.4em] mb-8 opacity-40">Your bag is empty</h1>
        <Link to="/shop" className="text-[10px] uppercase tracking-[0.2em] underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-32 font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        
        {/* Centered Title */}
        <div className="text-center mb-24">
          <h1 className="text-[22px] md:text-[28px] uppercase tracking-[0.6em] font-bold">Shopping Bag</h1>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          
          {/* Left: Product Grid */}
          <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
            {cartItems.map((item: CartItem) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-6 shadow-sm border border-white/50 flex flex-col h-full">
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-50 mb-6">
                  <img 
                    src={resolveImagePath(item.imageUrl)} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h3 className="text-[11px] uppercase font-bold tracking-tight">{item.name}</h3>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                        {item.selectedSize} / {item.selectedColor.name}
                      </p>
                    </div>
                    <p className="text-[13px] font-bold">${item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center border border-gray-100 px-3 py-1 gap-4">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="hover:text-gray-400 text-black">
                        <Minus size={12} />
                      </button>
                      <span className="text-[11px] font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="hover:text-gray-400 text-black">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)} 
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-[25%] lg:ml-auto">
            <div className="p-10 bg-white shadow-sm border border-white/50 space-y-10">
              <h2 className="text-[11px] uppercase font-bold tracking-[0.4em] border-b border-gray-100 pb-6">Order Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span className="text-black italic tracking-normal">Calculated Next</span>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex justify-between items-end">
                <span className="text-[11px] uppercase font-bold tracking-widest">Total</span>
                <span className="text-3xl font-bold tracking-tighter">${cartTotal.toFixed(2)}</span>
              </div>

              {/* Connected to Checkout Route */}
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                Checkout Now
              </button>
              
              <p className="text-[8px] text-gray-300 text-center uppercase tracking-widest leading-relaxed">
                Secure SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="mt-40 border-t border-black/5 pt-20">
          <div className="mb-12">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Enhance your style</p>
            <h2 className="text-[18px] uppercase tracking-[0.4em] font-bold">Complete the Look</h2>
          </div>
          <FashionRow />
        </div>

      </div>
    </div>
  );
};

export default CartPage;