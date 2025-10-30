import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Phone, Mail, MapPin, Check, Truck, Shield, Clock, Users, Globe, Award, Factory } from 'lucide-react';
import HandImg from '../assets/images/Hand.png';
import H2H from '../assets/images/H2H.jpg';
import TruckImg from '../assets/images/Truck.png';
import cutImg from '../assets/images/cutting.jpg';

const KSAgriHomepage = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counter component
  interface AnimatedCounterProps {
    end: number;
    label: string;
    duration?: number;
  }

  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, label, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (hasAnimated) return;
      
      const timer = setTimeout(() => {
        setHasAnimated(true);
        let start = 0;
        const increment = end / (duration / 16);
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }, 500);

      return () => clearTimeout(timer);
    }, [hasAnimated, end, duration]);

    return (
      <motion.div 
        className="text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        onViewportEnter={() => !hasAnimated && setHasAnimated(true)}
      >
        <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">
          {count}+
        </div>
        <div className="text-sm md:text-base text-gray-700 font-medium uppercase tracking-wide">
          {label}
        </div>
      </motion.div>
    );
  };

  // Image slider
  const images = [HandImg, H2H, TruckImg, cutImg];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

const goToNext = () => setCurrentImage((prev) => (prev + 1) % images.length);
const goToPrev = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);


  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-fixed flex items-center "
        style={{
          backgroundImage: `url(${images[currentImage]})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" style={{marginTop: 0, padding: 0}}></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Company Logo */}
          <motion.div 

            className="mb-8 pt-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-green-600 font-bold text-3xl">KS</span>
              </div> */}
              <div className="text-left">
                {/* <h1 className="text-2xl md:text-4xl font-bold">KS AGRI (PVT) LTD</h1> */}
                <p className="text-green-200 text-sm md:text-base uppercase tracking-wider">Premium Agricultural Exports</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Tagline - Multi-line like CR Exports */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-7xl font-bold leading-tight mb-6">
              <div className="mb-2">EXTENDING ROOTS</div>
              <div className="text-3xl md:text-5xl text-green-400">IN GLOBAL AGRICULTURE</div>
            </h2>
            
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            
            <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200">
              Established with a vision to connect Sri Lankan agricultural excellence to global markets, 
              KS AGRI has become a trusted source of premium tropical fruits and vegetables from the pearl of the Indian Ocean.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12"
          >
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              EXPLORE OUR PRODUCTS
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>

          {/* Manual Controls */}
          <div className="absolute left-4 bottom-4 flex gap-2 z-20">
            <button onClick={goToPrev} className="bg-white/70 hover:bg-white text-black px-3 py-1 rounded">Prev</button>
            <button onClick={goToNext} className="bg-white/70 hover:bg-white text-black px-3 py-1 rounded">Next</button>
          </div>
        </div>
      </section>

      {/* Stats Section - Like CR Exports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={150} label="shipments a month" />
            <AnimatedCounter end={75} label="hardworking employee base" />
            <AnimatedCounter end={16} label="years of experience & knowledge" />
            <AnimatedCounter end={2000} label="farmers involved in production" />
          </div>
        </div>
      </section>

      {/* About Section - Mirroring CR Exports layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sri Lankan Agriculture"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                EXTENDING ROOTS
              </h2>
              
              <div className="w-16 h-1 bg-green-500 mb-8"></div>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Established in 2008, KS AGRI has transformed over the years to become a renowned and 
                  trusted source of fresh tropical fruits and vegetables from the pearl of the Indian Ocean.
                </p>
                
                <p>
                  We are proudly one of the leading exporters of cassava, papaya, king coconut, and fresh coconuts 
                  in Sri Lanka, and our commitment to sustainable farming practices is a fitting testament of our 
                  dedication to superior quality.
                </p>
                
                <p>
                  We support the livelihoods of a large community of farmers both directly and indirectly, 
                  and together we strive towards extending our roots in the global agricultural industry.
                </p>
                
                <p className="font-semibold text-green-600">
                  And we haven't stopped... the journey for excellence continues!
                </p>
              </div>
              
              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                READ MORE
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Feature Blocks like CR Exports */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              YES! WE RANK HIGH!
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We are among the leading exporters of tropical fruits & vegetables in Sri Lanka because our productivity is high!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Freshness Guaranteed",
                description: "The produce we supply undergoes a strict quality assurance check by our trained staff to safeguard optimum freshness."
              },
              {
                icon: Clock,
                title: "On-time Delivery",
                description: "We understand that our buyers needs can be time-critical and so we have invested in the right tools to enable a quick turnaround of orders."
              },
              {
                icon: Award,
                title: "Industry Expertise",
                description: "We have gained over 16 years of industry experience and this gives us a competitive edge in the market."
              },
              {
                icon: Users,
                title: "Farmer Networks",
                description: "We liaise closely with a vast network of farmers to meet the highest standards while supporting their livelihoods."
              },
              {
                icon: Check,
                title: "Quality Standards",
                description: "We are in compliance with international quality standards, which are fitting testaments to our continued commitment to quality."
              },
              {
                icon: Factory,
                title: "Updated Facilities",
                description: "From cool rooms to refrigerated transport, we have all the updated facilities that safeguard freshness."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Matching CR Exports categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                alt="Organic Farm"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              OUR PRODUCTS
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We supply a premium range of products that are listed under the below four categories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "TROPICAL FRUITS",
                description: "From Papaya to King Coconut, we supply a premium range of tropical fruits to the export market.",
                image: "https://th.bing.com/th/id/R.e93c7dc87b75d772cccae6e7abfa4390?rik=aC%2fO2TsNeWdrLA&pid=ImgRaw&r=0"
              },
              {
                title: "ROOT VEGETABLES",
                description: "Fresh Cassava and other root vegetables are harvested and processed to meet international standards.",
                image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
              },
              {
                title: "COCONUT PRODUCTS",
                description: "Premium coconuts including King Coconuts and Fresh Coconuts for global distribution.",
                image: "https://th.bing.com/th/id/OIP.SnYZ3bXDAr5-d6Vm7EA17wHaDu?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
              },
              {
                title: "FRESH VEGETABLES",
                description: "A variety of fresh vegetables including leafy greens and seasonal produce for export markets.",
                image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <button className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 uppercase tracking-wide text-sm">
                    Browse →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default KSAgriHomepage;