const jwt = require('jsonwebtoken');
const Contact = require('../models/contact');
const { encrypt, decrypt } = require('../utils/encryptDecrypt');
require('dotenv').config();

const createContact = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        const { name, phone, email, linkedin, twitter } = req.body;
        const contact = new Contact({
            name: encrypt(name),
            phone: encrypt(phone.toString()),
            email: email ? encrypt(email) : null,
            linkedin: linkedin ? encrypt(linkedin) : null,
            twitter: twitter ? encrypt(twitter) : null
        });

        try {
            await contact.save();
            res.json({ message: 'Contact created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

const editContact = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        const { name, email, linkedin, twitter } = req.body;
        try {
            const contact = await Contact.findOne({ name: decrypt(name) });
            if (!contact) return res.status(404).json({ message: 'Contact not found' });

            if (email) contact.email = decrypt(email);
            if (linkedin) contact.linkedin = decrypt(linkedin);
            if (twitter) contact.twitter = decrypt(twitter);

            await contact.save();
            res.json({ message: 'Contact updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

const searchContact = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        const { search_token } = req.body;
        try {
            const contacts = await Contact.find();
            const results = contacts.filter(contact => decrypt(contact.name).includes(search_token));
            if (results.length === 0) return res.status(404).json({ message: 'No contacts found' });

            const decryptedResults = results.map(contact => ({
                name: decrypt(contact.name),
                phone: decrypt(contact.phone),
                email: contact.email ? decrypt(contact.email) : null,
                linkedin: contact.linkedin ? decrypt(contact.linkedin) : null,
                twitter: contact.twitter ? decrypt(contact.twitter) : null
            }));

            res.json(decryptedResults);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

module.exports = { createContact, editContact, searchContact };


6