import React, { useContext } from 'react';
import { ProductContext } from './../../Providers/ProductProvider';
import AdminProduct from './AdminProduct';
import AddProduct from './AddProduct';


function AdminProductList() {
  const {products, changeProducts} = useContext(ProductContext);
  console.log('products', products);
 
    const onChangeProducts = ()=>{
        changeProducts();
    }

  return (
    <div className="contain">
      <AddProduct increment={onChangeProducts}/>
      {products.map(product => (
        <AdminProduct key={product.id} product={product} decrement={onChangeProducts} />
      ))}
    </div>
  );
}

export default AdminProductList;
