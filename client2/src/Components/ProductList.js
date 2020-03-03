import React, { useContext } from 'react';
import { ProductContext } from '../Providers/ProductProvider';
import Product from './product';
import AddProduct from './AddProduct'


function ProductList(props) {
  const ProductCtxt = useContext(ProductContext);
  console.log('products', ProductCtxt)
 

  return (
    <div className="contain">
      <AddProduct inc= {ProductCtxt.inc}/>
      {ProductCtxt.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
