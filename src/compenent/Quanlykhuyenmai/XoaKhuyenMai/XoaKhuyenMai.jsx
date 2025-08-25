import React from "react";
import "./XoaKhuyenMai.css";

function XoaKhuyenMai({ promo, onClose, onDelete }) {

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Xóa khuyến mãi</h3>
        <p>Bạn có chắc muốn xóa khuyến mãi <strong>{promo?.tenKhuyenMai}</strong>?</p>
        <div className="btn-group">
          <button
            className="btn-delete"
            onClick={() => {
              onDelete(promo);
            }}
          >
            Xóa
          </button>
          <button className="btn-cancel" onClick={() => onClose(false)}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default XoaKhuyenMai;
