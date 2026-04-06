import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import QuickView from '../components/shop/QuickView';
import FilterDrawer from '../components/shop/FilterDrawer';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import type { Product } from '../types/product';

const ProductListing: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [masterProducts, setMasterProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || "Shop All";
  const activeFilter = searchParams.get('filter');
  
  // 1. GET THE SEARCH QUERY FROM URL
  const searchQuery = searchParams.get('q');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [stockStatus, setStockStatus] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const mapProductData = (data: any[]) => {
    return data.map((p: any) => ({
      ...p,
      id: p.id.toString(),
      price: parseFloat(p.price),
      discountPrice: p.discount_price ? parseFloat(p.discount_price) : undefined,
      imageUrl: `http://localhost:5000/images/${p.image_url}`,
      images: [`http://localhost:5000/images/${p.image_url}`],
      colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : (p.colors || []), 
      sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : (p.sizes || []),
      isNew: new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      onSale: p.on_sale === 1,
      inStock: p.stock_quantity > 0,
      stock_quantity: p.stock_quantity
    }));
  };

  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        const mappedData = mapProductData(data);
        setMasterProducts(mappedData);
        
        if (mappedData.length > 0) {
          const max = Math.max(...mappedData.map(p => p.price));
          setPriceRange([0, max]);
        }
      } catch (err) {
        console.error("Master fetch failed:", err);
      }
    };
    fetchMasterList();
  }, []);

  // 2. UPDATED FETCH LOGIC TO INCLUDE SEARCH PARAM
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Change logic: If there is a search query, we should hit the search endpoint
        // Or ensure your main products endpoint handles 'q'
        const endpoint = searchQuery ? 'http://localhost:5000/api/search' : 'http://localhost:5000/api/products';
        const url = new URL(endpoint);
        
        // Append Search Query if it exists
        if (searchQuery) url.searchParams.append('q', searchQuery);
        
        if (activeCategory !== "Shop All") url.searchParams.append('category', activeCategory);
        if (activeFilter) url.searchParams.append('filter', activeFilter);
        if (stockStatus !== "all") url.searchParams.append('availability', stockStatus);
        
        url.searchParams.append('minPrice', priceRange[0].toString());
        url.searchParams.append('maxPrice', priceRange[1].toString());
        url.searchParams.append('sort', sortBy);

        if (selectedSizes.length > 0) url.searchParams.append('sizes', selectedSizes.join(','));
        if (selectedColors.length > 0) url.searchParams.append('colors', selectedColors.join(','));

        const response = await fetch(url.toString());
        const data = await response.json();
        setAllProducts(mapProductData(data));
      } catch (error) {
        console.error("Filtered fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // 3. ADD searchQuery TO THE DEPENDENCY ARRAY
  }, [activeCategory, activeFilter, sortBy, selectedSizes, selectedColors, stockStatus, priceRange, searchQuery]);

  const dynamicCategories = useMemo(() => ["Shop All", ...new Set(masterProducts.map(p => p.category))], [masterProducts]);
  const dynamicSizes = useMemo(() => [...new Set(masterProducts.flatMap(p => p.sizes))].sort(), [masterProducts]);
  
  const maxPriceLimit = useMemo(() => {
    return masterProducts.length > 0 ? Math.max(...masterProducts.map(p => p.price)) : 10000;
  }, [masterProducts]);

  const dynamicColors = useMemo(() => {
    const uniqueColorNames = [...new Set(masterProducts.flatMap(p => p.colors.map(c => c.name)))];
    return uniqueColorNames.map(name => {
      const colorObj = masterProducts.flatMap(p => p.colors).find(c => c.name === name);
      return { name: name, hex: colorObj?.hex || '#000' };
    });
  }, [masterProducts]);

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    if (category === "Shop All") {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full min-h-screen bg-transparent font-['Lexend_Giga'] pt-40 pb-20">
      <header className="px-4 md:px-10 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#1a1a1a]">
            {/* 4. UPDATE TITLE IF SEARCHING */}
            {searchQuery 
              ? `Results for: ${searchQuery}` 
              : (activeFilter === 'new' ? 'New Arrivals' : activeFilter === 'sale' ? 'Sales' : activeCategory)}
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">{allProducts.length} Products</p>
        </div>
        
        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 group"
          >
            <SlidersHorizontal size={14} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              Refine 
              {(selectedSizes.length + selectedColors.length + (stockStatus !== 'all' ? 1 : 0)) > 0 && (
                <span className="ml-1 text-gray-400">({selectedSizes.length + selectedColors.length + (stockStatus !== 'all' ? 1 : 0)})</span>
              )}
            </span>
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold">
              Sort By: <span className="text-gray-400 font-normal">{sortBy.replace('-', ' ')}</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {['newest', 'price-low', 'price-high'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-5 py-4 text-[9px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-b border-gray-50 last:border-0 ${sortBy === option ? 'bg-gray-50 font-bold' : ''}`}
                >
                  {option.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 md:px-10">
        {loading ? (
          <div className="py-20 text-center uppercase tracking-[0.5em] text-[10px] text-gray-400 animate-pulse">Updating...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {allProducts.map((product) => (
              <div key={product.id} onClick={() => handleOpenQuickView(product)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {allProducts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <div className="uppercase tracking-[0.5em] text-gray-300 text-[11px]">
            {searchQuery ? "No products match your search." : "No products match these filters."}
          </div>
          <button 
            onClick={() => {
                setSelectedSizes([]);
                setSelectedColors([]);
                setStockStatus("all");
                setPriceRange([0, maxPriceLimit]);
                // Also clear search if applicable
                if (searchQuery) setSearchParams({});
            }}
            className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
          >
            Reset Filters {searchQuery && "& Search"}
          </button>
        </div>
      )}

      <FilterDrawer 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        stockStatus={stockStatus}
        setStockStatus={setStockStatus}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        maxPriceLimit={maxPriceLimit}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        availableColors={dynamicColors}
        availableSizes={dynamicSizes}
        availableCategories={dynamicCategories}
      />

      <QuickView product={selectedProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </div>
  );
};

export default ProductListing;