import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../../types/product';

const ReviewSection: React.FC<{ reviews?: Review[] }> = ({ reviews = [] }) => {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0;

  if (reviews.length === 0) return (
    <div className="mt-32 border-t border-gray-100 pt-20 text-center pb-20 font-['Lexend_Giga']">
       <p className="text-[10px] uppercase tracking-widest text-gray-400">No reviews yet for this item.</p>
    </div>
  );

  return (
    <div className="mt-32 border-t border-gray-100 pt-20 max-w-[1200px] mx-auto px-4 md:px-10 font-['Lexend_Giga']">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold mb-4">Reviews</h3>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-light">{averageRating.toFixed(1)}</span>
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(averageRating) ? "currentColor" : "none"} 
                  strokeWidth={1}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              Based on {reviews.length} Reviews
            </span>
          </div>
        </div>
        <button className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
          Write a Review
        </button>
      </div>

      <div className="space-y-12 pb-20">
        {reviews.map((review) => (
          <div key={review.id} className="grid grid-cols-1 md:grid-cols-[200px_1fr_100px] gap-8 pb-12 border-b border-gray-50">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-widest">{review.user}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Verified Buyer</p>
            </div>

            <div className="space-y-4">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < review.rating ? "currentColor" : "none"} 
                    strokeWidth={1} 
                  />
                ))}
              </div>
              <h4 className="text-[12px] font-bold uppercase tracking-tight">{review.title}</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-light lowercase first-letter:uppercase">{review.comment}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;