import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';

export function EditBook(props) {
    const [bookData, setBookData] = useState({
        name: '',
        publishingHouse: '',
        publicationDate: '',
        state: false,
        idAuthor: ''
    });

    useEffect(() => {
        if (props.book) {
            setBookData({
                name: props.book.name,
                publishingHouse: props.book.publishingHouse,
                publicationDate: props.book.publicationDate,
                state: props.book.state,
                idAuthor: props.book.author.id.toString()
            });
        }
    }, [props.book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggleChange = (e) => {
        setBookData(prevState => ({
            ...prevState,
            state: e.value // Usar e.value en lugar de !prevState.state
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/book/${props.book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Libro actualizado exitosamente");
                    props.onSave();
                } else {
                    throw new Error('Error al actualizar libro');
                }
            })
            .catch(error => {
                console.error("Error al actualizar libro:", error);
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
                    <ToggleButton
                        checked={bookData.state}
                        onChange={handleToggleChange}
                        onLabel="Sí"
                        offLabel="No"
                        value={bookData.state} // Agregar value prop
                    />
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
                    <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-secondary" raised rounded />
                    <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-danger" raised rounded />
                </div>
            </form>
        </div>
    );
}
