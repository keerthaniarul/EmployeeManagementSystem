import React from 'react';

const StatsCard = ({ title, value, icon, color, trend }) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-card-header">
        <div className="stats-icon">{icon}</div>
        <div className="stats-value">{value}</div>
      </div>
      <div className="stats-card-body">
        <h3 className="stats-title">{title}</h3>
        {trend && (
          <p className="stats-trend">{trend}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;