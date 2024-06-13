import React, { useEffect, useState } from 'react';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { MenuAdmin } from '../../../../../componentes/Menu';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Tipos.css'

export const TiposDependencia = () => {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        dependence: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dependence/get')
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
            dependence: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const dependenceResponse = await axios.post('http://localhost:8080/api/dependence/save', {
                nameDependence: formData.dependence
            });
            console.log('Respuesta al guardar dependencia:', dependenceResponse.data);
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
            selector: row => row.idDependence
        },
        {
            name: 'Dependencia',
            selector: row => row.nameDependence
        },

    ]

    return (
        <div>
            <BackGraund />
            <MenuAdmin />

            <h1>Tipo de Dependencia</h1>
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
                                <label htmlFor="dependence">Dependencia:</label><br />
                                <input
                                    type="text"
                                    id="dependence"
                                    name="dependence"
                                    value={formData.dependence}
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


