const express = require('express');
const path = require('path');
const port = 4500;

const db = require('./config/mongoose');
const Contact = require('./model/model');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req,res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching the contacts");
        }
        return res.render('index',{
            title:"Contact List",    
            contact_list: contacts
    });
  
    }); 
});
app.post('/create-contact',function(req,res){
    console.log(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err){
            console.log("Error in creating a contact!");
            return;
        }
        // console.log('*******', newContact);
        return res.redirect('back');
    })
}); 

// delete contact
app.get('/delete-contact/', function(req, res) {
    //get the id from the url
    console.log(req.query);
    let id = req.query.id;
    //find the contact in the database using the id and delete 

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log("Error in deleting an object from DB");
            return;
        }
        return res.redirect('back');
    });

});

//now we need to run the server 
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server!',err); 
    }
    console.log('my server running on port:',port);
});


