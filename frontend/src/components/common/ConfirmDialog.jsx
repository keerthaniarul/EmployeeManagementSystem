// src/components/common/ConfirmDialog.jsx
import React from 'react';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      default:
        return 'btn-primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirm-dialog">
        <div className="confirm-message">
          <p>{message}</p>
        </div>
        
        <div className="confirm-actions">
          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          
          <button
            className={`${getButtonClass()}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;