import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';
import { BackGraund } from './BackGraund';

export const PageNotFound = () => {
  return (
    <div className="error-page-container">
      <BackGraund />
      <div className="error-message">
        <h1 className="error-number">404</h1>
        <p className="error-text">La página que buscaba no existe.</p>
        <p className="error-text">Es posible que haya escrito mal la dirección o que la página se haya movido.</p>
      </div>
      <Link className="home-button" to="/">Ir a la página de inicio</Link>
    </div>
  );
};

