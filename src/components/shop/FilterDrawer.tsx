import React from 'react';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  stockStatus: string;
  setStockStatus: (status: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPriceLimit: number;
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
  availableCategories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  stockStatus,
  setStockStatus,
  priceRange,
  setPriceRange,
  maxPriceLimit,
  availableColors,
  availableSizes,
  availableCategories,
  activeCategory,
  onCategoryChange
}) => {
  
  const numericSizes = availableSizes
    .filter(size => !isNaN(Number(size)))
    .sort((a, b) => Number(a) - Number(b));
    
  const letterSizes = availableSizes
    .filter(size => isNaN(Number(size)))
    .sort((a, b) => {
      const order: Record<string, number> = { 'XXS': 1, 'XS': 2, 'S': 3, 'M': 4, 'L': 5, 'XL': 6, 'XXL': 7 };
      return (order[a] || 99) - (order[b] || 99);
    });

  const toggleSize = (size: string) => {
    setSelectedSizes(
      selectedSizes.includes(size) 
        ? selectedSizes.filter(s => s !== size) 
        : [...selectedSizes, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(
      selectedColors.includes(colorName) 
        ? selectedColors.filter(c => c !== colorName) 
        : [...selectedColors, colorName]
    );
  };

  const handleClearAll = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setStockStatus('all');
    setPriceRange([0, maxPriceLimit]);
    onCategoryChange('Shop All');
  };

  // Logic to prevent handles from crossing
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 1);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 1);
    setPriceRange([priceRange[0], value]);
  };

  const SizeGrid = ({ sizes }: { sizes: string[] }) => (
    <div className="grid grid-cols-3 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => toggleSize(size)}
          className={`py-4 text-[10px] border transition-all duration-300 ${
            selectedSizes.includes(size) 
              ? 'bg-black text-white border-black' 
              : 'border-gray-200 text-gray-400 hover:border-black'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out font-['Lexend_Giga'] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          <div className="flex justify-between items-center px-8 py-10 border-b border-gray-100">
            <h2 className="text-[14px] uppercase tracking-[0.3em] font-bold">Refine</h2>
            <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-300">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 text-[#1a1a1a]">
            
            {/* Dual Range Price Filter */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price Range</h3>
              <div className="space-y-8 px-2">
                <div className="relative h-1 w-full bg-gray-100 rounded">
                  {/* Track Fill */}
                  <div 
                    className="absolute h-full bg-black rounded"
                    style={{ 
                      left: `${(priceRange[0] / maxPriceLimit) * 100}%`, 
                      right: `${100 - (priceRange[1] / maxPriceLimit) * 100}%` 
                    }}
                  />
                  
                  {/* Min Slider Handle */}
                  <input 
                    type="range" 
                    min="0" 
                    max={maxPriceLimit} 
                    value={priceRange[0]} 
                    onChange={handleMinChange}
                    className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer z-20 pointer-events-none 
                               [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:appearance-none
                               [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                               [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none"
                  />
                  
                  {/* Max Slider Handle */}
                  <input 
                    type="range" 
                    min="0" 
                    max={maxPriceLimit} 
                    value={priceRange[1]} 
                    onChange={handleMaxChange}
                    className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer z-30 pointer-events-none 
                               [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:appearance-none
                               [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                               [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none"
                  />
                </div>

                <div className="flex justify-between items-center gap-4 pt-2">
                  <div className="flex-1 border border-gray-100 p-3 flex items-center">
                    <span className="text-[10px] text-gray-400 mr-2">৳</span>
                    <input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="bg-transparent outline-none w-full text-[11px] font-bold"
                    />
                  </div>
                  <span className="text-gray-300 text-[10px]">TO</span>
                  <div className="flex-1 border border-gray-100 p-3 flex items-center">
                    <span className="text-[10px] text-gray-400 mr-2">৳</span>
                    <input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="bg-transparent outline-none w-full text-[11px] font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Availability</h3>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'in-stock', label: 'In Stock Only' },
                  { id: 'out-of-stock', label: 'Out of Stock' }
                ].map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setStockStatus(status.id)}
                    className={`text-left text-[11px] uppercase tracking-widest transition-colors ${
                      stockStatus === status.id ? 'text-black font-bold' : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Categories */}
            {availableCategories.length > 1 && (
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</h3>
                <div className="flex flex-col gap-4">
                  {availableCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`text-left text-[11px] uppercase tracking-widest transition-colors ${
                        activeCategory === cat ? 'text-black font-bold' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Section */}
            <div className="space-y-10">
              {numericSizes.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Waist / Numeric Size</h3>
                  <SizeGrid sizes={numericSizes} />
                </div>
              )}

              {letterSizes.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Letter Size</h3>
                  <SizeGrid sizes={letterSizes} />
                </div>
              )}
            </div>

            {/* Dynamic Colors */}
            {availableColors.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Color</h3>
                <div className="flex flex-wrap gap-4">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        selectedColors.includes(color.name) ? 'border-black p-1' : 'border-transparent'
                      }`}>
                        <div 
                          className="w-full h-full rounded-full border border-black/5" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </div>
                      <span className={`text-[8px] uppercase tracking-tighter ${selectedColors.includes(color.name) ? 'text-black font-bold' : 'text-gray-400'}`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-gray-100 flex justify-center">
            <button 
              onClick={handleClearAll}
              className="w-full py-5 text-[10px] uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;