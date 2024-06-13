import React, { useEffect, useState } from 'react';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { MenuAdmin } from '../../../../../componentes/Menu';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Tipos.css'

export const TiposCategoria = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        dependence: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const fetchDependence = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dependence/get')
            setData1(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        fetchData();
        fetchDependence();
    }, []);

    const handleReset = () => {
        setFormData({
            category: '',
            dependence: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const selectedDependencia = data1.find(type => type.idDependence === parseInt(formData.dependence));
            const categoryResponse = await axios.post('http://localhost:8080/api/category/save', {
                nameCategory: formData.category,
                dependence: { idDependence: selectedDependencia ? selectedDependencia.idDependence : null },
            });
            console.log('Respuesta al guardar Categoria:', categoryResponse.data);
            console.log('Categoria registrada correctamente');
            alert('Categoria registrada correctamente')
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
            selector: row => row.idCategory
        },
        {
            name: 'Categoria',
            selector: row => row.nameCategory
        },
        {
            name: 'Dependencia',
            selector: row => row.dependence ? row.dependence.nameDependence : 'N/A'

        },


    ]

    return (
        <div className='TiposCategoria'>
            <BackGraund />
            <MenuAdmin />
            <h1>Tipo de Categoria</h1>
            <div className="Ap">
                <div className="tabla">
                    <DataTable
                        columns={columns}
                        data={data}
                        fixedHeader
                    />

                </div>
                <div className="formulario">
                    <div className="Form">
                        <form onSubmit={handleSubmit}>
                            <div className="input-box1">
                                <label htmlFor="category">Categoria:</label><br />
                                <input
                                    type="category"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange} required
                                />
                            </div> <br />
                            <div className="input-box1">
                                <label htmlFor="dependence">Dependencia:</label><br />
                                <select
                                    type="text"
                                    id="dependence"
                                    name="dependence"
                                    value={formData.dependence}
                                    onChange={handleChange} required
                                >
                                    <option key="" value="">Seleccione el tipo</option>
                                    {data1.map((type) => (
                                        <option key={type.idDependence} value={type.idDependence}>
                                            {type.nameDependence}
                                        </option>
                                    ))}
                                </select>
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


