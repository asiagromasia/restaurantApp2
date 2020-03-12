const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

var objectID = require('mongodb').ObjectID; 
app.use(express.json()); //return the body as json
app.use(cors());



mongoose.connect('mongodb://localhost/restnode', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(err => console.err('Could not connect to Mongo', err))

const dishSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [ {name: String, quantity: Number, unit: String}],
    date: {type: Date, default: Date.now },
    version: String,
    menu: String,
});

const Dish = mongoose.model('Dish', dishSchema);

/*async function getDish(){

    const dishes = await Dish
       .find() //{name: 'Filet Mignon'}
       .select({id: 1,name: 1, description: 1});  //chose which fields you want
    

    console.log('getDish dishes - ',dishes);
    return(dishes);

};*/

const port = 3200;

app.listen(port, () => console.log(`Server started on port ${port}`))

app.get('/api/dish', cors(), (req, res) => {
    //const dishes =  getDish();
    //console.log('api.get dishes -',dishes);
    //res.json(dishes);
    var query = req.params.query;
    Dish
    .find({'request': query}, function(err, result)
        {if (err) throw err;
        if (result) {
            res.json(result)
        } else ( res.send(JSON.stringify({error: 'Error'})))})
    .select({id: 1, name: 1, description: 1});  //chose which fields you want
})
app.post('/api/dish', cors(), (req,res) =>{  
   // console.log(JSON.stringify(req.body)); 
    //console.log(JSON.stringify(req));   
    var dish = new Dish({
        name: req.body.name,  
        description: req.body.description,
        version:req.body.version,
        menu: req.body.menu
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
})

