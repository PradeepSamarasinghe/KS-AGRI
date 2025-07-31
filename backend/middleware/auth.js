import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          message: 'No user found with this token'
        });
      }

      // Check if user account is locked
      if (user.isLocked) {
        return res.status(423).json({
          message: 'Account is temporarily locked due to too many failed login attempts'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Server error in authentication middleware'
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && !user.isLocked) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we don't throw an error for optional auth
        req.user = null;
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Server error in optional authentication middleware'
    });
  }
};