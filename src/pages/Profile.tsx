import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, MapPin, Package, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserAddresses from '../components/profile/UserAddresses';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
  image: string;
  size: string;
  color: string;
}

interface Order {
  id: number;
  order_date: string;
  total_amount: string;
  status: string;
  items: OrderItem[];
}

const Profile: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, logout, user, isLoggedIn } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [activeTab, setActiveTab] = useState<'details' | 'address' | 'orders'>('details');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const mode = searchParams.get('mode');
    const tab = searchParams.get('tab');

    if (mode === 'register') setIsRegistering(true);
    else if (mode === 'login') setIsRegistering(false);

    if (tab === 'orders' || tab === 'address' || tab === 'details') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === 'orders' && user?.id) {
      fetchOrderHistory();
    }
  }, [activeTab, user?.id]);

  const fetchOrderHistory = async () => {
    if (!user?.id) return;
    setLoadingOrders(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/user/${user.id}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Order history fetch failed:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleTabChange = (tabId: 'details' | 'address' | 'orders') => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    // UPDATED: Added 'auth/' prefix to match your index.js routes
    const endpoint = isRegistering ? 'auth/register' : 'auth/login';
    const payload = isRegistering ? { full_name: fullName, email, password } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // SAFETY CHECK: Only parse as JSON if the server actually sent JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          if (isRegistering) {
            alert("Account created! Please sign in.");
            setIsRegistering(false);
            setFullName(''); // Reset fields
            setEmail('');
            setPassword('');
          } else {
            login(data.user, data.token); 
          }
        } else {
          alert(data.message || "Authentication failed");
        }
      } else {
        // This catches the 404 HTML error and displays a helpful message
        console.error("Server error: Route not found (404)");
        alert("Server configuration error. Endpoint not found.");
      }
    } catch (err) {
      console.error("Connection error:", err);
      alert("Could not connect to server. Check if backend is running.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
        <div className="w-full max-w-md p-12 bg-white shadow-sm border border-white/50">
          <h1 className="text-[18px] uppercase tracking-[0.5em] font-bold mb-12 text-center">
            {isRegistering ? "Join Us" : "Identity"}
          </h1>
          <form className="space-y-8" onSubmit={handleAuth}>
            {isRegistering && (
              <input 
                type="text" placeholder="FULL NAME" 
                className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest outline-none focus:border-black bg-transparent uppercase" 
                value={fullName} onChange={(e) => setFullName(e.target.value)} required 
              />
            )}
            <input 
              type="email" placeholder="EMAIL ADDRESS" 
              className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest outline-none focus:border-black bg-transparent uppercase" 
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
            <input 
              type="password" placeholder="PASSWORD" 
              className="w-full border-b border-gray-200 py-3 text-[10px] tracking-widest outline-none focus:border-black bg-transparent uppercase" 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
            <button type="submit" className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold mt-6 hover:bg-zinc-800 transition-all">
              {isRegistering ? "Create Account" : "Sign In"}
            </button>
          </form>
          <div className="mt-12 text-center">
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-black">
              {isRegistering ? "Already have an account? Log In" : "Don't have an account? Create One"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-32 font-['Lexend_Giga']" style={{ backgroundColor: '#e0f2fe' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-2">Welcome Back,</p>
          <h1 className="text-[24px] md:text-[32px] uppercase font-bold tracking-widest">{user?.full_name}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/4 space-y-2">
            <div className="mb-10 flex flex-col items-center lg:items-start">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border border-white/50 overflow-hidden mb-4">
                {user?.profile_picture ? (
                  <img src={`http://localhost:5000/images/profiles/${user.profile_picture}`} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <User size={40} strokeWidth={1} className="text-gray-300" />
                )}
              </div>
              <h2 className="text-[14px] uppercase font-bold tracking-widest">{user?.full_name}</h2>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest italic font-bold">Member Account</p>
            </div>

            {[
              { id: 'details', label: 'Personal Details', icon: User },
              { id: 'address', label: 'Shipping Address', icon: MapPin },
              { id: 'orders', label: 'Order History', icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`w-full flex items-center justify-between px-6 py-5 border transition-all ${
                  activeTab === tab.id ? 'bg-black text-white border-black' : 'bg-white/40 border-white/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <tab.icon size={16} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{tab.label}</span>
                </div>
                <ChevronRight size={14} opacity={activeTab === tab.id ? 1 : 0.3} />
              </button>
            ))}
            
            <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-5 text-red-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-red-600 transition-colors">
              <LogOut size={16} strokeWidth={1.5} /> Log Out
            </button>
          </div>

          <div className="flex-1 bg-white p-10 md:p-16 border border-white/50 shadow-sm min-h-[500px]">
            {activeTab === 'details' && (
              <div className="space-y-12">
                <h3 className="text-[12px] uppercase font-bold tracking-[0.4em] border-b pb-6">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[9px] text-gray-400 uppercase tracking-widest">Full Name</label>
                    <p className="text-[11px] uppercase tracking-widest border-b border-gray-100 py-2">{user?.full_name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-gray-400 uppercase tracking-widest">Email Address</label>
                    <p className="text-[11px] tracking-widest border-b border-gray-100 py-2 lowercase">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'address' && user?.id && <UserAddresses userId={user.id} />}
            
            {activeTab === 'orders' && (
              <div className="space-y-8">
                <h3 className="text-[12px] uppercase font-bold tracking-[0.4em] border-b pb-6">Your Orders</h3>
                {loadingOrders ? (
                  <p className="text-[10px] uppercase tracking-widest">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20 opacity-30">
                    <ShoppingBag size={40} className="mx-auto mb-4" strokeWidth={1} />
                    <p className="text-[10px] uppercase tracking-widest">No history found</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Order #{order.id}</span>
                          <span className="text-[9px] text-gray-400 uppercase">{new Date(order.order_date).toLocaleDateString()}</span>
                          <span className={`text-[9px] uppercase px-3 py-1 font-bold ${order.status === 'pending' ? 'bg-orange-50 text-orange-400' : 'bg-green-50 text-green-400'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                               <div className="w-12 h-16 bg-gray-50 flex-shrink-0">
                                 <img src={`http://localhost:5000/images/${item.image}`} className="w-full h-full object-cover" alt={item.product_name} />
                               </div>
                               <div className="flex-1">
                                 <p className="text-[10px] font-bold uppercase">{item.product_name}</p>
                                 <p className="text-[9px] text-gray-400 uppercase tracking-widest">QTY: {item.quantity} | Size: {item.size}</p>
                               </div>
                               <p className="text-[10px] font-bold">${parseFloat(item.price).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between">
                          <span className="text-[10px] uppercase font-bold">Total Amount</span>
                          <span className="text-[11px] font-bold text-black">${parseFloat(order.total_amount).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;