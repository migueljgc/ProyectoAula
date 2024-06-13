import { Link, useNavigate } from 'react-router-dom';
import './VerPQRS.css';
import { MenuSecre } from '../../../../../componentes/Menu';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export const GestionPQRS = () => {
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null); // Cambiado para que sea null en lugar de un array
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/request/get');
            setData(response.data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleRow = (row) => {
        setSelectedRow(row);
    };

    const handleResponderClick = () => {
        if (selectedRow) {
            // Actualizar la solicitud de PQRS seleccionada
            axios.get('http://localhost:8080/api/request/get', selectedRow)
                .then(response => {
                    console.log('Solicitud de PQRS actualizada:', response.data);
                    // Redirigir a la página de respuesta de PQRS
                    navigate('/ReplyPQRS', { state: { data: selectedRow } });
                })
                .catch(error => {
                    console.error('Error al actualizar la solicitud de PQRS:', error);
                    alert('Error al actualizar la solicitud de PQRS. Por favor, inténtalo de nuevo más tarde.');
                });
        } else {
            alert('Por favor seleccione una fila');
        }
    };

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Categoria',
            selector: row => row.category.nameCategory
        },
        {
            name: 'Descripcion',
            selector: row => row.description
        },
        {
            name: 'Fecha',
            selector: row => row.date
        },
        {
            name: 'Tipo de Solicitud',
            selector: row => row.requestType.nameRequestType
        },
        {
            name: 'Medio de Respuesta',
            selector: row => row.mediumAnswer

        },
        {
            name: 'Respuesta',
            selector: row => row.answer
        },
        {
            name: 'Estado',
            selector: row => row.requestState.nameRequestState
        },

    ];

    return (
        <div className='VerPQRS'>
            <BackGraund />
            <MenuSecre />
            <div className="gestion">
                <div className='cla'>
                    <DataTable
                        columns={columns}
                        data={data}
                        onRowClicked={handleRow}
                        fixedHeader
                        highlightOnHover
                    /> <br />
                    <button onClick={handleResponderClick} disabled={!selectedRow}>Responder</button>
                    <br />

                </div>
            </div>
        </div>
    );
};