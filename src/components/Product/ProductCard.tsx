import React from 'react';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Logic for stock status
  const isOutOfStock = !product.inStock;
  const isLowStock = product.inStock && product.stock_quantity > 0 && product.stock_quantity < 10;

  return (
    <div className={`group cursor-pointer font-['Lexend_Giga'] relative ${isOutOfStock ? 'opacity-80' : ''}`}>
      {/* Badges - Top Left Stack */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {isOutOfStock ? (
          <span className="bg-gray-400 text-white text-[8px] px-2 py-1 font-bold tracking-widest uppercase">
            Sold Out
          </span>
        ) : (
          <>
            {product.onSale && (
              <span className="bg-red-500 text-white text-[8px] px-2 py-1 font-bold tracking-widest uppercase">
                Sale
              </span>
            )}
            {product.isNew && !product.onSale && (
              <span className="bg-black text-white text-[8px] px-2 py-1 font-bold tracking-widest uppercase">
                New
              </span>
            )}
            {isLowStock && (
              <span className="bg-orange-500 text-white text-[8px] px-2 py-1 font-bold tracking-widest uppercase">
                Low Stock
              </span>
            )}
          </>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 ${
            isOutOfStock ? 'grayscale-[0.5]' : ''
          }`}
        />
        
        {/* Out of Stock Overlay Text */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
             <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/40">Unavailable</span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-1 hover:opacity-50 transition-opacity z-20">
          <Heart size={20} strokeWidth={1} className="text-black" />
        </button>

        {/* Quick Add Button - Disabled if out of stock */}
        {!isOutOfStock && (
          <button className="absolute bottom-4 right-4 p-1 hover:opacity-50 transition-opacity z-20">
            <Plus size={20} strokeWidth={1} className="text-black" />
          </button>
        )}

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
            {product.colors.map((color, idx) => (
              <div 
                key={idx}
                style={{ backgroundColor: color.hex }}
                className="w-3 h-3 rounded-full border border-black/10 shadow-sm"
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="mt-4 space-y-1">
        <h3 className={`text-[11px] md:text-[12px] uppercase tracking-widest font-medium truncate ${
          isOutOfStock ? 'text-gray-400' : 'text-black/90'
        }`}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-3">
          {product.onSale && product.discountPrice ? (
            <>
              <p className={`text-[11px] md:text-[12px] font-bold ${isOutOfStock ? 'text-gray-400' : 'text-red-600'}`}>
                ${product.discountPrice.toFixed(2)}
              </p>
              <p className="text-[10px] text-gray-400 line-through decoration-gray-300">
                ${product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className={`text-[11px] md:text-[12px] ${isOutOfStock ? 'text-gray-300' : 'text-gray-500'}`}>
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Low Stock Indicator Text */}
        {isLowStock && (
          <p className="text-[8px] uppercase tracking-widest text-orange-600 font-bold mt-1">
            Only {product.stock_quantity} left
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;