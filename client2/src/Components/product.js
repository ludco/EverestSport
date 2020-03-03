import React from 'react';
import { Button } from 'reactstrap';

  


function Product({product}) {

    return (
       
      <div className="card">
        <img width="100%" src={product.photo} alt="product" />
        <div>
          <h2>{product.name}</h2>
          <h4>{product.priceTTC}€</h4>
          <p>{product.description}</p>
          <Button color="primary">Acheter</Button>
        </div>
      </div>

    );
}

export default Product;
