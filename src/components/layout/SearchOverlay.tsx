import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: number;
  name: string;
  price: string;
  image_url: string;
  category: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Handle Enter key or Form Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleProductClick = (id: number) => {
    onClose();
    navigate(`/product/${id}`);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{ backgroundColor: '#e0f2fe' }}
      className="fixed top-[141px] inset-0 z-[40] flex flex-col animate-in fade-in slide-in-from-top-4 duration-500 font-['Lexend_Giga']"
    >
      {/* Header Area within Overlay - Wrapped in a Form */}
      <form 
        onSubmit={handleSearchSubmit}
        className="flex items-center justify-between px-6 py-10 border-b border-black/5"
      >
        <div className="flex items-center flex-1 max-w-4xl mx-auto w-full">
          <Search size={24} className="text-black/40 mr-6" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Products..."
            className="w-full bg-transparent text-[16px] md:text-[22px] outline-none uppercase tracking-widest placeholder:text-black/10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          type="button"
          onClick={onClose}
          className="p-2 hover:rotate-90 transition-transform duration-300"
        >
          <X size={28} strokeWidth={1} />
        </button>
      </form>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {loading ? (
            <p className="text-[11px] uppercase tracking-[0.4em] text-black/40 animate-pulse">Scanning Collection...</p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group flex items-center gap-8 p-6 bg-white/40 hover:bg-white transition-all cursor-pointer border border-transparent hover:border-black/5 shadow-sm"
                >
                  <div className="w-24 h-32 bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img 
                      src={`http://localhost:5000/images/${product.image_url}`} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] mb-2">{product.category}</p>
                    <h4 className="text-[14px] md:text-[18px] font-bold uppercase tracking-tight mb-2 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-[12px] font-medium tracking-widest">${parseFloat(product.price).toFixed(2)}</p>
                  </div>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              ))}
              
              {/* View All Button if results are found */}
              <button 
                onClick={handleSearchSubmit}
                className="mt-8 w-full py-6 border border-black/10 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : query.length > 2 ? (
            <div className="text-center py-24 opacity-20">
              <ShoppingBag size={64} className="mx-auto mb-6" strokeWidth={1} />
              <p className="text-[12px] uppercase tracking-[0.4em]">No matches found</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-[11px] text-black/30 uppercase tracking-[0.4em] mb-8">Trending Searches</p>
              {['New Arrivals', 'Outerwear', 'Eid Collection'].map((term) => (
                <button 
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    // Optionally navigate immediately on suggestion click
                    // navigate(`/shop?q=${encodeURIComponent(term)}`);
                    // onClose();
                  }}
                  className="block text-[14px] md:text-[16px] uppercase tracking-[0.2em] hover:translate-x-3 transition-transform duration-300 font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;