import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// Type definitions
interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface RotatingIconProps {
  Icon: LucideIcon;
  className?: string;
}

interface TimelineItemProps {
  milestone: {
    year: string;
    title: string;
    description: string;
  };
  index: number;
  isEven: boolean;
}

interface TeamMemberCardProps {
  member: {
    name: string;
    position: string;
    description: string;
    image?: string;
  };
  index: number;
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

// 3D Floating Card Component
export const FloatingCard = ({ children, delay = 0, className = "" }: FloatingCardProps) => {
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

// 3D Rotating Icon Component
export const RotatingIcon = ({ Icon, className = "" }: RotatingIconProps) => {
  return (
    <motion.div
      className={`${className} w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4`}
      whileHover={{ 
        rotateY: 360,
        scale: 1.1,
        backgroundColor: "#dcfce7",
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
      animate={{ 
        rotateY: [0, 360],
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      }}
    >
      <Icon className="text-green-600" size={28} />
    </motion.div>
  );
};

// 3D Parallax Background Component
export const ParallaxBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        opacity,
        backgroundImage: `url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1600')`
      }}
      className="absolute inset-0 bg-cover bg-center"
    />
  );
};

// 3D Timeline Item Component
export const TimelineItem = ({ milestone, index, isEven }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ x: isEven ? -100 : 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <motion.div
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-2 border-green-600 transform-gpu"
        >
          <motion.div 
            className="text-2xl font-bold text-green-600 mb-2"
            whileHover={{ scale: 1.1 }}
          >
            {milestone.year}
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
          <p className="text-gray-600 text-base">{milestone.description}</p>
        </motion.div>
      </div>
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg"
        whileHover={{ scale: 1.5, rotate: 180 }}
        animate={{ 
          scale: [1, 1.2, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

// 3D Team Member Card Component
export const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0, rotateX: -15 }}
      animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -20,
        rotateY: 10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu border border-green-100"
    >
      <motion.img
        src={member.image || 'https://via.placeholder.com/300'}
        alt={member.name}
        className="w-full h-64 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-6 text-center">
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-2"
          whileHover={{ color: "#059669" }}
        >
          {member.name}
        </motion.h3>
        <div className="text-green-600 font-medium mb-3">{member.position}</div>
        <p className="text-gray-600 text-base leading-relaxed">{member.description}</p>
        <motion.div 
          className="mt-4 h-0.5 w-16 bg-green-200 mx-auto rounded-full"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// 3D Counter Component
export const AnimatedCounter = ({ end, duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}+</span>;
};

// 3D Cube Animation Component
export const CubeAnimation = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`${className} transform-gpu`}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

// 3D Floating Elements Component
export const FloatingElements = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`${className} transform-gpu`}
      animate={{
        y: [0, -20, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}; 