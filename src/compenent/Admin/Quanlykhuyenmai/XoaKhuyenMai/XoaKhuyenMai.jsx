import React from "react";
import "./XoaKhuyenMai.css";

function XoaKhuyenMai({ promo, onClose, onDelete }) {
  if (!promo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Xóa khuyến mãi</h3>
        <p>Bạn có chắc muốn xóa khuyến mãi <strong>{promo.tenKM}</strong>?</p>
        <div className="btn-group">
          <button
            className="btn-delete"
            onClick={() => {
              onDelete(promo);
              onClose();
            }}
          >
            Xóa
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default XoaKhuyenMai;
