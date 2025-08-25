// EditModal.jsx
import React, { useState } from "react";
import "./EditModal.css";


const EditModal = ({ data, setData, onClose }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (index, value) => {
        const newData = [...formData];
        newData[index].value = value;
        setFormData(newData);
    };

    const handleConfirm = () => {
        setData(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Chỉnh sửa thông tin</h3>

                {data.map((item, index) => (
                    <div key={index} className="modal-group">
                        <label>{item.label}</label>
                        {item.editable ? (
                            item.name === 'gioiTinh' ? (
                                <select className="gioi-tinh-info" value={item.value} name="" id="" onChange={(e) => setData(item.name, e.target.value)}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            ) :
                                item.name === 'ngaySinh' ?
                                    (
                                        <input
                                            type="date" lang="vi"
                                            value={item.value}
                                            onChange={(e) => setData(item.name, e.target.value)}
                                        />
                                    )
                                    : (
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => setData(item.name, e.target.value)}
                                        />
                                    )


                        ) : (
                            <p className="ED-readonly-text">{item.value}</p>
                        )}
                    </div>
                ))}

                <div className="modal-actions">
                    <button onClick={onClose} className="btn-cancel">Hủy</button>
                    <button onClick={handleConfirm} className="btn-confirm">Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
