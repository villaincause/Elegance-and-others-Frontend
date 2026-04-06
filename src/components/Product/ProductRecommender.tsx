import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface ProductRecommenderProps {
  currentProductId: string;
  category: string;
}

const ProductRecommender: React.FC<ProductRecommenderProps> = ({ currentProductId, category }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();

        // Map and Filter logic
        const allProducts: Product[] = data.map((p: any) => ({
          ...p,
          id: p.id.toString(),
          price: parseFloat(p.price),
          imageUrl: `http://localhost:5000/images/${p.image_url}`,
          category: p.category
        }));

        // 1. Find products in same category (excluding current)
        let filtered = allProducts.filter(
          (p) => p.category === category && p.id !== currentProductId
        );

        // 2. Fallback if category is empty
        if (filtered.length === 0) {
          filtered = allProducts.filter((p) => p.id !== currentProductId);
        }

        setRecommendations(filtered.slice(0, 4));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [currentProductId, category]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-32 border-t border-gray-100 pt-20 pb-10 font-['Lexend_Giga']">
      <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold mb-12 text-center text-gray-900">
        You May Also Like
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {recommendations.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group block"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-4">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1 text-gray-900">
              {product.name}
            </h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommender;