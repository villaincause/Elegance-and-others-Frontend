import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);

  // Sync state when product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      // Safety check for colors array
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setSelectedSize(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, product]);

  if (!product) return null;

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!selectedColor) return;

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    onClose(); 
  };

  // Logic to ensure we always have at least the main image in the gallery list
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300 ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[1000px] h-full max-h-[90vh] md:h-auto overflow-hidden shadow-2xl flex flex-col md:flex-row font-['Lexend_Giga']">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 hover:opacity-50 transition-opacity text-gray-900">
          <X size={24} strokeWidth={1} />
        </button>

        {/* Left Side: Image Gallery - FIX APPLIED HERE */}
        {/* We remove fixed heights and use CSS to make the image fill the vertical space */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] h-full flex flex-col overflow-y-auto no-scrollbar">
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex flex-col w-full h-full gap-1">
            {galleryImages?.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} view ${idx + 1}`} 
                className="w-full min-h-full object-cover block"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Details - Unchanged */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-10">${product.price.toFixed(2)}</p>

          <div className="space-y-10">
            {/* Color Selection */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-black font-bold">
                Color: <span className="text-gray-400 font-normal">{selectedColor?.name}</span>
              </p>
              <div className="flex gap-4">
                {product.colors?.map((color, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border transition-all ${
                      selectedColor?.hex === color.hex ? 'border-black p-[2px]' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Size:</p>
                <button className="text-[9px] underline uppercase tracking-widest text-gray-400 hover:text-black">Size Chart</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-5 py-3 text-[11px] min-w-[60px] transition-all duration-300 ${
                      selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black text-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleAddToBag}
                className="w-full bg-black text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                Add to Bag
              </button>
              <Link 
                to={`/product/${product.id}`}
                className="w-full block text-center text-[10px] underline uppercase tracking-[0.2em] text-gray-400 mt-6 hover:text-black transition-colors"
                onClick={onClose}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;