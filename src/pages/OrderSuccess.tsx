import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 flex flex-col items-center justify-center font-['Lexend_Giga']">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-10 flex justify-center">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
            <Check size={40} strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl md:text-3xl uppercase tracking-tighter font-bold mb-4">
          Order Confirmed
        </h1>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-12 leading-relaxed">
          Thank you for your purchase. Your order has been received and is being prepared with care. 
          A confirmation email will be sent to you shortly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link 
            to="/profile?tab=orders" 
            className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            View My Orders
          </Link>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-5 border border-gray-200 text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gray-50 transition-all"
          >
            Continue Shopping
          </button>
        </div>

        {/* Minimalist Footer Decor */}
        <div className="mt-20 flex items-center justify-center gap-6 opacity-20">
          <span className="h-[1px] w-12 bg-black"></span>
          <p className="text-[8px] uppercase tracking-[0.5em]">Elegance Atelier</p>
          <span className="h-[1px] w-12 bg-black"></span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;