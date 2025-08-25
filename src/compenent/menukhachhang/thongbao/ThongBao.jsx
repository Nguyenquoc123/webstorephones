import React from "react";
import "./ThongBao.css";

const thongBaoData = [
  {
    id: 1,
    title: "Hôm nay có khuyến mãi sập sàn giá cực sốc dành cho bạn  ",
    desc: "iPhone 17 Pro Max",
    avatar: "A",
  },
  {
    id: 2,
    title: "Giảm giá 50% cho phụ kiện khi mua 10 cái điện thoại",
    desc: "Iphone 18",
    avatar: "B",
  },
  {
    id: 3,
    title: "Flash Sale chỉ diễn ra trong 24h",
    desc: "Samsung Galaxy S25 Ultra",
    avatar: "C",
  },
  {
    id: 4,
    title: "Ưu đãi đặc biệt cho khách hàng VIP",
    desc: "Xiaomi 15 Pro",
    avatar: "D",
  },
  {
    id: 5,
    title: "Mua 1 tặng 1 - số lượng có hạn",
    desc: "Nokia 1280",
    avatar: "E",
  },
  {
    id: 6,
    title: "Quà tặng siêu khủng khi đặt hàng hôm nay",
    desc: "Iphone 11 promax",
    avatar: "F",
  },
  {
    id: 7,
    title: "Giảm 20% cho khách hàng mới",
    desc: "Realme GT7",
    avatar: "G",
  },
  {
    id: 8,
    title: "Nhận voucher 500K khi đăng ký tài khoản",
    desc: "Oppo Find X7",
    avatar: "I",
  },
  {
    id: 9,
    title: "Chương trình bốc thăm trúng thưởng cuối tuần",
    desc: "Samsung Pro 2025",
    avatar: "J",
  },
];

const ThongBao = () => {
  return (
    <div className="thongbao-container">
      <h2 className="thongbao-title">Thông Báo</h2>
      <div className="thongbao-list">
        {thongBaoData.map((item) => (
          <div key={item.id} className="thongbao-card">
            <div className="thongbao-avatar">{item.avatar}</div>
            <div className="thongbao-content">
              <h4 className="thongbao-text">{item.title}</h4>
              <p className="thongbao-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThongBao;
