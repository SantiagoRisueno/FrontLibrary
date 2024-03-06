import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';

export function AddBook(props) {
    const [bookData, setBookData] = useState({
        name: '',
        publishingHouse: '',
        publicationDate: '',
        state: false,
        idAuthor: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Libro agregado exitosamente:", data);
                props.onSave();
            })
            .catch(error => {
                console.error("Error al agregar libro:", error);
            });
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <div className="add-book-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Editorial:</label>
                    <input
                        type="text"
                        name="publishingHouse"
                        value={bookData.publishingHouse}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha de Publicación:</label>
                    <input
                        type="datetime-local"
                        name="publicationDate"
                        value={bookData.publicationDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Préstamo:</label>
                    <div>
                        <ToggleButton
                            checked={bookData.state}
                            onChange={(e) => setBookData({ ...bookData, state: e.value })}
                            onLabel="Sí"
                            offLabel="No"
                        />
                    </div>
                </div>
                <div>
                    <label>ID del Autor:</label>
                    <input
                        type="number"
                        name="idAuthor"
                        value={bookData.idAuthor}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Button label="Guardar" icon="pi pi-save" onClick={handleSubmit} className="p-button-secondary" raised rounded />
                </div>
            </form>
        </div>
    );
}
