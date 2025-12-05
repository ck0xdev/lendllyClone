import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import Explore from './pages/Explore';
import Items from './pages/Items';
import Requests from './pages/Requests';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import PostItem from './pages/PostItem';
import PostRequest from './pages/PostRequest';
import ProductDetails from './pages/ProductDetails';

// Create a layout wrapper to handle the conditional Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide footer only on chat page
  const showFooter = location.pathname !== '/chat';

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ProductDetails />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/post-request" element={<PostRequest />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;