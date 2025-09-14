import React from 'react';

const AnnouncementCard = ({ announcement }) => {
  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'announcement':
        return '📢';
      default:
        return '📋';
    }
  };

  return (
    <div className={`announcement-card ${announcement.type}`}>
      <div className="announcement-header">
        <div className="announcement-icon">
          {getAnnouncementIcon(announcement.type)}
        </div>
        <div className="announcement-meta">
          <h3 className="announcement-title">{announcement.title}</h3>
          <span className="announcement-date">{announcement.date}</span>
        </div>
      </div>
      <div className="announcement-content">
        <p>{announcement.content}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;