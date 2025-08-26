import React from "react";
import "./Khoa.css";

const Khoa = ({ user, onClose, onConfirm }) => {
  if (!user) return null;

  const handleToggle = () => {
    onConfirm(user.id);
    onClose();
  };

  return (
    <div className="khoa-modal-overlay">
      <div className="khoa-modal">
        <div className="khoa-modal-header">
          <h2>{user.locked ? "Mở khóa tài khoản" : "Khóa tài khoản"}</h2>
          <button className="khoa-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="khoa-modal-content">
          <div className="khoa-warning">
            <span className="khoa-warning-icon">🔒</span>
            <p>
              Bạn có chắc chắn muốn{" "}
              <strong>{user.locked ? "mở khóa" : "khóa"}</strong> tài khoản này
              không?
            </p>
          </div>

          <div className="khoa-user-info">
            <div className="khoa-info-row">
              <span className="khoa-info-label">Tên người dùng:</span>
              <span className="khoa-info-value">{user.name}</span>
            </div>
            <div className="khoa-info-row">
              <span className="khoa-info-label">Email:</span>
              <span className="khoa-info-value">{user.email}</span>
            </div>
            <div className="khoa-info-row">
              <span className="khoa-info-label">Trạng thái hiện tại:</span>
              <span className="khoa-info-value">{user.status}</span>
            </div>
          </div>
        </div>

        <div className="khoa-modal-actions">
          <button className="khoa-cancel-btn" onClick={onClose}>
            Hủy
          </button>
          <button className="khoa-confirm-btn" onClick={handleToggle}>
            {user.locked ? "Mở khóa" : "Khóa ngay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Khoa;
