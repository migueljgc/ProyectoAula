import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './VerPQRS.css';
import { MenuUser } from '../../../../../componentes/Menu';
import { BackGraund } from '../../../../../componentes/BackGraund';
import DataTable from 'react-data-table-component';


export const VerPQRS = () => {
    const [data, setData] = useState([]);
    
    const fetchData = async () =>{
        try{
            const response = await axios.get('http://localhost:8080/api/request/get')
            const usuario=localStorage.getItem('username');
            if (usuario) {
                const filteredData = response.data.filter(item => item.user && item.user.user === usuario); // Filtrar los datos por el usuario
                setData(filteredData);
            } else {
                setData([]);
            }
            console.log(response.data);
        } catch (error){
            console.error('Error en la data: ', error);
        }

    };
useEffect( () => {
        fetchData();
    }, []);
    const columns=[
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
        
        
    ]



    return (
        <div className='VerPQRS'>
            <BackGraund />
            <MenuUser />
            <div className="gestion">
                <div className='cla'>
                    <DataTable
                        columns={columns}
                        data={data}
                        fixedHeader

                    />
                </div>
            </div>
        </div>

    );
};



