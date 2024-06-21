import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FloatingMessage.css';

const FloatingMessage = ({ message, type, duration = 9000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`floating-message ${type}`}>
      {message}
    </div>
  );
};

FloatingMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
  duration: PropTypes.number
};

export default FloatingMessage;