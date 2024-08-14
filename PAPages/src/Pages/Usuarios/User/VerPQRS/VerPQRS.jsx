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
            setData(response.data);
            const usuario=localStorage.getItem('users');
            console.log(usuario)
            if (usuario) {
                const filteredData = response.data.filter(item => item.user && item.user.user === usuario); // Filtrar los datos por el usuario
                filteredData.forEach(item => {
                    item.date = new Date(item.date).toDateString();
                    
                });
                setData(filteredData);
                console.log("filteredData  ", filteredData)
            } else {
                setData([]);
            }
            console.log(response.data);
            console.log("esta es la data ",data);
        } catch (error){
            console.error('Error en la data: ', error);
        }

    };
useEffect( () => {
    document.title = "Ver PQRS"
        fetchData();
    }, []);
    const columns=[
        {
            name: 'Dependencia',
            selector: row => row.dependence.nameDependence
        },
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
        {
            name: 'archivo',
            cell: row => row.archivo ? (
                    <a href={`http://localhost:8080/api/request/download/${encodeURIComponent(row.archivo.split('\\').pop())}`} download target="_blank" rel="noopener noreferrer">
                        <button>Descargar</button>
                    </a>
                
            ) : (
                <div>
                    <span>No disponible</span>
                </div>
            )
        }
        
        
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



