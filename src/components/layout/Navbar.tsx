import React, { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, MapPin, LogOut } from "lucide-react"; 
import Logo from "../../assets/logo.jpg";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import SearchOverlay from "./SearchOverlay"; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  
  const { cartItems, setIsDrawerOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAccountOpen(false);
    setIsSearchOpen(false);
    setActiveMenu(false);
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Threshold of 100px before it starts hiding
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsAccountOpen(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    navigate('/');
  };

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* PARENT WRAPPER: Handles the vanishing for both bars simultaneously */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* 1. ANNOUNCEMENT BAR (Inside the fixed wrapper) */}
        <div className="w-full bg-black text-white py-3 px-4 flex items-center justify-center font-sans">
          <p className="text-center text-sm md:text-base">
            Festive Elegance Awaits – Eid Sale now live! 
            <Link to="/shop" className="underline font-medium hover:opacity-80 transition ml-2">
              Shop now
            </Link>
          </p>
        </div>

        {/* 2. NAVBAR */}
        <header 
          style={{ backgroundColor: '#e0f2fe' }}
          className="w-full border-b border-black/5 font-['Lexend_Giga']"
        >
          <div className="w-full px-4 md:px-10 flex items-center h-24 relative">
            
            {/* Mobile Menu */}
            <div className="lg:hidden flex-1">
              <button onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} strokeWidth={1.2} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex flex-1 items-center space-x-10 text-[14px] md:text-[16px] uppercase tracking-tight h-full">
              <div 
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu(true)}
                onMouseLeave={() => setActiveMenu(false)}
              >
                <Link to="/shop" className="hover:opacity-50 transition-opacity py-10">SHOP</Link>
                <MegaMenu 
                  isOpen={activeMenu} 
                  onMouseEnter={() => setActiveMenu(true)} 
                  onMouseLeave={() => setActiveMenu(false)} 
                />
              </div>
              <Link to="/shop?filter=new" className="hover:opacity-50 transition-opacity">New Arrivals</Link>
              <Link to="/shop?filter=sale" className="hover:opacity-50 transition-opacity">Sales</Link>
              <Link to="/journal" className="hover:opacity-50 transition-opacity">Journal</Link>
            </nav>

            {/* Logo */}
            <div className="shrink-0 px-4 md:px-10">
              <Link to="/" className="block">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-black/5 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-500 shadow-sm bg-white">
                  <img src={Logo} alt="Logo" className="h-full w-full object-cover" />
                </div>
              </Link>
            </div>

            {/* Icons */}
            <div className="flex flex-1 items-center justify-end space-x-8">
              <div className="flex items-center space-x-6">
                <button onClick={() => setIsSearchOpen(true)}>
                  <Search size={22} strokeWidth={1.2} className="cursor-pointer hover:opacity-50 transition-opacity" />
                </button>
                <button 
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`transition-all duration-300 hidden md:block ${isAccountOpen || isLoggedIn ? 'text-blue-500' : 'hover:opacity-50'}`}
                >
                  <User size={22} strokeWidth={1.2} />
                </button>
                <Link to="/stores" className="transition-opacity hidden md:block hover:opacity-50">
                  <MapPin size={22} strokeWidth={1.2} />
                </Link>
                <button onClick={() => setIsDrawerOpen(true)} className="relative hover:opacity-50 transition-opacity">
                  <ShoppingBag size={22} strokeWidth={1.2} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-black text-white text-[8px] min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 font-bold">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ACCOUNT OVERLAY */}
            {isAccountOpen && (
              <div className="absolute top-full right-0 w-80 bg-white shadow-2xl border-t border-black/5 p-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-8 text-center">
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400">
                      {isLoggedIn ? "Welcome Back" : "Identity"}
                    </p>
                    <h4 className="text-[12px] uppercase font-bold tracking-widest">
                      {isLoggedIn ? user?.full_name : "Your Account"}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {isLoggedIn ? (
                      <>
                        <button onClick={() => navigate('/profile')} className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all">View Profile</button>
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-100 text-red-400 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-50 transition-all"><LogOut size={14} /> Log Out</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => navigate('/profile?mode=login')} className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all">Log In</button>
                        <button onClick={() => navigate('/profile?mode=register')} className="w-full border border-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all">Create Account</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;