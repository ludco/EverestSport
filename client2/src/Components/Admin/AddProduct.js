import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';




function AddProduct({increment}) {
    const  baseUrl = 'http://localhost:3000';

    const fileInput = React.createRef();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    
    
    const handleChangeName = (event) => {
        setProductName(event.target.value)
    }
    const handleChangePrice = (event) => {
        setProductPrice(event.target.value)
    }
    const handleChangeDesc = (event) => {
        setProductDesc(event.target.value)
    }
    const handleSubmit = (event) => {
        let newProduct ={
            name : productName,
            priceTTC : productPrice,
            description : productDesc,
        }

        // ADD A PRODUCT
        axios.post(`${baseUrl}/products`, newProduct).then(result=>{
          console.log(result.data);
          increment();
        })
        .catch(e=>console.log(e));
       
        event.preventDefault();
    }
    return (

        <div className="card">
            <form onSubmit={handleSubmit} className="addForm">
                    <label htmlFor="photo">Photo du produit : </label>
                        <p><input type="file" id="photo" ref={fileInput}></input></p>
                    <label htmlFor="name">Nom du produit : </label>
                        <h2><input type="text" id="name" value={productName} onChange={handleChangeName}></input></h2>
                    <label htmlFor="price">Prix du produit (€) : </label>
                        <h4><input type="number" min="0" step="any" value={productPrice} onChange={handleChangePrice}></input></h4>
                    <label htmlFor="desc">Description </label>
                        <p><textarea rows="4" id="desc" value={productDesc} onChange={handleChangeDesc}></textarea></p>
                    <Button color="primary" type="submit" className="addButton">Ajouter</Button>
               
            </form>
        </div>

    );
}

export default AddProduct;
