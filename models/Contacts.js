const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    
    phone_numbers: {
        type: [String],
        required:true,
        min: 8,
        max: 13
    },
    last_name: {
        type: String,
        required:true,
        min: 3,
        max: 255
    },
    first_name: {
        type: String,
        required:true,
        min: 3,
        max: 255
    }

});

module.exports = mongoose.model('contacts', ContactsSchema);