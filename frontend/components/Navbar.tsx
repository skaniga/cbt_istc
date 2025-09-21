import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useBackend } from '../hooks/useBackend';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const backend = useBackend();
  const location = useLocation();

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => backend.cart.list(),
    enabled: isAuthenticated,
  });

  const cartItemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded text-blue-600 flex items-center justify-center font-bold">
              C
            </div>
            <span className="text-xl font-bold">Computer Shop</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-blue-200 transition-colors ${
                location.pathname === '/' ? 'text-blue-200' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`hover:text-blue-200 transition-colors ${
                location.pathname === '/products' ? 'text-blue-200' : ''
              }`}
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link 
                to="/orders" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/orders' ? 'text-blue-200' : ''
                }`}
              >
                Orders
              </Link>
            )}
            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/admin' ? 'text-blue-200' : ''
                }`}
              >
                <Settings className="w-4 h-4 inline mr-1" />
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-200 hover:bg-blue-700">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name || user?.email}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout}
                    className="text-white hover:text-blue-200 hover:bg-blue-700"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:text-blue-200 hover:bg-blue-700">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
