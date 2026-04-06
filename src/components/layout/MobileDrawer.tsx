import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, User, MapPin, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('shop');
  const [openSubSection, setOpenSubSection] = useState<string | null>(null);
  
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <>
      {/* 1. Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 transition-opacity duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 2. Main Drawer */}
      <div 
        style={{ backgroundColor: '#e0f2fe' }} 
        className={`fixed top-0 left-0 z-[110] w-[85%] md:w-[450px] h-screen shadow-2xl transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Section */}
        <div className="h-20 px-6 border-b border-black/5 flex items-center shrink-0 w-full">
          <button onClick={onClose} className="hover:opacity-50 transition-opacity">
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="w-full h-[calc(100vh-80px)] overflow-y-auto px-8 py-10 font-['Lexend_Giga'] scroll-smooth no-scrollbar">
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div className="space-y-6 w-full">
            
            {/* SHOP SECTION */}
            <div className="w-full">
              <div className="w-full flex justify-between items-center text-[17px] uppercase tracking-widest font-bold">
                <Link to="/shop" onClick={onClose} className="hover:opacity-50">SHOP</Link>
                <button 
                  className="p-2"
                  onClick={() => setOpenSection(openSection === 'shop' ? null : 'shop')}
                >
                  {openSection === 'shop' ? <Minus size={15} /> : <Plus size={15} />}
                </button>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === 'shop' ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}>
                
                <div className="ml-2 space-y-4">
                  {/* CATEGORIES - Synced with MegaMenu */}
                  <div className="w-full">
                    <button 
                      className="w-full flex justify-between items-center text-[13px] text-gray-700 uppercase tracking-widest mb-4 font-bold"
                      onClick={() => setOpenSubSection(openSubSection === 'categories' ? null : 'categories')}
                    >
                      Categories {openSubSection === 'categories' ? <Minus size={11} /> : <Plus size={11} />}
                    </button>
                    
                    <ul className={`ml-4 space-y-4 text-[12px] uppercase transition-all duration-500 overflow-hidden ${
                      openSubSection === 'categories' ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      {[
                        { name: 'Outerwear', slug: 'Outerwear' },
                        { name: 'Knitwear', slug: 'Knitwear' },
                        { name: 'Pants', slug: 'Pants' },
                        { name: 'Dresses', slug: 'Dresses' },
                        { name: 'Shop All', slug: '' }
                      ].map(item => (
                        <li key={item.name}>
                          <Link 
                            to={item.slug ? `/shop?category=${item.slug}` : '/shop'} 
                            onClick={onClose} 
                            className="hover:opacity-50 block w-full"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FEATURED - Synced with MegaMenu */}
                  <div className="pt-4 border-t border-black/5 w-full">
                    <button 
                      className="w-full flex justify-between items-center text-[13px] text-gray-700 uppercase tracking-widest mb-4 font-bold"
                      onClick={() => setOpenSubSection(openSubSection === 'featured' ? null : 'featured')}
                    >
                      Featured {openSubSection === 'featured' ? <Minus size={11} /> : <Plus size={11} />}
                    </button>
                    
                    <ul className={`ml-4 space-y-4 text-[12px] uppercase transition-all duration-500 overflow-hidden ${
                      openSubSection === 'featured' ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      {['Bestsellers', 'Most Popular', 'Trending Now'].map(item => (
                        <li key={item}>
                          <Link to="/shop" onClick={onClose} className="hover:opacity-50 block w-full">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* COLLECTIONS - Synced with MegaMenu */}
                  <div className="pt-4 border-t border-black/5 w-full">
                    <button 
                      className="w-full flex justify-between items-center text-[13px] text-gray-700 uppercase tracking-widest mb-4 font-bold"
                      onClick={() => setOpenSubSection(openSubSection === 'collections' ? null : 'collections')}
                    >
                      Collections {openSubSection === 'collections' ? <Minus size={11} /> : <Plus size={11} />}
                    </button>
                    
                    <ul className={`ml-4 space-y-4 text-[12px] uppercase transition-all duration-500 overflow-hidden ${
                      openSubSection === 'collections' ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      {['Office looks', 'Online Exclusive', 'Basics'].map(item => (
                        <li key={item}>
                          <Link to="/shop" onClick={onClose} className="hover:opacity-50 block w-full">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* TOP-LEVEL LINKS - Synced with Navbar Filter Logic */}
            <div className="w-full flex justify-between items-center text-[17px] uppercase tracking-widest font-bold border-t border-black/5 pt-5">
              <Link to="/shop?filter=new" onClick={onClose} className="hover:opacity-50">New Arrivals</Link>
            </div>
            
            <div className="w-full flex justify-between items-center text-[17px] uppercase tracking-widest font-bold border-t border-black/5 pt-5">
              <Link to="/shop?filter=sale" onClick={onClose} className="hover:opacity-50">Sales</Link>
            </div>

            <div className="w-full flex justify-between items-center text-[17px] uppercase tracking-widest font-bold border-t border-black/5 pt-5">
              <Link to="/journal" onClick={onClose} className="hover:opacity-50">Journal</Link>
            </div>

            {/* FOOTER SECTION - Auth Aware */}
            <div className="mt-12 pt-10 border-t border-black/10 space-y-6 pb-20 w-full">
              <Link 
                to="/profile" 
                onClick={onClose} 
                className="flex items-center gap-4 text-[14px] uppercase tracking-widest font-medium hover:opacity-50 transition-opacity"
              >
                <User size={20} strokeWidth={1.2} /> 
                {isLoggedIn ? (user?.full_name || "Account") : "Login / Register"}
              </Link>
              
              <Link to="/stores" onClick={onClose} className="flex items-center gap-4 text-[14px] uppercase tracking-widest font-medium hover:opacity-50 transition-opacity">
                <MapPin size={20} strokeWidth={1.2} /> Stores
              </Link>

              {isLoggedIn && (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-4 text-[14px] uppercase tracking-widest font-medium text-red-400 hover:opacity-50 transition-opacity"
                >
                  <LogOut size={20} strokeWidth={1.2} /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;