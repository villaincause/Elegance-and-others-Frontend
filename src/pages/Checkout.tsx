import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { CartItem } from '../types/cart';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Protection: Redirect if not logged in
  // NOTE: I removed the empty cart redirect here because it can interfere 
  // with navigation after clearCart() is called.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/profile?mode=login');
    }
  }, [isLoggedIn, navigate]);

  // 2. Fetch User Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/addresses/${user.id}`);
        const data = await response.json();
        setAddresses(data);
        if (data.length > 0) {
          const defaultAddr = data.find((a: any) => a.is_default) || data[0];
          setSelectedAddressId(defaultAddr.id);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [user?.id]);

  // 3. Handle Order Placement
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address");
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user?.id,
      totalAmount: cartTotal,
      addressId: selectedAddressId,
      items: cartItems.map((item: any) => ({
        productId: Number(item.db_id || item.id), 
        quantity: item.quantity,
        size: item.selectedSize,
        colorName: item.selectedColor.name,
        colorHex: item.selectedColor.hex,
        price: item.price
      }))
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // IMPORTANT: Navigate FIRST, then clear cart to avoid 
        // the "empty cart" redirect logic firing too early.
        navigate('/order-success');
        clearCart();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Server Error: Could not place order.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Network error. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty and we aren't currently loading a success state, show empty state
  if (cartItems.length === 0 && !loading) {
    return (
      <div className="pt-40 pb-20 px-4 text-center font-['Lexend_Giga']">
        <h2 className="text-xl uppercase mb-8">Your bag is empty</h2>
        <Link to="/" className="text-[10px] bg-black text-white px-8 py-4 uppercase tracking-widest">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 px-4 md:px-10 max-w-6xl mx-auto font-['Lexend_Giga']">
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-xl md:text-2xl uppercase tracking-tighter font-bold">Checkout</h1>
        <span className="h-[1px] flex-1 bg-gray-100"></span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Shipping Address</h3>
            <Link to="/profile?tab=address" className="text-[9px] underline uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              Manage Addresses
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="p-10 border border-dashed border-gray-200 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">No addresses saved</p>
              <Link to="/profile" className="text-[9px] bg-black text-white px-6 py-2 uppercase tracking-widest">
                Add New Address
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr: any) => (
                <div 
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-6 border transition-all duration-300 cursor-pointer relative ${
                    selectedAddressId === addr.id 
                      ? 'border-black bg-white shadow-xl translate-x-1' 
                      : 'border-gray-100 bg-gray-50/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold uppercase mb-2">{addr.full_name}</p>
                    {selectedAddressId === addr.id && (
                      <div className="bg-black text-white text-[8px] px-2 py-1 uppercase tracking-tighter">Selected</div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase leading-relaxed">
                    {addr.address_line1}<br />
                    {addr.city}, {addr.postal_code}<br />
                    T: {addr.phone_number}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-8 md:p-12 h-fit border border-gray-100 shadow-sm">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-8 border-b pb-4">Bag Summary</h3>
          <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item: CartItem) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start text-[10px] uppercase tracking-wider">
                <div className="flex-1 pr-4">
                  <p className="font-bold mb-1">{item.name}</p>
                  <p className="text-gray-400 text-[8px]">
                    {item.selectedSize} | {item.selectedColor.name} | QTY: {item.quantity}
                  </p>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
              <span>Subtotal</span>
              <span className="text-black">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Complimentary</span>
            </div>
            <div className="flex justify-between text-[14px] font-bold uppercase tracking-widest pt-6 border-t border-black/5">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={loading || !selectedAddressId}
            className={`w-full py-6 mt-10 text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${
              loading || !selectedAddressId
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-zinc-800 active:scale-[0.98]'
            }`}
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;