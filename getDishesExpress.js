const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

var objectID = require('mongodb').ObjectID; 
app.use(express.json()); //return the body as json
app.use(cors());



mongoose.connect('mongodb://localhost/restnode', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(err => console.err('Could not connect to Mongo', err));
//ingredients: [{name: String, quantity: Number, unit: String}],
const dishSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: String,
    date: {type: Date, default: Date.now },
    version: String,
    menu: String,
    quantity:Number,
    service:String,
    waitTime:Number
});

const Dish = mongoose.model('Dish', dishSchema);

const reservationSchema = new mongoose.Schema({
    guestName: String, 
    partyNumber: Number, 
    resDate: Date,   
    time24hr: String, 
    // weekDay: String,
    tableNumber: Number,  
    date: [{type: Date, default: Date.now}],
    instructions:String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

const orderSchema = new mongoose.Schema({
    orderer: String, 
    partyNumber: Number,
    orderDish: String, 
    specialInstructions: String,
    allergies: String
});

const Order = mongoose.model('Order', orderSchema);


const port = 3200;

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/api/dish', cors(), (req, res) => {
    var query = req.params.query;
    Dish
    .find({'request': query}, function(err, result)
        {if (err) throw err;
        if (result) {
            res.json(result)
        } else ( res.send(JSON.stringify({error: 'Error'})))})
    .select({id: 1, name: 1, description: 1,quantity:1, service:1,waitTime:1,version:1,date:1, menu:1,ingredients:1});  //chose which fields you want
    
});

app.post('/api/dish', cors(), (req,res) =>{  
   // console.log(JSON.stringify(req.body)); 
    //console.log(JSON.stringify(req));   
    var dish = new Dish({
        name: req.body.name,  
        description: req.body.description,
        ingredients: req.body.ingredients,
        date:req.body.date,
        version:req.body.version,
        menu: req.body.menu,
        quantity:req.body.quantity,
        service:req.body.service,
        waitTime:req.body.waitTime   
        
    }) 
    dish.save(function(err, result){     
        if (err) {return next(err)}    
        res.status(201).json(result)
    });
});

app.delete('api/dish/:id', (req,res) =>{
    console.log(req.params.id);  
    let query = {_id: objectID(req.params.id)};  
    console.log(query);   
    Dish.deleteOne(query, function(err,result){  
        assert.equal(null, err);   
        console.log("Item deleted");
        })  
        .catch(err => next(err)) 
});

app.get('/api/reservation', cors(), (req, res) => {
    //const dishes =  getDish();
    //console.log('api.get dishes -',dishes);
    //res.json(dishes);
    var query = req.params.query;
    Reservation
        .find({'request': query}, function(err, result)
            {if (err) throw err;
             // {if (err) return next(err);
            if (result) {
                res.json(result)
            } else ( res.send(JSON.stringify({error: 'Error'})))})
        .select({id: 1, guestName: 1, partyNumber: 1, resDate:1, time24hr:1,tableNumber:1,date:1,instructions:1}); //chose which fields you want  weekDay:1,
});

app.post('/api/reservation', cors(), (req,res) =>{  
   //console.log(JSON.stringify(req.body)); 
    //console.log(JSON.stringify(req));   
    var reservation = new Reservation({
        guestName: req.body.guestName,  
        partyNumber: req.body.partyNumber,
        resDate: req.body.resDate,
        time24hr: req.body.time24hr,
        //weekDay: req.body.weekDay,
        tableNumber: req.body.tableNumber,
        date: req.body.date,
        instructions: req.body.instructions
    });
    reservation.save(function(err, result){ 
        if (err) {return next(err)}    
        res.status(201).json(result)
    });
});

app.delete('api/reservation/:id', (req,res) =>{
    console.log(req.params.id);  
    let query = {_id: objectID(req.params.id)};  
    console.log(query);   
    Reservation.deleteOne(query, function(err,result){  
        assert.equal(null, err);   
        console.log("Item deleted");
        })  
        .catch(err => next(err)) 
});
app.get('/api/order', cors(), (req, res) => {
    var query = req.params.query;
    Order
        .find({'request': query}, function(err, result)
            {if (err) throw err;
            if (result) {
                res.json(result)
            } else ( res.send(JSON.stringify({error: 'Error'})))})
        .select({id: 1, orderer: 1,partyNumber:1, orderDish: 1, specialInstructions: 1, allergies: 1}); //chose which fields you want  
});

app.post('/api/order', cors(), (req,res) =>{  
    var order = new Order({
        orderer: req.body.orderer, 
        partyNumber: req.body.partyNumber,
        orderDish: req.body.orderDish,  
        specialInstructions: req.body.specialInstructions,
        allergies: req.body.allergies
    });
    order.save(function(err, result){ 
        if (err) {return next(err)}    
        res.status(201).json(result)
    });
});

app.delete('api/order/:id', (req,res) =>{
    console.log(req.params.id);  
    let query = {_id: objectID(req.params.id)};  
    console.log(query);   
    Order.deleteOne(query, function(err,result){  
        assert.equal(null, err);   
        console.log("Item deleted");
        })  
        .catch(err => next(err)) 
});





