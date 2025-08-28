import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-col">
          <h3 className="footer-title">Phone Stores</h3>
          <p>
            Phone Stores chuyên cung cấp điện thoại chính hãng với giá tốt nhất.
            Cam kết chất lượng và dịch vụ hậu mãi tận tâm.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="footer-col">
          <h4 className="footer-subtitle">Liên kết nhanh</h4>
          <ul>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Sản phẩm</a>
            </li>
            <li>
              <a href="#">Khuyến mãi</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-col">
          <h4 className="footer-subtitle">Liên hệ</h4>
          <p>📍 77 Nguyễn Huệ, Thành Phố Huế</p>
          <p>📞 0393340406</p>
          <p>📧 22T1020575@husc.edu.vn</p>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="footer-col">
          <h4 className="footer-subtitle">Kết nối với chúng tôi</h4>
          <div className="footer-social">
            <a href="#"></a>
            <a href="#">Instagram</a>
            <a href="#">Zalo</a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        &copy; 2025 Phone Stores. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
