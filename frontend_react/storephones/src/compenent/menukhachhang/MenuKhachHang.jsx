import '../menukhachhang/MenuKhachHang.css'


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logout from "../logout/Logout";
function MenuKhachHang() {
    const navigate = useNavigate();
    const [showMenuByIcon, setShowMenuByIcon] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [clickedLogout, setClickedLogout] = useState(false)

    const clickLogout = () =>{
        localStorage.removeItem("token");
        navigate('/')
    }
    const clickCancel = () =>{
        setClickedLogout(false)
        setShowLogout(false)
    }
    return (
        <div className="container">
            <div className="menu">
                <div className="menu-left">
                    <img onClick={() => setShowMenuByIcon(showMenuByIcon ? false : true)} id="icon-menu" src="/images/icon-menu.png" />
                    <p id="logo">Phone Stores</p>
                </div>
                <div className="menu-center">
                    <input type="text" placeholder="Tìm kiếm" />
                    <img id="icon-search" src="/images/icon-search.png" />
                </div>
                <div className="menu-right">
                    <img id="icon-thongbao" src="/images/icon-notifications.png" />
                    <img id="icon-cart" src="/images/icon-cart.png" />
                    <div className="img-logout">
                        <img id="image-logout" src="/images/icon-cart.png" onClick={() => setShowLogout(showLogout?false:true)} />
                    </div>
                </div>

            </div>
            <div className="btn-logout" style={{display: showLogout?"block":"none"}}>
                <button id="btn-logout-child" onClick={() => setClickedLogout(true)}>Logout</button>
            </div>
            <div style={{ display: showMenuByIcon ? 'block' : 'none' }} className="nav-menu">
                <p onClick={() => navigate('/adddanhmuc')}>Quản lý danh mục</p>
                <p onClick={() => navigate('/adddienthoai')}>Quản lý điện thoại</p>
            </div>

            <Logout show={clickedLogout}
                clickCancel={clickCancel}
                clickActive={clickLogout}
            />
        </div>

    )
}

export default MenuKhachHang;