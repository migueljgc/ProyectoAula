import React, { useEffect, useState } from 'react';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { MenuAdmin } from '../../../../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './Tipos.css'

export const TiposSolicitud = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        requestType: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/request_type/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            requestType: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const requestTypeResponse = await axios.post('http://localhost:8080/api/request_type/save', {
                nameRequestType: formData.requestType
            });
            console.log('Respuesta al guardar dependencia:', requestTypeResponse.data);
            console.log('dependencia registrada correctamente');
            alert('dependencia registrada correctamente')
            handleReset();
            fetchData();

        }
        catch (error) {
            console.error('Error al guardar información:', error);
        }

    }


    const columns = [
        {
            name: 'Id',
            selector: row => row.idRequestType
        },
        {
            name: 'Tipos de Solicitud',
            selector: row => row.nameRequestType
        },

    ]

    return (
        <div>
            <BackGraund />
            <MenuAdmin />
            <h1>Tipo de Solicitud</h1>
            <div className="Ap">
                <div className="tabla">
                    <DataTable
                        columns={columns}
                        data={data}

                    />
                </div>
                <div className="formulario">
                <div className="Form">
                        <form onSubmit={handleSubmit}>
                            <div className="input-box1">
                                <label htmlFor="requestType">Tipos de Solicitudes: :</label><br />
                                <input
                                    type="text"
                                    id="requestType"
                                    name="requestType"
                                    value={formData.requestType}
                                    onChange={handleChange} required
                                />
                            </div> <br />
                            <div className="btnRegistrar">
                                <button type="submit">Registrar</button>
                            </div><br />
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
}


