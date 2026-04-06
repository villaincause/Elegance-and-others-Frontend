import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const JournalDetail: React.FC = () => {
  const { id } = useParams();

  // In a real app, you'd fetch this based on the ID
  const article = {
    category: "EDITORIAL",
    title: "The Art of Layering: Spring Transition",
    date: "MARCH 20, 2026",
    author: "ELENA ROSSI",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    content: [
      "The transition from winter to spring is an exercise in balance. It is a period where the weight of heavy wool gives way to the breathability of silk and linen, yet the morning chill remains a factor to be reckoned with.",
      "Our latest collection explores this duality through the lens of 'Quiet Luxury'—pieces that perform as well as they look. The key lies in the base layer. A fine-gauge silk turtleneck provides the warmth needed for a brisk morning walk, while remaining light enough to sit unnoticed under a structured blazer as the afternoon sun takes hold.",
      "We believe that true style isn't about the number of items you wear, but the harmony between them. Each piece in this editorial was chosen for its ability to flow with the body's movement, creating a silhouette that is both grounded and ethereal."
    ]
  };

  return (
    <div className="min-h-screen pt-32 pb-32 font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <Link 
          to="/journal" 
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-12 hover:opacity-50 transition-opacity"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Journal
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-12 overflow-hidden bg-white">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-blue-500">
              {article.category}
            </span>
            <h1 className="text-[28px] md:text-[48px] uppercase tracking-tight font-bold leading-tight">
              {article.title}
            </h1>
            <div className="flex justify-center items-center gap-8 pt-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">By {article.author}</p>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">{article.date}</p>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-12">
            {article.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-[14px] md:text-[16px] leading-[2] text-gray-800 tracking-wide font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer of Article */}
          <div className="mt-24 pt-12 border-t border-black/5 flex flex-col items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 italic text-center">
              Share this Perspective
            </p>
            <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold">
              <button className="hover:text-blue-500 transition-colors">Instagram</button>
              <button className="hover:text-blue-500 transition-colors">Pinterest</button>
              <button className="hover:text-blue-500 transition-colors">Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;