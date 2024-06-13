import React, { useEffect, useState } from 'react'
import { BackGraund } from "../../../../../componentes/BackGraund";
import { MenuAdmin } from "../../../../../componentes/Menu";
import axios from 'axios';
import DataTable from 'react-data-table-component';

export  const VerUsuarios = () => {
    const [data, setData] = useState([]);
    
    const fetchData = async () =>{
        try{
            const response = await axios.get('http://localhost:8080/api/user/get')
            setData(response.data);
            console.log(response.data)
        } catch (error){
            console.error('Error en la data: ', error);
        }

    };
    useEffect( () => {
        fetchData();
    }, []);
    const columns=[
        {
            name: 'Usuario',
            selector: row => row.user
        },
        {
            name: 'Contraseña',
            selector: row => row.password
        },
        {
            name: 'Estdo de Usuario',
            selector: row => row.stateUser
        },
        {
            name: 'Dependence',
            selector: row => row.dependence.nameDependence
        },
    ]
return(
    <div className="VerUsuarios">
        <BackGraund />
        <MenuAdmin/>
        <DataTable
        
        columns={columns}
        data={data}
        
        />
        
    </div>
)
}