import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Login } from '../src/Pages/Login and Register/Login';
import { EditarPerfil, EditarPerfilSecre } from '../componentes/EditarPerfil';
import { CrearUsuario } from '../src/Pages/Usuarios/Admin/CrearUsuario/CrearUsuario';
import { Recovery } from '../componentes/Recovery';
import { Registro } from '../src/Pages/Login and Register/Registro';
import { VerPQRS } from '../src/Pages/Usuarios/User/VerPQRS/VerPQRS';
import { CrearPQRS } from '../src/Pages/Usuarios/User/CrearPQRS/CrearPQRS';
import { PageNotFound } from '../componentes/PageNotFound';
import { GestionPQRS } from '../src/Pages/Usuarios/ResponsibleDependency/GestionPQRS/GestionPQRS';
import { HomePageSe } from '../src/Pages/Usuarios/ResponsibleDependency/HomePageSe';
import { HomePageUs } from '../src/Pages/Usuarios/User/HomePageUs';
import { HomePageAd } from '../src/Pages/Usuarios/Admin/HomePageAd';
import { TiposCategoria } from '../src/Pages/Usuarios/Admin/Edicion tipos/TiposCategoria';
import { TiposDependencia } from '../src/Pages/Usuarios/Admin/Edicion tipos/TiposDependencia';
import { TiposIdentificacion } from '../src/Pages/Usuarios/Admin/Edicion tipos/TiposIdentificacion';
import { TiposSolicitud } from '../src/Pages/Usuarios/Admin/Edicion tipos/TiposSolicitud';
import { EdicionUsuario } from '../src/Pages/Usuarios/Admin/EdicionUsuario/EdicionUsuario';
import { VerUsuarios } from '../src/Pages/Usuarios/Admin/VerUsuarios/VerUsuarios';
import { ReplyPQRS } from '../src/Pages/Usuarios/ResponsibleDependency/ReplyPQRS/ReplyPQRS';
import {ProtectedRoute} from '../router/ProtectedRoute';
import { CrearSecre } from '../src/Pages/Usuarios/Admin/CrearUsuario/CrearSecre';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Recuperacion" element={<Recovery />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Rutas protegidas */}
        <Route path="/HomePagesAdmin" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<HomePageAd />} />
        } />
        <Route path="/HomePagesUser" element={
          <ProtectedRoute allowedRoles={['USER']} element={<HomePageUs />} />
        } />
        <Route path="/HomePagesSecre" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={<HomePageSe />} />
        } />

        <Route path="/EdicionUsuario" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<EdicionUsuario />} />
        } />
        <Route path="/EditarPerfilAdmin" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<EditarPerfil />} />
        } />
        <Route path="/EditarPerfilUser" element={
          <ProtectedRoute allowedRoles={['USER']} element={<EditarPerfil />} />
        } />
        <Route path="/EditarPerfilSecre" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={<EditarPerfilSecre />} />
        } />
        <Route path="/CrearUsuario" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<CrearUsuario />} />
        } />
        <Route path="/CrearSecre" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<CrearSecre />} />
        } />
        <Route path="/VerUsuarios" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<VerUsuarios />} />
        } />
        <Route path="/VerPQRS" element={
          <ProtectedRoute allowedRoles={['USER']} element={<VerPQRS />} />
        } />
        <Route path="/CrearPQRS" element={
          <ProtectedRoute allowedRoles={['USER']} element={<CrearPQRS />} />
        } />
        <Route path="/GestionPQRS" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={<GestionPQRS />} />
        } />
        <Route path="/ReplyPQRS" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={<ReplyPQRS />} />
        } />
        <Route path="/TiposCategoria" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<TiposCategoria />} />
        } />
        <Route path="/TiposDependencia" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<TiposDependencia />} />
        } />
        <Route path="/TiposIdentificacion" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<TiposIdentificacion />} />
        } />
        <Route path="/TiposSolicitud" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<TiposSolicitud />} />
        } />
      </Route>
    </Routes>
  );
};