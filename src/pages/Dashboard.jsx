import Hero from "../components/layout/Hero";
import Newsletter from "../components/layout/Newsletter";
import Footer from "../components/layout/Footer";

export default function Dashboard() {

  return (
    <>
    <Hero />
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50. Fast and reliable delivery to your doorstep.</p>
          </div>
          
          <div className="p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600">Your payment information is encrypted and secure. Shop with confidence.</p>
          </div>
          
          <div className="p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our customer support team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
    <Newsletter />
    <Footer />
    </>
  );
}
