const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restnode', { useNewUrlParser: true, useUnifiedTopology: true })    .then(() => console.log('Connected to Mongo')) 
    .catch(err => console.err('Could not connect to Mongo', err))

const dishSchema = new mongoose.Schema({  
    name: String, 
    description: String,  
    ingredients: [ {name: String, quantity: Number, unit: String}],  
    date: {type: Date, default: Date.now },
    version: String,
    menu: String
});

const Dish = mongoose.model('Dish', dishSchema);//create the Model

async function createDish(){  
    
    const dish1 = new Dish({  
        name: 'Filet Mignon',   
        description: 'Waygu beef from Oregon',  
        ingredients: [{name: 'Filet Mignon', quantity: '8', unit: 'oz'}]   
    })  
    var result = await dish1.save();  
    console.log("dish1 - " + result);    
    
    const dish2 = new Dish({
        name: 'Sea Bass',     
        description: 'Wild caught never frozen Pacific Sea Bass',       
      ingredients: [{name: 'Sea Bass', quantity: '8', unit: 'oz'}] 
    })   
    result = await dish2.save();  
    console.log("dish2 - " + result);   
    
    const dish3 = new Dish({    
        name: '',     
        description: 'Waygu beef from Oregon',   
        ingredients: [{name: 'Filet Mignon', quantity: '8', unit: 'oz'}]  
    })   
    result = await dish3.save();   
    console.log("dish3 - " + result);
    
};
createDish();