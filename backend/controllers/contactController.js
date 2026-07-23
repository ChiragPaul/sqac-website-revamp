const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();
    console.log('Contact saved to MongoDB:', contact._id);
    res.status(201).json({ message: 'Contact form submitted successfully', contact });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
