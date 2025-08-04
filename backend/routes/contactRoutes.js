import express from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('country')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country is required'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Message must be between 20 and 2000 characters'),
  body('inquiryType')
    .isIn(['product-inquiry', 'partnership', 'pricing', 'quality-certificates', 'bulk-orders', 'other'])
    .withMessage('Please select a valid inquiry type')
];

const updateContactValidation = [
  body('status')
    .optional()
    .isIn(['new', 'in-progress', 'responded', 'closed'])
    .withMessage('Status must be one of: new, in-progress, responded, closed'),
  body('responseNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Response notes cannot exceed 1000 characters'),
  body('followUpDate')
    .optional()
    .isISO8601()
    .withMessage('Follow up date must be a valid date')
];

// Public routes
router.post('/', contactValidation, createContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/stats', protect, authorize('admin'), getContactStats);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContactValidation, updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;