import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
{/* import AnnouncementBar from "./components/layout/AnnouncementBar"; */}
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProductListing from './pages/ProductListing';
import PromoSection from "./components/layout/PromoSection";
import CategoryGrid from "./components/layout/CategoryGrid";
import FashionRow from "./components/layout/FashionRow";
import CampaignSplit from "./components/layout/CampaignSplit";
import EditorialQuote from "./components/layout/EditorialQuote";
import SocialFeed from "./components/layout/SocialFeed";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/Utils/ScrollToTop";
import CartDrawer from "./components/Cart/CartDrawer";
import CartPage from './pages/CartPage';
import Stores from './pages/Stores';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

// Import the security guard
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import both Contexts
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 

const Home = () => (
  <>
    <PromoSection />
    <CategoryGrid />
    <FashionRow />
    <CampaignSplit />
    <EditorialQuote />
    <SocialFeed />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          
          <CartDrawer />
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<JournalDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;