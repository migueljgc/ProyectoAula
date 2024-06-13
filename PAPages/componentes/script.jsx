import { useEffect, useState } from 'react';
import './script.css'



export const Script = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('username'));
  }, []);
  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}

        </div>
        <div className="abajo"><a href="/EditarPerfilAdmin">
          <i className="fa fa-plus"></i>Editar usuario</a>
          <a href="/Login">
            <i className="fa fa-sign-out"></i>Salir</a>
        </div>
      </div>

    </div>


  );
};
export const ScriptUser = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('username'));
  }, []);
  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">{user && <p>Bienvenido, {user}!</p>}</div>
        <div className="abajo"><a href="/EditarPerfilUser">
          <i className="fa fa-plus"></i>Editar usuario</a>
          <a href="/Login" >
            <i className="fa fa-sign-out"></i>Salir</a>
        </div>
      </div>

    </div>


  );
};
export const ScriptSecre = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('username'));
  }, []);
  return (


    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">{user && <p>Bienvenido, {user}!</p>}</div>
        <div className="abajo"><a href="/EditarPerfilSecre">
          <i className="fa fa-plus"></i>Editar usuario</a>
          <a href="/Login" >
            <i className="fa fa-sign-out"></i>Salir</a>

        </div>
      </div>

    </div>


  );
};

