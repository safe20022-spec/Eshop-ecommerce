import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';
import { useCartStore } from '../cart/store/useCartStore';
import { ChevronRight, Star, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../auth/store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
// product && addItem(product)

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProductDetails(id);
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      
      navigate('/login', { state: { from: { pathname: location.pathname } } });
      return;
    }

    if(product){
      addItem(product);
    } 
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product is Not Found</h2>
        <p className="text-gray-500 mb-6">{(error as Error)?.message || 'Can Not Found This Product'}</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold">
          <ArrowLeft size={18} /> Back To Shop Page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-red-600 transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-white font-bold truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-center">
          <img src={product.imgUrl} alt={product.title} className="max-h-[380px] object-contain drop-shadow-xl" />
        </div>

        <div className="flex flex-col space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-950/40 w-fit px-3 py-1 rounded-full">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{product.title}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-semibold">(4.8 / 5.0)</span>
          </div>

          <div className="text-3xl font-black text-gray-900 dark:text-white">
            ${product.price}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          </p>

          <button 
            onClick={handleAddToCart}
             className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-2xl font-bold shadow-lg shadow-red-600/25 transition-all cursor-pointer"
            >
            <ShoppingBag size={20} />
           Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
