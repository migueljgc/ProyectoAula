import React, { useState } from 'react';
import { BackGraund } from '../../../../componentes/BackGraund';
import { MenuAdmin } from '../../../../componentes/Menu';

export const HomePageAd = () =>{
    const user=localStorage.getItem('username');
    console.log(user)
    return (
        <div className="crearUsuario">
            <BackGraund />
            <MenuAdmin />
            <div className="fr">
            {user && <p>Bienvenido, {user}!</p>}

            </div>
        </div>
    )
}