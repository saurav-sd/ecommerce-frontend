import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ShopHub</h3>
            <p className="text-gray-600 mb-6">
              Your trusted partner for quality products and exceptional shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-600">
              <p>📍 123 Shopping Street, NY 10001</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ support@shophub.com</p>
              <p>🕐 Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 ShopHub. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;