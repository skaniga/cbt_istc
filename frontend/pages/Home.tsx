import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Laptop, HardDrive, Mouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { data: products } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => backend.product.list({ limit: 8 }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => backend.product.getCategories(),
  });

  const categoryIcons = {
    laptops: Laptop,
    desktops: Monitor,
    components: HardDrive,
    accessories: Mouse,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your One-Stop Computer Shop
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest laptops, desktops, components, and accessories. 
            Quality products at unbeatable prices.
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.categories.map((category) => {
              const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Monitor;
              return (
                <Link 
                  key={category.name} 
                  to={`/products?category=${category.name}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2 capitalize">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">
                        {category.count} products
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Link to="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust us for their tech needs.
          </p>
          <div className="space-x-4">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Browse Products
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
