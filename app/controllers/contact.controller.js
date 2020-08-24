const Contact = require('../models/contact.model');

//phone number validation
const validatePhoneNumber = require('validate-phone-number-node-js');

// Add and save a new contact
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.number) {
        return res.status(400).send({
            message: "Contact name and number cannot be empty"
        });
    }

    //create a Contact
    const contact = new Contact({
        name: req.body.name,
        number: req.body.number
    });

    //save Contact in the database
    contact.save()
    .then(data => {
        //res.send(data);
        let validNumber = data.number;
        let re = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
        if(!(re.test(validNumber))) {
            return res.status(400).send({
                message: "Phone number is not valid, give a valid Bangladeshi phone number."
            })
        }
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Contact."
        });
    });
};


// Get contact details by a mobile number
exports.findOne = (req, res) => {
    Contact.findOne({number: req.params.contactNumber})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with number " + req.params.contactNumber
            });
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with number " +req.params.contactNumber
            });
        }
        return res.status(500).send({
            message: "Error finding contact with number " + req.params.contactNumber
        });
    });
};


//Get all the contacts
exports.findAll = (req, res) => {
    Contact.find()
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting contacts."
        });
    });
};


//Edit a contact Number
exports.update = (req, res) => {
    //Validate request 
    if(!req.body.name || !req.body.number) {
        return res.status(400).send({
            message: 'name or number property can not be empty'
        });
    }

    //Find out the contact and update it with the request body
    Contact.findOneAndUpdate(req.params.contactNumber, {
        name: req.body.name,
        number: req.body.number
    }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with number " + req.params.contactNumber
            });
        }else{
            let validNumber = contact.number;
            let re = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
            if(!(re.test(validNumber))) {
                return res.status(400).send({
                    message: "Phone number is not valid, give a valid Bangladeshi phone number."
                })
            }
            res.send(contact);
        }
        //res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with number " + req.params.contactNumber
            });
        }
        return res.status(500).send({
            message: "Error updating contact with number " +req.params.contactNumber
        });
    });
};


//Delete a given number
exports.delete = (req, res) => {
    Contact.findOneAndRemove({number: req.body.number})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with number " + req.params.contactNumber
            });
        }
        res.send({
            message: "Contact deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Contact not found with number " + req.params.contactNumber
            });
        }
        return res.status(500).send({
            message: "Could not delete contact with number " + req.params.contactNumber
        });
    });
};