import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, Leaf, Heart, Truck, Shield } from 'lucide-react';
import pradeepImage from '../assets/images/my.jpeg';
import TharakaImage from '../assets/images/my1.jpeg';
import backgroundImg from '../assets/images/Background.jpg'
import {
  FloatingCard,
  RotatingIcon,
  ParallaxBackground,
  TimelineItem,
  TeamMemberCard,
  AnimatedCounter,
  FloatingElements
} from '../components/3DAnimations';

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to eco-friendly farming practices that protect our environment for future generations.'
    },
    {
      icon: Heart,
      title: 'Quality First',
      description: 'Uncompromising quality standards ensure only the finest products reach our international partners.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Empowering local farmers and communities through fair trade practices and sustainable partnerships.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting Sri Lankan agriculture to markets worldwide with reliable export solutions.'
    }
  ];

  const milestones = [
    { year: '2009', title: 'Company Founded', description: 'KS AGRI established with a vision to export premium Sri Lankan agricultural products.' },
    { year: '2012', title: 'International Expansion', description: 'First exports to Middle East and European markets.' },
    { year: '2015', title: 'Organic Certification', description: 'Achieved organic certification for sustainable farming practices.' },
    { year: '2018', title: 'Technology Integration', description: 'Implemented modern cold chain and logistics systems.' },
    { year: '2020', title: 'Global Recognition', description: 'Awarded "Best Agricultural Exporter" by Sri Lanka Export Development Board.' },
    { year: '2024', title: 'Digital Transformation', description: 'Launched comprehensive digital platform for global customers.' }
  ];

  const team = [
    {
      name: 'Pradeep Samarasinghe',
      position: 'Founder & CEO',
      description: 'With over 20 years in agricultural export, Pradeep leads our vision of connecting Sri Lankan farmers to global markets.',
      image: pradeepImage
    },
    {
      name: 'Priya Mendis',
      position: 'Head of Quality Assurance',
      description: 'Priya ensures every product meets international standards with her expertise in food safety and quality control.',
      image: TharakaImage
    },
    {
      name: 'Rajesh Fernando',
      position: 'Export Operations Manager',
      description: 'Rajesh manages our global logistics network, ensuring timely and safe delivery to customers worldwide.',
    }
  ];

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
            <span className="text-green-100 font-semibold uppercase tracking-widest">About Us</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-green-300">KS AGRI</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bridging Sri Lankan agriculture with global markets through quality, sustainability, and innovation for over 16 years.
          </motion.p>
          <motion.div 
            className="mt-8 h-1 w-16 bg-green-300 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </section>

      {/* Mission & Vision with 3D Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <FloatingCard delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border-l-4 border-green-600">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading bridge between Sri Lankan agricultural excellence and global markets, delivering premium quality products while supporting sustainable farming practices and empowering local communities.
                </p>
                <motion.div 
                  className="mt-6 h-0.5 w-24 bg-green-200 rounded-full"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </FloatingCard>
            <FloatingCard delay={0.4}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border-l-4 border-green-600">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the most trusted and innovative agricultural export company in Sri Lanka, recognized globally for our commitment to quality, sustainability, and ethical practices.
                </p>
                <motion.div 
                  className="mt-6 h-0.5 w-24 bg-green-200 rounded-full"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Our Story with 3D Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global recognition, our journey reflects our commitment to excellence.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sri Lankan farm"
                className="w-full h-96 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent"></div>
              <FloatingElements>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      <AnimatedCounter end={16} />
                    </div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                </div>
              </FloatingElements>
            </motion.div>
            <motion.div 
              className="space-y-6"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded in 2009 by Pradeep Samarasinghe, KS AGRI began as a small family business with a vision to share Sri Lankan agricultural richness globally.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our growth into serving over 25 countries is built on farmer relationships, quality control, and sustainable practices.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we innovate and expand, staying true to our values of quality and community empowerment.
              </p>
              <motion.div 
                className="mt-6 h-0.5 w-24 bg-green-200 rounded-full"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values with 3D Rotating Icons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles guiding our decisions and relationships.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <FloatingCard key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-green-100">
                    <RotatingIcon Icon={Icon} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{value.description}</p>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline with 3D Animations */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones shaping our growth over 16 years.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="relative">
            <motion.div 
              className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-green-200"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5 }}
            />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <TimelineItem 
                  key={index} 
                  milestone={milestone} 
                  index={index}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team with 3D Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experienced professionals driving our mission forward.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards with 3D Effects */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certifications & Recognition</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality recognized by international standards.
            </p>
            <motion.div 
              className="mt-4 h-0.5 w-24 bg-green-200 mx-auto rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ISO 22000', description: 'Food Safety Management' },
              { title: 'HACCP', description: 'Hazard Analysis Critical Control Points' },
              { title: 'Organic Certified', description: 'USDA & EU Organic Standards' },
              { title: 'Fair Trade', description: 'Ethical Trading Practices' }
            ].map((cert, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow border border-green-100">
                  <motion.div 
                    className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ 
                      backgroundColor: "#dcfce7",
                      rotateY: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Shield className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-gray-600 text-base">{cert.description}</p>
                  <motion.div 
                    className="mt-4 h-0.5 w-16 bg-green-200 mx-auto rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;