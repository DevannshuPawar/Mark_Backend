const express = require('express');
const router = express.Router();
const BusinessAccount = require('../Model/BusinessAccount');
const BusinessListing = require('../Model/BusinessListing');

// POST /business/register
router.post('/register', async (req, res) => {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone) {
    return res.status(400).json({ message: 'Email, phone, and password are required.' });
  }

  const existing = await BusinessAccount.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Business account already exists with this email.' });
  }

  const account = new BusinessAccount({ email, password, phone });
  await account.save();

  res.status(201).json({ message: 'Account created successfully', accountId: account._id });
});

// POST /business/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const account = await BusinessAccount.findOne({ email });
  if (!account || account.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', accountId: account._id });
});

// POST /business/list
router.post('/list', async (req, res) => {
  const {
    organizationName,
    address,
    contact,
    logoUrl,
    description,
    images,
    website,
    mapLocation
  } = req.body;

  if (
    !organizationName || !address?.street || !address?.city || !address?.state ||
    !contact?.email || !contact?.phone || !logoUrl || !description || !images?.length || !mapLocation
  ) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  try {
    const listing = new BusinessListing({
      organizationName,
      address,
      contact,
      logoUrl,
      description,
      images,
      website,
      mapLocation
    });

    await listing.save();
    res.status(201).json({ message: 'Business listed successfully', listing });
  } catch (error) {
    console.error('Error while listing business:', error);
    res.status(500).json({ message: 'Server error while listing business.' });
  }
});

// GET /business/listall
router.get('/listall', async (req, res) => {
  try {
    const listings = await BusinessListing.find({});
    res.status(200).json({ message: 'All business listings fetched successfully', listings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error while fetching listings.' });
  }
});


module.exports = router;
