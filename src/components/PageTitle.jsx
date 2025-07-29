import React from 'react';

export default function PageTitle({ text, subtitle }) {
  return (
    <div className="page-title">
      <h1 className="page-title__main">{text}</h1>
      {subtitle && <p className="page-title__subtitle">{subtitle}</p>}
    </div>
  );
}