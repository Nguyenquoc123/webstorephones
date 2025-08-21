import "../menukhachhang/MenuKhachHang.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../logout/Logout";
function MenuKhachHang({ search }) {
  const navigate = useNavigate();
  const [showMenuByIcon, setShowMenuByIcon] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [clickedLogout, setClickedLogout] = useState(false);
  const [searchValue, setSearchValue] = useState(search ?? "");
  const clickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("soluongaddnew")
    navigate("/");
  };
  const clickCancel = () => {
    setClickedLogout(false);
    setShowLogout(false);
  };
  const handleSearch = () => {
    console.log("Từ khóa tìm kiếm ", searchValue)
    navigate("/home", { state: { searchValue: searchValue } });
  };
  // setup lại từ khóa tìm kiếm
  useEffect(() => {
    console.log("==========?????????????")
    setSearchValue(search || '')
  }, [search])
  return (
    <div className="container">
      <div className="menu">
        <div className="menu-left">
          <img
            onClick={() => setShowMenuByIcon(showMenuByIcon ? false : true)}
            id="icon-menu"
            src="/images/icon-menu.png"
          />
          <p
            id="KH-logo"
            onClick={() => navigate("/home", { state: { reset: Date.now() } })}
          >
            Phone Stores
          </p>
        </div>
        <div className="menu-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <img
            id="icon-search"
            src="/images/icon-search.png"
            onClick={handleSearch}
          />
        </div>
        <div className="menu-right">
          <img id="icon-thongbao" src="/images/icon-notifications.png" />
          <img
            id="icon-cart"
            src="/images/icon-cart.png"
            onClick={() => navigate("/home/giohang")}
          />
          {localStorage.getItem('soluongaddnew') && <span className="so-luong-add-new">{localStorage.getItem('soluongaddnew') > 9? '9+': localStorage.getItem('soluongaddnew')}</span>}
          <div className="img-logout">
            <img
              id="image-logout"
              src="/images/user-logout.png"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
              onClick={() => setShowLogout(showLogout ? false : true)}
            />
          </div>
        </div>
      </div>
      <div
        className="btn-logout"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
        style={{ display: showLogout ? "block" : "none" }}
      >
        <button id="btn-logout-child" onClick={() => setClickedLogout(true)}>
          logout
        </button>

      </div>
      <div
        style={{ display: showMenuByIcon ? "block" : "none" }}
        className="nav-menu"
      >
        <p onClick={() => navigate("/home/HoSoCaNhan")}>Hồ sơ cá nhân</p>

      </div>

      <Logout
        show={clickedLogout}
        clickCancel={clickCancel}
        clickActive={clickLogout}
      />
    </div>
  );
}

export default MenuKhachHang;
