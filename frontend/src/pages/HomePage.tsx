import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Globe, Award, CheckCircle, Truck, Shield, Play } from 'lucide-react';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  unit: string;
  availableQuantity: number;
}

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products/featured?limit=6');
        setFeaturedProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const stats = [
    { label: 'Years of Excellence', value: '16+', icon: Award },
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Products Exported', value: '1000+', icon: Truck },
  ];

  const services = [
    {
      title: 'Premium Quality Control',
      description: 'Rigorous standards for the finest products.',
      icon: Shield,
    },
    {
      title: 'Sustainable Farming',
      description: 'Eco-friendly practices for communities and nature.',
      icon: CheckCircle,
    },
    {
      title: 'Global Logistics',
      description: 'Efficient shipping for timely deliveries.',
      icon: Truck,
    },
    {
      title: 'Export Excellence',
      description: 'Certified export solutions worldwide.',
      icon: Award,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Fresh Foods Import Ltd',
      country: 'United Kingdom',
      content: 'KS AGRI has been our trusted partner for over 5 years. Their consistent quality and reliable service have made them indispensable.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'Asian Grocers Network',
      country: 'Singapore',
      content: 'Exceptional coconut products that boosted our business significantly.',
      rating: 5,
    },
    {
      name: 'Ahmed Al-Rashid',
      company: 'Gulf Trading Company',
      country: 'UAE',
      content: 'Professional, competitive, and top-quality service.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative h-screen bg-cover bg-center flex items-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 40, 20, 0.5), rgba(0, 80, 40, 0.5)), url("https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-green-700/50"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="text-orange-400" size={24} />
            <span className="text-orange-400 font-semibold uppercase tracking-wide">Premium Exports</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Fresh Tropical
            <br />
            <span className="text-orange-300">Fruits & Veggies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Exporting top-quality cassava, papaya, and coconuts from Sri Lanka to the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white hover:bg-white hover:text-green-800 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300"
            >
              <Play size={18} />
              Watch Video
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300">25+</div>
              <div className="text-sm text-gray-200">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300">16+</div>
              <div className="text-sm text-gray-200">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300">100%</div>
              <div className="text-sm text-gray-200">Quality</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Blending tradition with innovation for global agricultural excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="bg-green-50 rounded-lg p-4 mb-4 flex justify-center">
                  <service.icon className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-snug">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium Sri Lankan produce, crafted for international markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded mb-3 w-2/3" />
                    <div className="h-5 bg-gray-300 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400'; }}
                    />
                    <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">${product.price}/{product.unit}</span>
                      <span className="text-xs text-gray-500">{product.availableQuantity} {product.unit} left</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition-colors duration-300 inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our global partners about their experience with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-3 italic">"{testimonial.content}"</p>
                <div className="border-t pt-3">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                  <div className="text-xs text-green-600">{testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Importing Today</h2>
          <p className="text-lg mb-8 text-gray-100 max-w-2xl mx-auto">
            Join our global network. Request a quote or register to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-300 inline-flex items-center"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-300 inline-flex items-center"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;