import React from "react";
import "./Xoa.css";

const Xoa = ({ user, onClose, onConfirm }) => {
  const handleDelete = () => {
    onConfirm(user.id);
    onClose();
  };

  if (!user) return null;

  return (
    <div className="xoa-modal-overlay">
      <div className="xoa-modal">
        <div className="xoa-modal-header">
          <h2>Xóa người dùng</h2>
          <button className="xoa-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="xoa-modal-content">
          <div className="xoa-warning">
            <span className="xoa-warning-icon">⚠️</span>
            <p>
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể
              hoàn tác.
            </p>
          </div>

          <div className="xoa-user-info">
            <div className="xoa-info-row">
              <span className="xoa-info-label">Tên người dùng:</span>
              <span className="xoa-info-value">{user.name}</span>
            </div>
            <div className="xoa-info-row">
              <span className="xoa-info-label">Email:</span>
              <span className="xoa-info-value">{user.email}</span>
            </div>
            <div className="xoa-info-row">
              <span className="xoa-info-label">Trạng thái:</span>
              <span className="xoa-info-value">{user.status}</span>
            </div>
            <div className="xoa-info-row">
              <span className="xoa-info-label">Ngày tạo:</span>
              <span className="xoa-info-value">{user.createdDate}</span>
            </div>
          </div>
        </div>

        <div className="xoa-modal-actions">
          <button className="xoa-cancel-btn" onClick={onClose}>
            Hủy
          </button>
          <button className="xoa-confirm-btn" onClick={handleDelete}>
            Xóa người dùng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Xoa;
