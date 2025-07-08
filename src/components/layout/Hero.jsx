import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">Trusted by 10,000+ customers</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Discover Amazing
                <span className="text-blue-600 block">Products</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Shop the latest trends and find everything you need in one place. 
                Quality products, unbeatable prices, and fast delivery.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group cursor-pointer">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/categories")}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors cursor-pointer">
                Browse Categories
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
                alt="Shopping Experience"
                className="rounded-lg w-full h-80 object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12">
                50% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;