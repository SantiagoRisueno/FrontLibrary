import React, { useState } from 'react';
import { Button } from 'primereact/button';

export function AddLoan(props) {
    const [loanData, setLoanData] = useState({
        loanDate: '',
        returnDate: '',
        idBook: '',
        idStudent: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/loan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loanData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Préstamo agregado exitosamente:", data);
                props.onSave();
            })
            .catch(error => {
                console.error("Error al agregar préstamo:", error);
            });
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <div className="add-author-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fecha de Préstamo:</label>
                    <input
                        type="date"
                        name="loanDate"
                        value={loanData.loanDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha de Devolución:</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={loanData.returnDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>ID del Libro:</label>
                    <input
                        type="number"
                        name="idBook"
                        value={loanData.idBook}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>ID del Estudiante:</label>
                    <input
                        type="number"
                        name="idStudent"
                        value={loanData.idStudent}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-group">
                    <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-secondary" style={{ textAlign: 'center',marginLef:'50px', marginBottom: '20px' }} raised rounded/>
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={handleCancel} style={{ textAlign: 'center', marginBottom: '20px' }} raised rounded/>
                </div>
            </form>
        </div>
    );
}
