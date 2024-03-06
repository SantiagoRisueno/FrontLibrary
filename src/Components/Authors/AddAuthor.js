import React, { useState } from 'react';
import { Button } from 'primereact/button';

import '../../App.css';


export function AddAuthor(props) {
    const [authorData, setAuthorData] = useState({
        firstName: '',
        lastName: '',
        nationality: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData({
            ...authorData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/author", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authorData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Autor agregado exitosamente:", data);
                props.onSave();
            })
            .catch(error => {
                console.error("Error al agregar autor:", error);
            });
    };

    const handleSave = () => {
        console.log('Guardar autor');
    };

    const handleCancel = () => {
        props.onCancel();
    };
    return (
        <div className="add-author-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="authorFirstName"
                        value={authorData.authorFirstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="authorLastName"
                        value={authorData.authorLastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Nacionalidad:</label>
                    <input
                        type="text"
                        name="nationality"
                        value={authorData.nationality}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Button label="Guardar" icon="pi pi-save" onClick={handleSave} className="p-button-secondary" raised rounded />
                </div>

            </form>
        </div>
    );
}