import React from 'react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    id: 1,
    category: "Editorial",
    title: "The Art of Quiet Luxury: Spring 2026",
    excerpt: "Exploring the intersection of minimalist design and sustainable craftsmanship in our latest collection.",
    date: "MARCH 15, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    size: "large"
  },
  {
    id: 2,
    category: "Process",
    title: "Sourcing Our Alpaca Wool",
    excerpt: "A journey through the Peruvian highlands to find the world's softest fibers.",
    date: "MARCH 02, 2026",
    image: "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/645315450_950043377543271_7380733557275052369_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGPR76ghUdNPcjjKFKXmWOKZb7aYeaLf8Blvtph5ot_wHl-WKgye4QAf-IXPGO41QVZk5juGxIzTrtazRAX4tGC&_nc_ohc=95iY7Ed5zZgQ7kNvwGgjs-z&_nc_oc=AdqVhw0Tt4lGv5XK0Y3SZ-NQ1_79LGlh7wh3j0ktDQ-GP0Z13_9Pq21r4HAKD-bkMK8&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=F_B_EJv0WmxVjZWyvZgRIQ&_nc_ss=7a30f&oh=00_Afy0yuxskVHPUL2UfVn2b5-CYqM1AX92E4Rmm_a3MAAeXA&oe=69C4E4A4",
    size: "small"
  },
  {
    id: 3,
    category: "Style Guide",
    title: "5 Ways to Wear the Relaxed Blazer",
    excerpt: "From morning meetings to evening gallery openings, master the art of the drape.",
    date: "FEBRUARY 24, 2026",
    image: "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/520427303_768815565666054_7072462958591617468_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHQ7kRObowoFC7zG1_iqerfbN6OqkA6UxBs3o6qQDpTECb1rx4DfcgIRFnqNNCrVg-6GDkYEMWgclGfdS0SLbwn&_nc_ohc=zShsAPnMnAUQ7kNvwGaFFyM&_nc_oc=AdqIon_CrpnYTlaVczeHlaa8nfgh1cwU4Q9mvxjkpWy4cC9JxCmC4e2j4WaNUJCaQTw&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=c316yj6eN3hu75zzlKpz6w&_nc_ss=7a30f&oh=00_AfzZjAmLxi8DjPhnJOnVLp7ZSKR_1z0lPxSfbBqJaT0xVw&oe=69C4BFF1",
    size: "small"
  }
];

const Journal: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-32 font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4">The Journal</p>
          <h1 className="text-[32px] md:text-[56px] uppercase tracking-[0.2em] font-bold leading-tight">
            Stories, Style & <br /> Substance
          </h1>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-16">
          
          {/* Featured Post - Spans 8 columns */}
          <div className="md:col-span-8 group cursor-pointer">
            <div className="aspect-[16/9] overflow-hidden bg-white mb-8 border border-white/30">
              <img 
                src={ARTICLES[0].image} 
                alt={ARTICLES[0].title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="max-w-2xl">
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-blue-500">{ARTICLES[0].category}</span>
              <h2 className="text-[20px] md:text-[28px] uppercase tracking-wider font-bold mt-4 mb-6 leading-snug">
                {ARTICLES[0].title}
              </h2>
              <p className="text-[11px] md:text-[13px] text-gray-500 leading-relaxed tracking-wide mb-8">
                {ARTICLES[0].excerpt}
              </p>
              <Link to={`/journal/${ARTICLES[0].id}`} className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:opacity-50 transition-opacity">
                Read Story
              </Link>
            </div>
          </div>

          {/* Side Posts - Spans 4 columns */}
          <div className="md:col-span-4 space-y-24">
            {ARTICLES.slice(1).map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-white mb-8 border border-white/30">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-blue-500">{post.category}</span>
                <h2 className="text-[16px] uppercase tracking-wider font-bold mt-3 mb-4">{post.title}</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{post.date}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Journal;