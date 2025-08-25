import React, { useState } from "react";
import "./QuanLyNguoiDung.css";
import MenuAdmin from "../menuadmin/MenuAdmin";
import search from "../../icons/icon-search.png";
import Xoa from "./xoa/Xoa";

const QuanLyNguoiDung = () => {
  // State để điều khiển popup xoá
  const [showXoa, setShowXoa] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Hàm khi bấm vào icon xoá
  const handleDeleteClick = (user) => {
    setSelectedUser(user); // lưu user cần xoá
    setShowXoa(true); // mở popup xoá
  };

  // Hàm xác nhận xoá
  const handleConfirmDelete = () => {
    console.log("Đã xoá:", selectedUser);
    // Ở đây bạn có thể gọi API xoá user
    setShowXoa(false);
    setSelectedUser(null);
  };

  // Hàm huỷ xoá
  const handleCancelDelete = () => {
    setShowXoa(false);
    setSelectedUser(null);
  };

  return (
    <>
      {/* MenuAdmin luôn ở trên */}
      <MenuAdmin />

      <div className="QLU-container">
        {/* Thống kê tổng quan */}
        <div className="QLU-header">
          <div className="QLU-card">
            <span className="QLU-title">Tổng tài khoảng</span>
            <strong className="QLU-value">35</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Đang hoạt động</span>
            <strong className="QLU-value">14</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Bị khoá</span>
            <strong className="QLU-value">2</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Mới hôm nay</span>
            <strong className="QLU-value">5</strong>
          </div>
        </div>

        {/* Thanh tìm kiếm + bộ lọc */}
        <div className="QLU-active">
          <div className="search-box" role="Search">
            <input
              className="search"
              type="search"
              placeholder="Tìm kiếm tài khoản"
            />
            <img className="icon-search" src={search} alt="" />
          </div>
          <label htmlFor="status">
            Trạng thái:{" "}
            <select id="status">
              <option>Tất cả trạng thái</option>
              <option>Bị khoá</option>
              <option>Hoạt động</option>
            </select>
          </label>

          <button className="QLU-btn">Thêm tài khoản</button>
        </div>

        {/* Bảng danh sách user */}
        <div className="QLU-table-container">
          <table className="QLU-user-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>NGƯỜI DÙNG</th>
                <th>EMAIL</th>
                <th>TRẠNG THÁI</th>
                <th>NGÀY TẠO</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {/* User 1 */}
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="QLU-user-info">
                    <div className="QLU-avatar">Đ</div>
                    <div>
                      <strong>Trần Đại Đức</strong>
                      <br />
                      <span>0393340406</span>
                    </div>
                  </div>
                </td>
                <td>daiducka123@gmail.com</td>
                <td>
                  <span className="QLU-badge status active">Hoạt động</span>
                </td>
                <td>15/1/2024</td>
                <td>
                  <span className="QLU-action edit">✏️</span>
                  <span className="QLU-action lock">🔒</span>
                  {/* 🗑️ Khi bấm vào thì mở popup xoá */}
                  <span
                    className="QLU-action delete"
                    onClick={() =>
                      handleDeleteClick({
                        name: "Trần Đại Đức",
                        email: "daiducka123@gmail.com",
                      })
                    }
                  >
                    🗑️
                  </span>
                </td>
              </tr>

              {/* User 2 */}
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="QLU-user-info">
                    <div className="QLU-avatar">P</div>
                    <div>
                      <strong>Phạm Thị Dung</strong>
                      <br />
                      <span>0934567890</span>
                    </div>
                  </div>
                </td>
                <td>phamthidung@gmail.com</td>
                <td>
                  <span className="QLU-badge status blocked">Bị khóa</span>
                </td>
                <td>12/1/2024</td>
                <td>
                  <span className="QLU-action edit">✏️</span>
                  <span className="QLU-action lock">🔒</span>
                  <span
                    className="QLU-action delete"
                    onClick={() =>
                      handleDeleteClick({
                        name: "Phạm Thị Dung",
                        email: "phamthidung@gmail.com",
                      })
                    }
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="QLU-pagination">
          <button className="btn-ct">Trước</button>
          <button className="btn-active">1</button>
          <button className="btn-active">2</button>
          <button className="btn-active">3</button>
          <button className="btn-ct">Sau</button>
        </div>
      </div>

      {/* Popup Xoá */}
      <Xoa
        show={showXoa}
        clickCancel={handleCancelDelete}
        clickActive={handleConfirmDelete}
        message={`Bạn có chắc muốn xoá người dùng "${selectedUser?.name}" không?`}
      />
    </>
  );
};

export default QuanLyNguoiDung;
