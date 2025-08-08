import React, { useState } from "react";
import '../menuadmin/MenuAdmin.css'
import { useNavigate } from "react-router-dom";
function MenuAdmin() {
    const navigate = useNavigate();
     const [showMenuByIcon, setShowMenuByIcon] = useState(false);
    return (
        <div className="container">
            <div className="menu">
                <div className="menu-left">
                    <img onClick={() => setShowMenuByIcon(showMenuByIcon ? false : true)} id="icon-menu" src="/images/icon-menu.png" />
                    <p id="logo">Phone Stores</p>
                </div>
            </div>

            <div style={{ display: showMenuByIcon ? 'block' : 'none' }} className="nav-menu">
                <p onClick={() => { navigate('/danhmuc')}}>Quản lý danh mục</p>
                <p onClick={() => navigate('/dienthoai')}>Quản lý điện thoại</p>
            </div>
        </div>
    )
}

export default MenuAdmin;