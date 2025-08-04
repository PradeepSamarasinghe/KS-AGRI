import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import api from '../services/api';

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
      await api.post('/contact', formData);
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
      setError(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24"> {/* Added pt-24 for Navbar offset */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting KS AGRI. We have received your inquiry and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24"> {/* Added pt-24 for Navbar offset */}
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">KS</span>
            </div>
            <span className="text-green-600 font-semibold uppercase tracking-widest">Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Start Your Export
            <br />
            <span className="text-green-600">Journey Today</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to explore premium Sri Lankan agricultural products? Get in touch with our team 
            for personalized quotes and expert guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Send className="text-green-600" size={24} />
              <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Your country"
                  />
                </div>
              </div>

              {/* Inquiry Details */}
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products of Interest
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {products.map((product) => (
                    <label key={product} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.productsOfInterest.includes(product)}
                        onChange={() => handleProductInterestChange(product)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{product}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimatedQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    id="estimatedQuantity"
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 10 tons, 500 kg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContactMethod"
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Please provide details about your inquiry, including specific requirements, quantities, and any other relevant information..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Company Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-64">
              <img 
                src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="KS AGRI Facilities" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">Visit Our Facilities</h4>
                <p className="text-gray-200">See our export operations firsthand</p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">123 Export Boulevard</p>
                  <p className="text-gray-600 text-sm">Colombo 03, Sri Lanka</p>
                  <p className="text-gray-600 text-sm">10300</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">+94 11 234 5678</p>
                  <p className="text-gray-600 text-sm">+94 77 123 4567 (Mobile)</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">info@ksagri.lk</p>
                  <p className="text-gray-600 text-sm">export@ksagri.lk</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 8:00 AM - 2:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-orange-400" size={24} />
                <h4 className="text-xl font-bold">Quick Response Team</h4>
              </div>
              <p className="text-green-100 mb-4">
                Our export specialists are available to provide immediate assistance for urgent inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  WhatsApp: +94 77 123 4567
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Skype: ksagri.exports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;