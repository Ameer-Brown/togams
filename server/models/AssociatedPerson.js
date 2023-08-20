const mongoose = require('mongoose');

const associatedPersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, enum:['Executive Manager', 'Label Manager', 'Label Team', 'Daily Manager', 'Legal Team', 'Touring Team', 'Merch Team', 'Content Team', 'A&R Team', 'Financial Advisor']},
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true } 
    // ... other fields for associated person data ...
});

const AssociatedPerson = mongoose.model('AssociatedPerson', associatedPersonSchema);

module.exports = AssociatedPerson;
