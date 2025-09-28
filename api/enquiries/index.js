const connectDB = require('../utils/db');
const enquiryModel = require('../models/enquiry.model');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    switch (req.method) {
      case 'POST':
        return handlePost(req, res);
      case 'GET':
        return handleGet(req, res);
      case 'PUT':
        return handlePut(req, res);
      case 'DELETE':
        return handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle POST - Insert enquiry
async function handlePost(req, res) {
  try {
    const { kname, kemail, kphone, kmessage } = req.body;
    
    if (!kname || !kemail || !kphone || !kmessage) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const enquiry = new enquiryModel({
      name: kname,
      email: kemail,
      phone: kphone,
      message: kmessage,
    });

    await enquiry.save();
    res.status(201).json({ message: 'Enquiry Inserted', data: enquiry });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Error inserting enquiry' });
    }
  }
}

// Handle GET - List enquiries
async function handleGet(req, res) {
  try {
    const enquiries = await enquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching enquiry list' });
  }
}

// Handle PUT - Update enquiry
async function handlePut(req, res) {
  try {
    const { id } = req.query;
    const { kname, kemail, kphone, kmessage } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Enquiry ID is required' });
    }

    const updatedEnquiry = await enquiryModel.findByIdAndUpdate(
      id,
      {
        name: kname,
        email: kemail,
        phone: kphone,
        message: kmessage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry Updated', data: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ error: 'Error updating enquiry' });
  }
}

// Handle DELETE - Delete enquiry
async function handleDelete(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Enquiry ID is required' });
    }

    const deletedEnquiry = await enquiryModel.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting enquiry' });
  }
}