import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Truck, Shield, Award, Calendar, Clock, Package } from 'lucide-react';
import api from '../services/api';
import backgroundImg from '../assets/images/Background.jpg'

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
  origin: string;
  harvestSeason: string;
  shelfLife: string;
  packagingOptions: string[];
  certifications: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fiber?: number;
    vitamins?: string[];
  };
  createdAt: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        setError(error.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-12 bg-gray-300 rounded" />
                <div className="h-32 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌾</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product not found</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryDisplayName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-green-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.image.startsWith('http') 
                  ? product.image 
                  : `http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {getCategoryDisplayName(product.category)}
                </span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Origin: {product.origin}</span>
                <span>•</span>
                <span>SKU: {product._id.slice(-8).toUpperCase()}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${product.price}
                <span className="text-xl text-gray-600 font-normal">/{product.unit}</span>
              </div>
              <div className="text-sm text-gray-600">
                {product.availableQuantity} {product.unit} available
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Harvest Season</span>
                </div>
                <p className="text-gray-600">{product.harvestSeason}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Shelf Life</span>
                </div>
                <p className="text-gray-600">{product.shelfLife}</p>
              </div>
            </div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {cert.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging Options */}
            {product.packagingOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Packaging Options
                </h3>
                <div className="space-y-2">
                  {product.packagingOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-600">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nutritional Information */}
            {product.nutritionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.nutritionalInfo.calories && (
                      <div>
                        <span className="font-medium">Calories:</span>
                        <span className="ml-2 text-gray-600">{product.nutritionalInfo.calories} kcal</span>
                      </div>
                    )}
                    {product.nutritionalInfo.protein && (
                      <div>
                        <span className="font-medium">Protein:</span>
                        <span className="ml-2 text-gray-600">{product.nutritionalInfo.protein}g</span>
                      </div>
                    )}
                    {product.nutritionalInfo.carbs && (
                      <div>
                        <span className="font-medium">Carbohydrates:</span>
                        <span className="ml-2 text-gray-600">{product.nutritionalInfo.carbs}g</span>
                      </div>
                    )}
                    {product.nutritionalInfo.fiber && (
                      <div>
                        <span className="font-medium">Fiber:</span>
                        <span className="ml-2 text-gray-600">{product.nutritionalInfo.fiber}g</span>
                      </div>
                    )}
                  </div>
                  {product.nutritionalInfo.vitamins && product.nutritionalInfo.vitamins.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium">Rich in vitamins:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {product.nutritionalInfo.vitamins.map((vitamin, index) => (
                          <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                            {vitamin}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Interested in this product?</h3>
              <p className="text-gray-600 mb-4">
                Contact us for bulk pricing, custom packaging, or any questions about this product.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-center font-semibold transition-colors"
                >
                  Request Quote
                </Link>
                <Link
                  to="/products"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg text-center font-semibold transition-colors"
                >
                  View More Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Truck className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Global Shipping</h4>
            <p className="text-gray-600 text-sm">
              Worldwide delivery with proper cold chain management and documentation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Quality Assured</h4>
            <p className="text-gray-600 text-sm">
              Rigorous quality control and international certification standards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Export Excellence</h4>
            <p className="text-gray-600 text-sm">
              15+ years of experience in international agricultural trade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;