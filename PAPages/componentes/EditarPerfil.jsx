import React from "react"
import { MenuAdmin, MenuSecre, MenuUser } from "./Menu"
import { BackGraund } from "./BackGraund"

export const EditarPerfilAdmin = () => {
    return (
        <div className="EditarPerfil">
            <BackGraund />
            <MenuAdmin />
            <h1>Editar Perfil-</h1>
            <p>PROXIMAMENTE</p>
        </div>)
}
export const EditarPerfilUser = () => {
    return (
        <div className="EditarPerfil">
            <BackGraund />
            <MenuUser />
            <h1>Editar Perfil-</h1>
            <p>PROXIMAMENTE</p>
        </div>)
}
export const EditarPerfilSecre = () => {
    return (
        <div className="EditarPerfil">
            <BackGraund />
            <MenuSecre />
            <h1>Editar Perfil-</h1>
            <p>PROXIMAMENTE</p>
        </div>)
}