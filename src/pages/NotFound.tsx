import { Link } from 'react-router-dom';
import { ShoppingBag, Home, AlertOctagon } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon with modern styling matching the store theme */}
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner animate-pulse">
        <AlertOctagon className="w-10 h-10" />
      </div>

      {/* Error Badge & Heading */}
      <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
        404 Error
      </span>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-base">
        Sorry, the page you are looking for doesn't exist, has been removed, or you entered an incorrect URL.
      </p>

      {/* Quick Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-sm"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <Link
          to="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 font-medium transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Shop
        </Link>
      </div>
    </div>
  );
}