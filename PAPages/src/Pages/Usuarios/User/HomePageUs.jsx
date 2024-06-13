import React from 'react';
import { BackGraund } from '../../../../componentes/BackGraund';
import { MenuUser } from '../../../../componentes/Menu';

export const HomePageUs = () =>{
    const user=localStorage.getItem('username');
    console.log(user)
    return (
        <div className="crearUsuario">
            <BackGraund />
            <MenuUser />
            <div className="fr">
            {user && <p>Bienvenido, {user}!</p>}
            </div>
        </div>
    )
}