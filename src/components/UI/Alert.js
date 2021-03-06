import React from 'react';

function Alert({ title, text, type, children }) {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'info':
        return 'bg-cyan-100 border-cyan-500 text-cyan-700';
      default:
        return '';
    }
  };

  return (
    <div className={`${getAlertClass()} border-l-4  p-4 my-4`} role="alert">
      <p className="font-bold">{title}</p>
      {!children && <small>{text}</small>}
      {children}
    </div>
  );
}

export default Alert;
