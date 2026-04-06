import React from 'react';
import smartChicImg from '../../assets/smart-chic.jpg'; 
import readyToGoImg from '../../assets/ready-to-go.jpg';

interface CampaignItem {
  image: string;
  title: string;
  link: string;
}

const campaignData: CampaignItem[] = [
  {
    image: smartChicImg,
    title: 'The Smart Chic',
    link: '/category/smart-chic'
  },
  {
    image: readyToGoImg,
    title: 'Ready To Go',
    link: '/category/ready-to-go'
  }
];

const CampaignSplit: React.FC = () => {
  return (
    /* Added md:px-10 for breathing room and py-12 for vertical spacing */
    <section className="w-full px-4 md:px-10 py-12 bg-transparent font-['Lexend_Giga']">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaignData.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            className="relative group w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gray-100"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Text overlay pinned to bottom-left with padding */}
            <div className="absolute inset-0 flex items-end justify-start p-8">
              <h2 className="text-white text-[11px] md:text-[13px] tracking-[0.2em] uppercase drop-shadow-sm">
                {item.title}
              </h2>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CampaignSplit;