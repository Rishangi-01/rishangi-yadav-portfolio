const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const sendContactNotification = async ({ name, email, telephone, subject, message }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD.replace(/\s+/g, ''),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'rishangiyadav05@gmail.com',
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${telephone}`,
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n'),
  });

  return true;
};

const submitContact = async (req, res) => {
  try {
    const { name, email, telephone, subject, message } = req.body;

    if (!name || !email || !telephone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, telephone, subject, and message',
      });
    }

    const contact = await Contact.create({ name, email, telephone, subject, message });
    let notificationMessage = 'Message saved successfully, but email notification is not configured.';

    try {
      const emailSent = await sendContactNotification({ name, email, telephone, subject, message });
      if (emailSent) {
        notificationMessage = 'Message sent successfully';
      }
    } catch (emailError) {
      console.error(`Contact notification email failed: ${emailError.message}`);
      notificationMessage = 'Message saved successfully, but the email notification could not be sent.';
    }

    res.status(201).json({
      success: true,
      message: notificationMessage,
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to send message',
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch messages' });
  }
};

const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.status(200).json({ success: true, message: 'Message marked as read', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to mark as read' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to delete message' });
  }
};

module.exports = {
  submitContact,
  getContacts,
  markContactAsRead,
  deleteContact,
};
