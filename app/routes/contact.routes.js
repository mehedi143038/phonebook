module.exports = (app) =>{
    const contacts = require('../controllers/contact.controller');

    // Add a new contact
    app.post('/contacts', contacts.create);

    //Get a single contact
    app.get('/contacts/:contactNumber', contacts.findOne);

    // Get all the contacts
    app.get('/contacts', contacts.findAll);

    //Edit a contact number
    app.put('/contacts/:contactNumber', contacts.update);

    //Delete a given number
    app.delete('/contacts/:contactNumber', contacts.delete);
}