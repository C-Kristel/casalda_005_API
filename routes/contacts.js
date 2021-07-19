const router = require('express').Router();
const Contacts = require('../models/Contacts');
const verify = require('./verifyToken');
const {
    contactValidation
} = require('../validation');

//Get all routes
router.get('/', verify, async (req, res) => {
    const findContacts = await Contacts.find()
    if (findContacts != 0) {
        res.json(findContacts);
    } else {
        return res.status(400).json({ 'error': 'DB is empty' });
    }

});

//CREATE NEW CONTACT
router.post('/new', verify, async (req, res) => {

    //VALIDATION OF DATA 
    const {
        error
    } = contactValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF CONTACT ALREADY EXIST
    const contactExist = await Contacts.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    });
    if (contactExist) return res.status(400).json({ 'error': 'Contact Already Exists' });

    //CREATING CONTACT
    const contact = new Contacts({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_numbers: req.body.phone_numbers,
    });
    try {
        const savedUser = await contact.save();
        res.send({
            contact: contact._id,
            status: "Created"
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Get specific Contacts
router.get('/get/:id', verify, async (req, res) => {
    const q = await Contacts.findById({
        _id: req.params.id
    });
    res.json(q);
});

//Delete Contact
router.delete('/delete/:id', verify, async (req, res) => {
    const result = await Contacts.findByIdAndDelete({
        _id: req.params.id
    });
    res.json(result);
});

//Update a Contacts
router.patch('/update/:id', verify, async (req, res) => {

    //VALIDATION OF DATA 
    const {
        error
    } = contactValidation(req.body);
    if (error) return res.status(400).json({ 'error': error.details[0].message });

    //CHECK IF CONTACT ALREADY EXIST
    const contactExist = await Contacts.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        _id: {
            $ne: req.params.id
        }
    });
    if (contactExist) return res.status(400).json({ 'error': 'Contact Already Exists' });

    //UPDATING CONTACT
    try {
        const patch = await Contacts.updateOne({
            _id: req.params.id
        }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_numbers: req.body.phone_numbers,
            }
        });
        res.json({ 'message': 'Contact Updated' });
    } catch (err) {
        res.status(400).json({ 'error': err });
    }
});

module.exports = router;