// EditModal.jsx
import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ data, setData, onClose }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({}); // lưu lỗi từng field

  // Cập nhật giá trị khi thay đổi input
  const handleChange = (index, fieldName, value) => {
    const newData = [...formData];
    newData[index].value = value;
    setFormData(newData);

    // Validate trực tiếp khi nhập
    validateField(fieldName, value);
  };

  // Hàm kiểm tra 1 field
  const validateField = (name, value) => {
    let error = "";

    if (name === "soDienThoai") {
      if (!/^\d{10,11}$/.test(value)) {
        error = "Số điện thoại phải gồm 10-11 chữ số.";
      }
    }

    if (name === "email") {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Email không hợp lệ.";
      }
    }

    if (name === "ngaySinh") {
      const today = new Date().toISOString().split("T")[0];
      if (value > today) {
        error = "Ngày sinh không được lớn hơn ngày hiện tại.";
      }
    }

    if (name === "hoTen") {
      if (!/^[\p{L}\s]+$/u.test(value)) {
        error = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Kiểm tra toàn bộ form khi xác nhận
  const handleConfirm = () => {
    let hasError = false;
    const newErrors = {};

    formData.forEach((item) => {
      if (item.editable) {
        validateField(item.name, item.value);
        if (errors[item.name]) {
          hasError = true;
          newErrors[item.name] = errors[item.name];
        }
      }
    });

    setErrors(newErrors);

    if (hasError) return; // Nếu có lỗi thì không lưu

    // Gọi setData (ở HoSoCaNhan sẽ cập nhật state info)
    formData.forEach((item) => {
      setData(item.name, item.value);
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Chỉnh sửa thông tin</h3>

        {formData.map((item, index) => (
          <div key={index} className="modal-group">
            <label>{item.label}</label>
            {item.editable ? (
              item.name === "gioiTinh" ? (
                <select
                  className="gioi-tinh-info"
                  value={item.value}
                  onChange={(e) =>
                    handleChange(index, item.name, e.target.value)
                  }
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : item.name === "ngaySinh" ? (
                <input
                  type="date"
                  lang="vi"
                  value={item.value}
                  max={new Date().toISOString().split("T")[0]} // chặn ngày tương lai
                  onChange={(e) =>
                    handleChange(index, item.name, e.target.value)
                  }
                />
              ) : (
                <input
                  type={item.name === "email" ? "email" : "text"}
                  value={item.value}
                  onChange={(e) =>
                    handleChange(index, item.name, e.target.value)
                  }
                />
              )
            ) : (
              <p className="ED-readonly-text">{item.value}</p>
            )}
            {/* Hiển thị lỗi */}
            {errors[item.name] && (
              <p className="error-text">{errors[item.name]}</p>
            )}
          </div>
        ))}

        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Hủy
          </button>
          <button onClick={handleConfirm} className="btn-confirm">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
