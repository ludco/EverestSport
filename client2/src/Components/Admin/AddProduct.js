import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';




function AddProduct({ increment }) {
    const baseUrl = 'http://localhost:3000';

    const [fileInput, setFile] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');

    // Set file
    const onFileSelect = (event) => {
        setFile(event.target.files[0]);
    }
    // Set name
    const handleChangeName = (event) => {
        setProductName(event.target.value)
    }
    // Set price
    const handleChangePrice = (event) => {
        setProductPrice(event.target.value)
    }
    // Set description
    const handleChangeDesc = (event) => {
        setProductDesc(event.target.value)
    }

    // ADD A PRODUCT
    const addNewProduct = (newPhoto) => {
        const newProduct = {
            name: productName,
            priceTTC: productPrice,
            description: productDesc,
            photo: newPhoto
        }
        axios.post(`${baseUrl}/products`, newProduct).then(result => {
            increment();
        })
            .catch(e => console.log(e));
    }

    // UPLOAD FILE
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('photo', fileInput);
        axios.post(`${baseUrl}/upload`, formData).then(
            (res) => {
                let newPhoto = `http://localhost:3000/uploads/${res.data.data.name}`;
                addNewProduct(newPhoto);

            })
            .catch((e) => { console.log(e) })
    }

    
    return (

        <div className="card">
            <form onSubmit={handleSubmit} className="addForm">
                <label htmlFor="photo">Photo du produit : </label>
                <p><input type="file" id="photo" onChange={onFileSelect}></input></p>
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
