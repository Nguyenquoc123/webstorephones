import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; 
import "./Box.css";
import EditModal from "./EditModal";
const Box = ({ title, data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div className="profile-container">
      <div className="profile-title">
        <FaEdit style={{ cursor: "pointer" }} onClick={handleOpen} className="profile-icon" />
        {title}
      </div>
      {data.map((item, index) => (
        <div className="profile-group" key={index}>
          <div className="profile-label">{item.label}</div>
          <input className="profile-input" value={item.value} readOnly />
        </div>
      ))}
      {isOpen && (
        <EditModal
          data={data}
          setData={setData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>

  );
}
export default Box;