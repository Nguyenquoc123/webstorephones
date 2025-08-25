import React, { useState } from "react";
import '../menuadmin/MenuAdmin.css'
import { useNavigate } from "react-router-dom";
import Logout from "../logout/Logout";
function MenuAdmin() {
    const navigate = useNavigate();
    const [showMenuByIcon, setShowMenuByIcon] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [clickedLogout, setClickedLogout] = useState(false)
    const clickCancel = () => {
        setClickedLogout(false)
        setShowLogout(false)
    }
    const clickLogout = () =>{
        localStorage.removeItem("token");
        navigate('/')
    }
    return (
        <div className="container">
            <div className="menu">
                <div className="menu-left">
                    <img onClick={() => setShowMenuByIcon(showMenuByIcon ? false : true)} id="icon-menu" src="/images/icon-menu.png" />
                    <p id="logo">Phone Stores</p>
                </div>
                <div className="logout-admin">
                    <img src="/images/user-logout.png" alt="" onClick={() => setShowLogout(showLogout ? false : true)} />
                </div>

            </div>


            <div style={{ display: showMenuByIcon ? 'block' : 'none' }} className="nav-menu">
                <p onClick={() => { navigate('/danhmuc') }}>Quản lý danh mục</p>
                <p onClick={() => navigate('/dienthoai')}>Quản lý điện thoại</p>
                <p onClick={() => navigate('/donhang')}>Quản lý đơn hàng</p>
                <p onClick={() => navigate('/khuyenmai')}>Quản lý khuyến mãi</p>
                <p onClick={() => navigate('/thongkedoanhso')}>Thống kê doanh số</p>
                <p onClick={() => navigate('/thongkekhachhang')}>Thống kê khách hàng</p>
            </div>

            <div className="btn-logout-admin" style={{ display: showLogout ? "block" : "none" }}>
                <button id="btn-logout-admin-child" onClick={() => setClickedLogout(true)}>Logout</button>
            </div>

            <Logout show={clickedLogout}
                clickCancel={clickCancel}
                clickActive={clickLogout}
            />
        </div>
    )
}

export default MenuAdmin;