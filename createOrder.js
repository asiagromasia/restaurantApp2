const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restnode', { useNewUrlParser: true, useUnifiedTopology: true })    .then(() => console.log('Connected to Mongo')) 
    .catch(err => console.err('Could not connect to Mongo', err))

const orderSchema = new mongoose.Schema({
    orderer: String, 
    partyNumber: Number,
    orderDish: String,  
    specialInstructions: String,
    allergies: String
});

const Order = mongoose.model('Order', orderSchema);

async function createOrder(){  
    
    const order1 = new Order({  
        orderer:'waitress',
        partyNumber: '5',
        orderDish: 'Filet Mignon',  
        specialInstructions:'extra hot',
        allergies: 'gluten'
    })  
    var result = await order1.save();  
    console.log("order1 - " + result);    
    
    const order2 = new Order({
        orderer:'waitress',
        partyNumber: '2',
        orderDish: 'hot dog',  
        specialInstructions:'extra spicy',
        allergies: 'none'
    })   
    result = await order2.save();  
    console.log("order2 - " + result);   
    
    
};
createOrder();