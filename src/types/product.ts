export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  onSale: boolean;
  isNew: boolean;
  // Add these two lines:
  inStock: boolean;      
  stock_quantity: number; 
  // Add any other existing fields like description, etc.
  description?: string;
  created_at?: string;
}