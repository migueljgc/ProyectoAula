import React, { useEffect, useState } from 'react';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { MenuAdmin } from '../../../../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './Tipos.css'

export const TiposIdentificacion = () => {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        identificationType: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/identification_type/get')
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
            identificationType: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const identificationTypeResponse = await axios.post('http://localhost:8080/api/identification_type/save', {
                nameIdentificationType: formData.identificationType
            });
            console.log('Respuesta al guardar dependencia:', identificationTypeResponse.data);
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
            selector: row => row.idIdentificationType
        },
        {
            name: 'Tipo de Identificacion',
            selector: row => row.nameIdentificationType

        },

    ]

    return (
        <div>
            <BackGraund />
            <MenuAdmin />
            <h1>Tipo de Identificacion</h1>
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
                                <label htmlFor="identificationType">Tipos de Identificacion: :</label><br />
                                <input
                                    type="text"
                                    id="identificationType"
                                    name="identificationType"
                                    value={formData.identificationType}
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



