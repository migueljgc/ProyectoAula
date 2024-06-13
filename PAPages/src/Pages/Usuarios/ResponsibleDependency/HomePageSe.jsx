import React from 'react';
import { BackGraund } from '../../../../componentes/BackGraund';
import { MenuSecre } from '../../../../componentes/Menu';

export const HomePageSe = () =>{
    const user=localStorage.getItem('username');
    console.log(user)
    return (
        <div className="crearUsuario">
            <BackGraund />
            <MenuSecre />
            <div className="fr">
            {user && <p>Bienvenido, {user}!</p>}
            </div>
        </div>
    )
}