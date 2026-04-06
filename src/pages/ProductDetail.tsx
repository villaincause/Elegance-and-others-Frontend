import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductRecommender from '../components/Product/ProductRecommender';
import ReviewSection from '../components/Product/ReviewSection';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // States for selection
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        // Find the specific product by ID
        const foundProduct = data.find((p: any) => p.id.toString() === id);

        if (foundProduct) {
          // Parse the gallery images from the DB string
          const extraImages = foundProduct.images ? JSON.parse(foundProduct.images) : [];
          const mainImageUrl = `http://localhost:5000/images/${foundProduct.image_url}`;
          
          const mappedProduct: Product = {
            ...foundProduct,
            id: foundProduct.id.toString(),
            price: parseFloat(foundProduct.price),
            imageUrl: mainImageUrl,
            // Combine main image with the extra gallery images
            images: [
              mainImageUrl, 
              ...extraImages.map((img: string) => `http://localhost:5000/images/${img}`)
            ],
            colors: foundProduct.colors ? JSON.parse(foundProduct.colors) : [],
            sizes: foundProduct.sizes ? JSON.parse(foundProduct.sizes) : [],
            reviews: foundProduct.reviews ? JSON.parse(foundProduct.reviews) : []
          };
          
          setProduct(mappedProduct);
          
          // Set initial selections
          if (mappedProduct.colors.length > 0) setSelectedColor(mappedProduct.colors[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 text-center uppercase tracking-[0.5em] text-[10px] text-gray-400 font-['Lexend_Giga']">
        Loading Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-40 text-center uppercase tracking-widest font-['Lexend_Giga']">
        Product Not Found
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to your bag.");
      return;
    }

    if (!selectedColor) return;

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
  };

  return (
    <div className="w-full min-h-screen bg-transparent font-['Lexend_Giga'] pt-24 pb-20 px-4 md:px-12 lg:px-20">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-12 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to Shop
      </button>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          {/* Use optional chaining (?.) to prevent 'undefined' errors */}
          {product.images?.map((img, index) => (
            <div key={index} className="bg-transparent overflow-hidden">
              <img 
                src={img} 
                alt={`${product.name} view ${index + 1}`} 
                className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-700" 
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Product Info */}
        <div className="w-full lg:w-[45%]">
          <div className="sticky top-32 space-y-10">
            <div>
              <nav className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-4">
                Shop / {product.category}
              </nav>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-500">${product.price.toFixed(2)}</p>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                Color: <span className="font-normal text-gray-400">{selectedColor?.name}</span>
              </p>
              <div className="flex gap-4">
                {product.colors?.map((color, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border transition-all ${selectedColor?.hex === color.hex ? 'border-black p-[2px]' : 'border-transparent'}`}
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
                <button className="text-[9px] underline uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-5 py-3 text-[11px] min-w-[65px] transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black text-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={handleAddToBag}
                className="w-full bg-black text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                Add to Bag
              </button>
            </div>
            
            <div className="pt-10 border-t border-gray-100">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Details & Care</h4>
                <p className="text-[11px] leading-relaxed text-gray-500 uppercase tracking-wider">
                  Our {product.name.toLowerCase()} is designed for a relaxed yet refined silhouette. 
                  Featuring sustainable materials and premium stitching.
                </p>
                <ul className="text-[10px] text-gray-400 space-y-2 uppercase tracking-widest list-disc pl-4">
                  <li>Dry clean only</li>
                  <li>Ethically sourced</li>
                  <li>True to size</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewSection reviews={product.reviews || []} />
      <ProductRecommender currentProductId={product.id} category={product.category} />
    </div>
  );
};

export default ProductDetail;