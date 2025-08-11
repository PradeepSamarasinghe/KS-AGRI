import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Leaf, Package, Truck, Shield, Award, X } from 'lucide-react';
import backgroundImg from '../assets/images/Background.jpg';
import {
  FloatingCard,
  RotatingIcon,
  ParallaxBackground,
  AnimatedCounter,
  FloatingElements
} from '../components/3DAnimations';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get category from URL params on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam as any);
    }
  }, [searchParams]);
    // Hardcoded categories
  const categories = [
    { name: 'fruits', display: 'Fruits' },
    { name: 'vegetables', display: 'Vegetables' },
    { name: 'coconut-products', display: 'Coconut Products' },
    { name: 'other', display: 'Other Products' }
  ];

  // Hardcoded products based on crexports.lk structure
  const products = [
    // Fruits
    {
      _id: '1',
      name: 'Ambun Banana',
      description: 'Sweet and flavorful Ambun bananas from Sri Lanka.',
      price: 1.2,
      unit: 'kg',
      availableQuantity: 5000,
      category: 'fruits',
      seasonal: 'J F M A M J J A S O N D',
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '2',
      name: 'Guava',
      description: 'A delicacy covered in a green coat. Fresh and juicy guavas.',
      price: 1.5,
      unit: 'kg',
      availableQuantity: 3000,
      category: 'fruits',
      seasonal: 'J F M A M J J A S O N D',
      image: 'https://images.pexels.com/photos/1058020/pexels-photo-1058020.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '3',
      name: 'Mangosteen',
      description: 'Exotic tropical fruit known for its sweet and tangy flavor.',
      price: 3.0,
      unit: 'kg',
      availableQuantity: 2000,
      category: 'fruits',
      seasonal: 'M A M J J A',
      image: 'https://images.pexels.com/photos/161559/pexels-photo-161559.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '4',
      name: 'Red Lady Papaya',
      description: 'Delicate red coloured fleshy fruit. Reduces risk of colon cancer, has anti-inflammatory properties, contains vitamins C, E, and carotenoids beneficial for skin.',
      price: 2.0,
      unit: 'kg',
      availableQuantity: 4000,
      category: 'fruits',
      seasonal: 'J F M A M J J A S O N D',
      image: 'https://images.pexels.com/photos/5945669/pexels-photo-5945669.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '5',
      name: 'Avocado',
      description: 'Green in hue and savoury in taste. Rich in healthy fats.',
      price: 4.5,
      unit: 'kg',
      availableQuantity: 1500,
      category: 'fruits',
      seasonal: 'A M J J A S',
      image: 'https://images.pexels.com/photos/557439/pexels-photo-557439.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '7',
      name: 'Soursop',
      description: 'Not actually sour but slightly citric. Known for its unique flavor.',
      price: 3.5,
      unit: 'kg',
      availableQuantity: 2500,
      category: 'fruits',
      seasonal: 'M J J A S O',
      image: 'https://images.pexels.com/photos/5945669/pexels-photo-5945669.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    // Coconut Products
    {
      _id: '6',
      name: 'King Coconut',
      description: 'The ultimate thirst quencher. Natural electrolyte drink.',
      price: 1.0,
      unit: 'unit',
      availableQuantity: 10000,
      category: 'coconut-products',
      seasonal: 'J F M A M J J A S O N D',
      image: 'https://images.pexels.com/photos/1585369/pexels-photo-1585369.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    // Vegetables
    {
      _id: '8',
      name: 'Beetroot',
      description: 'Earthy and nutritious root vegetable.',
      price: 1.0,
      unit: 'kg',
      availableQuantity: 6000,
      category: 'vegetables',
      seasonal: 'J F M A S O N D',
      image: 'https://images.pexels.com/photos/751236/pexels-photo-751236.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '9',
      name: 'Brinjal Long',
      description: 'Long eggplant variety, perfect for curries.',
      price: 1.3,
      unit: 'kg',
      availableQuantity: 4000,
      category: 'vegetables',
      seasonal: 'F M A M J J A S',
      image: 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: '10',
      name: 'Cucumber',
      description: 'Crisp and refreshing vegetable.',
      price: 0.8,
      unit: 'kg',
      availableQuantity: 8000,
      category: 'vegetables',
      seasonal: 'J F M A M J J A S O N D',
      image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const getCategoryDisplayName = (category: string) => {
    return category.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string | React.SetStateAction<null>) => {
    if (selectedCategory === categoryName) {
      // If clicking the same category, clear filter
      setSelectedCategory(null);
      setSearchParams({});
    } else {
      // Set new category filter
      
      setSearchParams({ category: typeof categoryName === 'string' ? categoryName : '' });
    }
  };

  // Clear category filter
  const clearCategoryFilter = () => {
    setSelectedCategory(null);
    setSearchParams({});
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;


  return (
    <div 
      className="min-h-screen font-sans pt-24 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImg})`
      }}
    >
      {/* Hero Section with 3D Parallax */}
      <section className="relative py-16 text-white overflow-hidden">
        <ParallaxBackground />
        <div className="absolute inset-0 bg-gradient-to-b "></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-xl">CR</span>
            </motion.div>
            <span className="text-green-100 font-semibold uppercase tracking-widest">Our Products</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fresh <span className="text-green-300">Fruits & Vegetables</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our range of high-quality, sustainably sourced products from Sri Lanka.
          </motion.p>
          <motion.div 
            className="mt-8 h-1 w-16 bg-green-300 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </section>

      {/* Product Categories with Styled Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of agricultural products.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

        

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
              <button
                onClick={() => handleCategorySelect(category.name)}
                className={`
                  w-full h-48 p-6 rounded-lg border relative overflow-hidden group flex flex-col justify-center items-center text-center transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-green-400
                  ${
                    selectedCategory === category.name
                      ? 'border-green-600 bg-green-100 shadow-lg scale-105'
                      : 'border-slate-300 bg-white hover:shadow-lg hover:scale-105'
                  }
                `}
              >
                {/* Background overlay for hover and selection */}
                <div
                  className={`
                    absolute inset-0 bg-black/5 transition-opacity duration-300
                    ${
                      selectedCategory === category.name
                        ? 'opacity-40'
                        : 'opacity-0 group-hover:opacity-20'
                    }
                  `}
                  aria-hidden="true"
                />
            
                {/* Large background icon */}
                <Leaf
                  className={`
                    absolute z-0 -top-10 -right-10 text-[6rem] transition-transform duration-500
                    ${
                      selectedCategory === category.name
                        ? 'text-green-300 rotate-12'
                        : 'text-slate-200 group-hover:text-green-300 group-hover:rotate-12'
                    }
                  `}
                  aria-hidden="true"
                />
            
                {/* Small main icon */}
                <Leaf
                  className={`
                    mb-2 text-3xl relative z-10 transition-colors duration-300
                    ${
                      selectedCategory === category.name
                        ? 'text-green-700'
                        : 'text-green-600 group-hover:text-green-700'
                    }
                  `}
                />
            
                {/* Title */}
                <h3
                  className={`
                    font-semibold text-lg relative z-10 transition-colors duration-300
                    ${
                      selectedCategory === category.name
                        ? 'text-green-900'
                        : 'text-slate-900 group-hover:text-green-900'
                    }
                  `}
                >
                  {category.display}
                </h3>
            
                {/* Subtitle */}
                <p
                  className={`
                    text-sm relative z-10 transition-colors duration-300
                    ${
                      selectedCategory === category.name
                        ? 'text-green-700'
                        : 'text-slate-600 group-hover:text-green-700'
                    }
                  `}
                >
                  High-quality {category.display.toLowerCase()} from Sri Lanka
                </p>
            
                {/* View Products Button */}
                <div
                  className={`
                    relative z-10 mt-4 transition-all duration-300
                    ${
                      selectedCategory === category.name
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                    }
                  `}
                >
                  <span
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer select-none"
                    aria-label={`View products in ${category.display}`}
                  >
                    View Products
                  </span>
                </div>
            
                {/* Selected indicator with smooth scale animation */}
                {selectedCategory === category.name && (
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center z-10 shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Selected category"
                  >
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                  </motion.div>
                )}
              </button>
            </FloatingCard>
            
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid with 3D Cards - All Products Together */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory ? `${getCategoryDisplayName(selectedCategory)}` : 'Our Products'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {selectedCategory 
                ? `Browse our premium ${getCategoryDisplayName(selectedCategory).toLowerCase()}.`
                : 'Browse our premium agricultural products.'
              }
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <FloatingCard key={product._id} delay={index * 0.1}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {getCategoryDisplayName(product.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-xs mb-2">
                        {product.description}
                      </p>
                      
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with 3D Effects */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingCard delay={0.2}>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border-l-4 border-green-600 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Package className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900">Ready to Order?</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Contact our team for bulk pricing, custom packaging, or to discuss your specific requirements.
              </p>
              <Link
                to="/contact"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Request a Quote
              </Link>
              <motion.div 
                className="mt-6 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Quality Assurance with 3D Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Products?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and sustainability sets us apart.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FloatingCard delay={0.2}>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-green-100">
                <RotatingIcon Icon={Truck} />
                <h4 className="font-semibold text-gray-900 mb-2">Global Shipping</h4>
                <p className="text-gray-600 text-sm">
                  Worldwide delivery with proper cold chain management and documentation.
                </p>
              </div>
            </FloatingCard>
            <FloatingCard delay={0.4}>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-green-100">
                <RotatingIcon Icon={Shield} />
                <h4 className="font-semibold text-gray-900 mb-2">Quality Assured</h4>
                <p className="text-gray-600 text-sm">
                  Rigorous quality control and international certification standards.
                </p>
              </div>
            </FloatingCard>
            <FloatingCard delay={0.6}>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-green-100">
                <RotatingIcon Icon={Award} />
                <h4 className="font-semibold text-gray-900 mb-2">Export Excellence</h4>
                <p className="text-gray-600 text-sm">
                  15+ years of experience in international agricultural trade.
                </p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;