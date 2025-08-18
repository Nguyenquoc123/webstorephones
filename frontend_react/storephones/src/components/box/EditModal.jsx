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

                {formData.map((item, index) => (
                    <div key={index} className="modal-group">
                        <label>{item.label}</label>
                        {item.editable ? (
                            <input
                                type="text"
                                value={item.value}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
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
