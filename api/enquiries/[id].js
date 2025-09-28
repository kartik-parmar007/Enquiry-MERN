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

    const { id } = req.query;

    switch (req.method) {
      case 'PUT':
        return handlePut(req, res, id);
      case 'DELETE':
        return handleDelete(req, res, id);
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle PUT - Update enquiry
async function handlePut(req, res, id) {
  try {
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
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Error updating enquiry' });
    }
  }
}

// Handle DELETE - Delete enquiry
async function handleDelete(req, res, id) {
  try {
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