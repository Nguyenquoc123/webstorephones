import React from "react";

const CardThongKe = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <span className="icon">{icon}</span>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
};

export default CardThongKe;
