import React from 'react';

const Footer: React.FC = () => {
  return (
    /* Reduced py-8 md:py-12 to py-6 md:py-8 to shrink the top/bottom gap */
    <footer className="w-full px-4 md:px-10 py-6 md:py-8 bg-transparent font-['Lexend_Giga'] border-t border-black/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        
        {/* Contact Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-[13px] md:text-[15px] text-gray-500 uppercase tracking-[0.2em] font-bold">Contact Us</h3>
          <ul className="text-[13px] md:text-[14px] space-y-3 tracking-tight text-gray-700 font-bold">
            <li><a href="tel:+88001403336587" className="hover:text-black transition-colors">+880 01403-336587</a></li>
            <li><a href="mailto:hello@elegance.com" className="hover:text-black transition-colors">Email Us</a></li>
            <li>Always open</li>
          </ul>
        </div>

        {/* Customers Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-[13px] md:text-[15px] text-gray-500 uppercase tracking-[0.2em] font-bold">Customers</h3>
          <ul className="text-[13px] md:text-[14px] space-y-3 tracking-tight text-gray-700 font-bold">
            <li><a href="#" className="hover:text-black transition-colors">Start a Return</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Catalogs and Mailers</a></li>
            <li><a href="#" className="hover:text-black transition-colors">About Group Gifting</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-[13px] md:text-[15px] text-gray-500 uppercase tracking-[0.2em] font-bold">Company</h3>
          <ul className="text-[13px] md:text-[14px] space-y-3 tracking-tight text-gray-700 font-bold">
            <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Discover Revive</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="md:col-span-6 flex flex-col items-start md:items-end md:pr-20 space-y-4">
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-[15px] md:text-[16px] uppercase tracking-widest leading-tight font-bold">
              Get the latest new from us
            </h3>
            <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/40 border border-black/10 px-5 py-4 text-[14px] focus:outline-none focus:border-black transition-colors"
              />
              <p className="text-[10px] leading-relaxed text-gray-400 uppercase tracking-tight font-medium">
                By signing up, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
              </p>
              <button className="bg-black text-white px-7 py-3 text-[14px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Footer - Reduced mt-10 to mt-6 and pt-5 to pt-4 */}
      <div className="mt-8 pt-4 border-t border-black/5 flex justify-between items-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          © {new Date().getFullYear()} Elegance and others
        </span>
      </div>
    </footer>
  );
};

export default Footer;