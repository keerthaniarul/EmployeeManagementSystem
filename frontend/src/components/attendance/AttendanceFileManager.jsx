// src/components/attendance/AttendanceFileManager.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import ConfirmDialog from '../common/ConfirmDialog';

const AttendanceFileManager = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadUploadedFiles();
  }, []);

  const loadUploadedFiles = () => {
    try {
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      setUploadedFiles(files);
    } catch (error) {
      console.error('Error loading uploaded files:', error);
      setUploadedFiles([]);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter and sort files
  const getFilteredAndSortedFiles = () => {
    let filtered = uploadedFiles.filter(file =>
      file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.uploadedBy && file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'uploadDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Handle file download (mock)
  const handleDownload = async (file) => {
    try {
      setLoading(true);
      
      // Mock download - in real implementation, this would download the actual file
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Downloading ${file.originalName}...`);
      
      // Create a mock download link
      const element = document.createElement('a');
      const textContent = `Attendance file: ${file.originalName}\nUploaded: ${file.uploadDate}\nRecords: ${file.recordsProcessed}`;
      const file_blob = new Blob([textContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file_blob);
      element.download = file.originalName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    } finally {
      setLoading(false);
    }
  };

  // Handle file deletion
  const handleDelete = (file) => {
    setDeleteConfirm(file);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setLoading(true);
      
      // Remove from localStorage
      const updatedFiles = uploadedFiles.filter(file => file.id !== deleteConfirm.id);
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      setUploadedFiles(updatedFiles);
      
      toast.success('File deleted successfully');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    } finally {
      setLoading(false);
    }
  };

  // Handle file reprocessing (mock)
  const handleReprocess = async (file) => {
    try {
      setLoading(true);
      
      // Mock reprocessing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update file status
      const updatedFiles = uploadedFiles.map(f => 
        f.id === file.id 
          ? { ...f, status: 'processed', processingNotes: 'File reprocessed successfully' }
          : f
      );
      
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      setUploadedFiles(updatedFiles);
      
      toast.success('File reprocessed successfully');
    } catch (error) {
      console.error('Error reprocessing file:', error);
      toast.error('Failed to reprocess file');
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = getFilteredAndSortedFiles();

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <div>
          <h2>Uploaded Attendance Files</h2>
          <p>Manage previously uploaded attendance files</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="file-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search files by name or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="uploadDate">Upload Date</option>
            <option value="originalName">File Name</option>
            <option value="recordsProcessed">Records Processed</option>
          </select>
          
          <button
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Files List */}
      {loading && filteredFiles.length === 0 ? (
        <div className="loading-container">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="no-files">
          <div className="no-files-icon">📁</div>
          <h3>No Files Found</h3>
          <p>
            {searchTerm 
              ? 'No files match your search criteria.' 
              : 'No attendance files have been uploaded yet.'
            }
          </p>
        </div>
      ) : (
        <div className="files-grid">
          {filteredFiles.map(file => (
            <div key={file.id} className="file-card">
              <div className="file-header">
                <div className="file-icon">
                  📊
                </div>
                <div className="file-actions">
                  <button
                    className="action-btn download-btn"
                    onClick={() => handleDownload(file)}
                    title="Download File"
                    disabled={loading}
                  >
                    ⬇️
                  </button>
                  <button
                    className="action-btn reprocess-btn"
                    onClick={() => handleReprocess(file)}
                    title="Reprocess File"
                    disabled={loading}
                  >
                    🔄
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(file)}
                    title="Delete File"
                    disabled={loading}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="file-info">
                <h3 className="file-name" title={file.originalName}>
                  {file.originalName}
                </h3>
                
                <div className="file-details">
                  <div className="detail-row">
                    <span className="label">Uploaded:</span>
                    <span className="value">{formatDate(file.uploadDate)}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Records:</span>
                    <span className="value">{file.recordsProcessed || 0}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Uploaded by:</span>
                    <span className="value">{file.uploadedBy || 'System'}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`status-badge ${file.status || 'processed'}`}>
                      {file.status === 'processed' ? '✅ Processed' : 
                       file.status === 'error' ? '❌ Error' : '⏳ Processing'}
                    </span>
                  </div>
                </div>

                {file.errorMessage && (
                  <div className="error-message">
                    <strong>Error:</strong> {file.errorMessage}
                  </div>
                )}

                {file.processingNotes && (
                  <div className="processing-notes">
                    <strong>Notes:</strong> {file.processingNotes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <ConfirmDialog
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={confirmDelete}
          loading={loading}
          title="Delete File"
          message={`Are you sure you want to delete "${deleteConfirm?.originalName}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />
      )}
    </div>
  );
};

export default AttendanceFileManager;