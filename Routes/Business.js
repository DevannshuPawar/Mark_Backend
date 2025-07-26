const express = require('express');
const router = express.Router();
const Business = require('../Model/BusinessAccount');

// POST /business/register
router.post('/register', async (req, res) => {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone) {
    return res.status(400).json({ message: 'Email, phone, and password are required.' });
  }

  const existing = await Business.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Business account already exists with this email.' });
  }

  const account = new Business({ email, password, phone });
  await account.save();

  res.status(201).json({ message: 'Account created successfully', accountId: account._id });
});

// POST /business/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const account = await Business.findOne({ email });
  if (!account || account.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', accountId: account._id });
});

// POST /business/list
router.post('/list', async (req, res) => {
  const {
    email,
    organizationName,
    address,
    contact,
    logoUrl,
    description,
    images,
    website,
    mapLocation
  } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required to update listing.' });
  }

  try {
    const updated = await Business.findOneAndUpdate(
      { email },
      {
        organizationName,
        address,
        contact,
        logoUrl,
        description,
        images,
        website,
        mapLocation
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Business not found' });

    res.status(200).json({ message: 'Business listing updated', listing: updated });
  } catch (error) {
    console.error('Error while updating business listing:', error);
    res.status(500).json({ message: 'Server error while listing business.' });
  }
});

// GET /business/listall
router.get('/listall', async (req, res) => {
  try {
    const listings = await Business.find({ organizationName: { $ne: null } });
    res.status(200).json({ message: 'All business listings fetched successfully', listings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error while fetching listings.' });
  }
});

module.exports = router;
