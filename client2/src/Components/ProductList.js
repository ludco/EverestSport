import React, { useContext } from 'react';
import { ProductContext } from '../Providers/ProductProvider';
import Product from './product';



function ProductList(props) {
  const ProductCtxt = useContext(ProductContext);
  console.log('products', ProductCtxt)
 

  return (
    <div className="contain">
      {ProductCtxt.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
