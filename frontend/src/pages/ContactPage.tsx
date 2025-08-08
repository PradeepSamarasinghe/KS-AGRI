import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import backgroundImg from '../assets/images/Background.jpg';

// 3D Animation Components (inline versions)
const FloatingCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`${className} transform-gpu`}
    >
      {children}
    </motion.div>
  );
};



interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  subject: string;
  message: string;
  inquiryType: string;
  productsOfInterest: string[];
  estimatedQuantity: string;
  preferredContactMethod: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    subject: '',
    message: '',
    inquiryType: 'product-inquiry',
    productsOfInterest: [],
    estimatedQuantity: '',
    preferredContactMethod: 'email'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inquiryTypes = [
    { value: 'product-inquiry', label: 'Product Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'pricing', label: 'Pricing Information' },
    { value: 'quality-certificates', label: 'Quality Certificates' },
    { value: 'bulk-orders', label: 'Bulk Orders' },
    { value: 'other', label: 'Other' }
  ];

  const products = [
    'Fresh Cassava',
    'Premium Papaya',
    'King Coconut',
    'Coconut Products',
    'Organic Vegetables',
    'Tropical Fruits'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductInterestChange = (product: string) => {
    setFormData(prev => ({
      ...prev,
      productsOfInterest: prev.productsOfInterest.includes(product)
        ? prev.productsOfInterest.filter(p => p !== product)
        : [...prev.productsOfInterest, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        subject: '',
        message: '',
        inquiryType: 'product-inquiry',
        productsOfInterest: [],
        estimatedQuantity: '',
        preferredContactMethod: 'email'
      });
    } catch (error: any) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        className="min-h-screen font-sans pt-24 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImg})`
        }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <FloatingCard>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-green-100">
                <motion.div 
                  className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  whileHover={{ 
                    backgroundColor: "#dcfce7",
                    rotateY: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for contacting KS AGRI. We have received your inquiry and will get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => setSuccess(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-sans pt-24 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImg})`
      }}
    >
      {/* Hero Section with 3D Parallax */}
      <section className="relative py-16 text-white overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-gradient-to-b" 
          style={{
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        ></div>
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
              <span className="text-white font-bold text-xl">KS</span>
            </motion.div>
            <span className="text-green-100 font-semibold uppercase tracking-widest">Contact Us</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Your Export <span className="text-green-300">Journey</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to explore premium Sri Lankan agricultural products? Get in touch with our team for personalized quotes and expert guidance.
          </motion.p>
          <motion.div 
            className="mt-8 h-1 w-16 bg-green-300 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FloatingCard delay={0.2}>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="text-green-600" size={28} />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                </div>
                
                {error && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <motion.input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Your first name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <motion.input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Your last name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="your.email@company.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="+1 234 567 8900"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <motion.input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <motion.input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Your country"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <motion.select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      whileFocus={{ scale: 1.02 }}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Products of Interest
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {products.map((product) => (
                        <motion.label 
                          key={product} 
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.productsOfInterest.includes(product)}
                            onChange={() => handleProductInterestChange(product)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{product}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="estimatedQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Quantity
                      </label>
                      <motion.input
                        type="text"
                        id="estimatedQuantity"
                        name="estimatedQuantity"
                        value={formData.estimatedQuantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 10 tons, 500 kg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <motion.select
                        id="preferredContactMethod"
                        name="preferredContactMethod"
                        value={formData.preferredContactMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="both">Both</option>
                      </motion.select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please provide details about your inquiry, including specific requirements, quantities, and any other relevant information..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </FloatingCard>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Image */}
              <FloatingCard delay={0.4}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64">
                  <motion.img 
                    src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                    alt="KS AGRI Facilities" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-xl font-bold mb-2">Visit Our Facilities</h4>
                    <p className="text-gray-200">See our export operations firsthand</p>
                  </div>
                </div>
              </FloatingCard>

              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingCard delay={0.6}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100 transform-gpu">
                    <motion.div 
                      className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4"
                      whileHover={{ 
                        backgroundColor: "#dbeafe",
                        rotateY: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin size={24} />
                    </motion.div>
                    <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm">123 Export Boulevard</p>
                      <p className="text-gray-600 text-sm">Colombo 03, Sri Lanka</p>
                      <p className="text-gray-600 text-sm">10300</p>
                    </div>
                    <motion.div 
                      className="mt-4 h-0.5 w-16 bg-blue-200 rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.7}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100 transform-gpu">
                    <motion.div 
                      className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                      whileHover={{ 
                        backgroundColor: "#dcfce7",
                        rotateY: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone size={24} />
                    </motion.div>
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm">+94 11 234 5678</p>
                      <p className="text-gray-600 text-sm">+94 77 123 4567 (Mobile)</p>
                    </div>
                    <motion.div 
                      className="mt-4 h-0.5 w-16 bg-green-200 rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.8}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100 transform-gpu">
                    <motion.div 
                      className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4"
                      whileHover={{ 
                        backgroundColor: "#fed7aa",
                        rotateY: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail size={24} />
                    </motion.div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm">info@ksagri.lk</p>
                      <p className="text-gray-600 text-sm">export@ksagri.lk</p>
                    </div>
                    <motion.div 
                      className="mt-4 h-0.5 w-16 bg-orange-200 rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </FloatingCard>
                
                <FloatingCard delay={0.9}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100 transform-gpu">
                    <motion.div 
                      className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4"
                      whileHover={{ 
                        backgroundColor: "#e9d5ff",
                        rotateY: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Clock size={24} />
                    </motion.div>
                    <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm">Saturday: 8:00 AM - 2:00 PM</p>
                      <p className="text-gray-600 text-sm">Sunday: Closed</p>
                    </div>
                    <motion.div 
                      className="mt-4 h-0.5 w-16 bg-purple-200 rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </FloatingCard>
              </div>

              {/* Quick Contact */}
              <FloatingCard delay={1.0}>
                <div className="bg-green-600 rounded-xl p-6 text-white shadow-2xl border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Clock className="text-orange-400" size={28} />
                    </motion.div>
                    <h4 className="text-xl font-bold">Quick Response Team</h4>
                  </div>
                  <p className="text-green-100 mb-4">
                    Our export specialists are available to provide immediate assistance for urgent inquiries.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      WhatsApp: +94 77 123 4567
                    </motion.button>
                    <motion.button 
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skype: ksagri.exports
                    </motion.button>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;