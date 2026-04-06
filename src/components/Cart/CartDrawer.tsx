import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../types/cart'; // Added Type Import

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    cartTotal, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  const resolveImagePath = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return new URL(`../../assets/product/${path}`, import.meta.url).href;
  };

  return (
    <>
      {/* Overlay - High-end subtle blur */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-700 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] font-['Lexend_Giga'] ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          
          {/* Top Brand Accent */}
          <div className="h-1.5 w-full" style={{ backgroundColor: '#e0f2fe' }}></div>
          
          {/* Header */}
          <div className="flex justify-between items-center px-10 py-12">
            <div>
              <h2 className="text-[14px] uppercase tracking-[0.3em] font-bold">Shopping Bag</h2>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </p>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="group p-2 -mr-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Close <X size={18} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-2 space-y-12">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8 pb-20">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e0f2fe' }}>
                  <ShoppingBag size={30} strokeWidth={1} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Your bag is empty</p>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-8 py-4 border border-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              // Added CartItem type here to fix the TypeScript error
              cartItems.map((item: CartItem) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-8 group">
                  {/* Image */}
                  <div className="w-32 h-40 bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                    <img 
                      src={resolveImagePath(item.imageUrl)} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-[12px] uppercase font-bold tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-[13px] font-bold">${item.price}</p>
                      </div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">
                        {item.selectedColor.name} / {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-6 bg-white shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)} 
                          disabled={item.quantity <= 1}
                          className="hover:text-black transition-colors disabled:opacity-20"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-[11px] font-bold min-w-[12px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)} 
                          className="hover:text-black transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-[9px] uppercase tracking-[0.3em] text-gray-300 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Solid Brand Style */}
          {cartItems.length > 0 && (
            <div className="p-10 space-y-8" style={{ backgroundColor: '#e0f2fe' }}>
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Subtotal</span>
                <span className="text-2xl font-bold tracking-tighter">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  to="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 group"
                >
                  View Full Bag <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-[9px] text-gray-500 uppercase tracking-widest text-center leading-relaxed">
                  Shipping & Taxes calculated at checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;