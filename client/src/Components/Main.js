import React, {Component} from 'react';
import Title from './Title';
import Reservation from './Reservation';
import AddReservation from './AddReservation';
import Table from './Table';
import AddsTables from './AddsTables';
import Dish from './Dish';
import AddDish from './AddDish';
import UpdateMenuItem from './UpdateMenuItem';
import Order from './Order';
import AddOrder from './AddOrder';

class Main extends Component {   
    render(){      
        return( <div>  
                  <Title/> 
                  <Table/>
                  <AddsTables/>
                  <Reservation/>
                  <AddReservation/>
              
                  <Dish/>
                  <AddDish/>
                  <Order/>
                  <AddOrder/>
               
                </div>      
              )   
    }
}
export default Main;
