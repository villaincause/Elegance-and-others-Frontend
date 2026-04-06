import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, X } from 'lucide-react';

interface Address {
  id: number;
  full_name: string;
  address_line1: string;
  city: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
}

const UserAddresses: React.FC<{ userId: number }> = ({ userId }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    address_line1: '',
    city: '',
    postal_code: '',
    phone_number: ''
  });

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/addresses/${userId}`);
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: userId })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ full_name: '', address_line1: '', city: '', postal_code: '', phone_number: '' });
        fetchAddresses();
      }
    } catch (err) {
      console.error("Error adding address", err);
    }
  };

  return (
    <div className="font-['Lexend_Giga']">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Saved Addresses</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-[9px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
        >
          <Plus size={14} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-gray-100 p-6 relative group bg-white shadow-sm hover:shadow-md transition-shadow">
            <MapPin size={16} className="text-gray-300 mb-4" />
            <p className="text-[11px] font-bold uppercase mb-2">{addr.full_name}</p>
            <p className="text-[10px] text-gray-500 uppercase leading-relaxed mb-4">
              {addr.address_line1}<br />
              {addr.city}, {addr.postal_code}<br />
              T: {addr.phone_number}
            </p>
            {/* Delete button (only for logic, you can add the endpoint later) */}
            <button className="text-gray-300 hover:text-red-500 transition-colors absolute top-6 right-6">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ADD ADDRESS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md p-10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
              <X size={20} strokeWidth={1} />
            </button>
            
            <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold mb-8">New Address</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                placeholder="FULL NAME"
                className="w-full border-b border-gray-200 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black transition-colors"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                required
              />
              <input 
                placeholder="STREET ADDRESS"
                className="w-full border-b border-gray-200 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black transition-colors"
                onChange={(e) => setFormData({...formData, address_line1: e.target.value})}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="CITY"
                  className="w-full border-b border-gray-200 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black transition-colors"
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
                <input 
                  placeholder="POSTAL CODE"
                  className="w-full border-b border-gray-200 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black transition-colors"
                  onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                  required
                />
              </div>
              <input 
                placeholder="PHONE NUMBER"
                className="w-full border-b border-gray-200 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black transition-colors"
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                required
              />
              
              <button type="submit" className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold mt-4">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddresses;