import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { body } from 'express-validator';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/products'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Validation rules
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('availableQuantity')
    .isInt({ min: 0 })
    .withMessage('Available quantity must be a non-negative integer'),
  body('unit')
    .isIn(['kg', 'tons', 'pieces', 'boxes'])
    .withMessage('Unit must be one of: kg, tons, pieces, boxes'),
  body('category')
    .isIn(['fruits', 'vegetables', 'coconut-products', 'organic'])
    .withMessage('Category must be one of: fruits, vegetables, coconut-products, organic'),
  body('harvestSeason')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Harvest season is required'),
  body('shelfLife')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Shelf life is required')
];

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), upload.single('image'), productValidation, createProduct);
router.put('/:id', protect, authorize('admin'), upload.single('image'), productValidation, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;