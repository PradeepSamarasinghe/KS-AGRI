import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Add IP address and user agent for tracking
    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    const contact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact message sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error in createContact:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error sending contact message',
      error: error.message
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.inquiryType) {
      filter.inquiryType = req.query.inquiryType;
    }

    if (req.query.urgency) {
      filter.urgency = req.query.urgency;
    }

    if (req.query.search) {
      filter.$or = [
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { lastName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { company: { $regex: req.query.search, $options: 'i' } },
        { subject: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sort = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort = { createdAt: -1 };
    }

    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'firstName lastName');

    const total = await Contact.countDocuments(filter);

    // Get status counts for dashboard
    const statusCounts = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'firstName lastName');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error in getContact:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    });
  }
};

// @desc    Update contact message
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { status, assignedTo, responseNotes, followUpDate } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
        assignedTo,
        responseNotes,
        followUpDate
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('assignedTo', 'firstName lastName');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact message updated successfully'
    });
  } catch (error) {
    console.error('Error in updateContact:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating contact message',
      error: error.message
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteContact:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message',
      error: error.message
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private/Admin
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          newMessages: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          },
          inProgressMessages: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          respondedMessages: {
            $sum: { $cond: [{ $eq: ['$status', 'responded'] }, 1, 0] }
          },
          closedMessages: {
            $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
          }
        }
      }
    ]);

    const inquiryTypeStats = await Contact.aggregate([
      {
        $group: {
          _id: '$inquiryType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const monthlyStats = await Contact.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalMessages: 0,
          newMessages: 0,
          inProgressMessages: 0,
          respondedMessages: 0,
          closedMessages: 0
        },
        inquiryTypes: inquiryTypeStats,
        monthlyTrends: monthlyStats
      }
    });
  } catch (error) {
    console.error('Error in getContactStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
};