import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import '../../App.css';

export function EditAuthor(props) {
    const [authorData, setAuthorData] = useState({
        authorFirstName: '',
        authorLastName: '',
        nationality: ''
    });

    useEffect(() => {
        if (props.author) {
            setAuthorData({
                authorFirstName: props.author.authorFirstName,
                authorLastName: props.author.authorLastName,
                nationality: props.author.nationality
            });
        }
    }, [props.author]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/author/${props.author.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authorData)
        })
        .then(response => {
            if (response.ok) {
                console.log("Autor actualizado exitosamente");
                props.onSave(); // Cerrar el modal después de guardar
                props.onUpdate(authorData);
            } else {
                throw new Error('Error al actualizar autor');
            }
        })
        .catch(error => {
            console.error("Error al actualizar autor:", error);
        });
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
                    <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-secondary" raised rounded/>
                    <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-danger" raised rounded/>
                </div>
            </form>
        </div>
    );
}
