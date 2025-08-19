import React from "react";
import "./QuanLyNguoiDung.css";
import search from "../../icons/icon-search.png";
const QuanLyNguoiDung = () => {
  return (
    <div className="QLU-container">
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
          <span className="QLU-title">bị khoá</span>
          <strong className="QLU-value">2</strong>
        </div>
        <div className="QLU-card">
          <span className="QLU-title">Mới hôm nay</span>
          <strong className="QLU-value">5</strong>
        </div>
      </div>
      <div className="QLU-active">
        <div className="search-box">
          <input
            className="search"
            type="search"
            placeholder="tìm kiếm tài khoản"
          />
          <img className="icon-search" src={search} alt="" />
        </div>
        <label htmlFor="status">
          Trạng thái:{" "}
          <select id="status">
            <option>tất cả trạng thái</option>
            <option>bị khoá</option>
            <option>hoạt động</option>
          </select>
        </label>

        <button className="QLU-btn">Thêm tài khoản</button>
      </div>
      <div class="QLU-table-container">
        <table class="QLU-user-table">
          <thead>
            <tr>
              <th>
                <input type="QLU-checkbox" />
              </th>
              <th>NGƯỜI DÙNG</th>
              <th>EMAIL</th>
              <th>TRẠNG THÁI</th>
              <th>NGÀY TẠO</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="QLU-checkbox" placeholder="" />
              </td>
              <td>
                <div class="QLU-user-info">
                  <div class="QLU-avatar">Đ</div>
                  <div>
                    <strong>Trần Đại Đức</strong>
                    <br />
                    <span>0393340406</span>
                  </div>
                </div>
              </td>
              <td>daiducka123@gmail.com</td>

              <td>
                <span class="QLU-badge status active">Hoạt động</span>
              </td>
              <td>15/1/2024</td>
              <td>
                <span class="QLU-action edit">✏️</span>
                <span class="QLU-action lock">🔒</span>
                <span class="QLU-action delete">🗑️</span>
              </td>
            </tr>
            <tr>
              <td>
                <input type="QLU-checkbox" />
              </td>
              <td>
                <div class="QLU-user-info">
                  <div class="QLU-avatar">P</div>
                  <div>
                    <strong>Phạm Thị Dung</strong>
                    <br />
                    <span>0934567890</span>
                  </div>
                </div>
              </td>
              <td>phamthidung@gmail.com</td>

              <td>
                <span class="QLU-badge status blocked">Bị khóa</span>
              </td>
              <td>12/1/2024</td>
              <td>
                <span class="QLU-action edit">✏️</span>
                <span class="QLU-action lock">🔒</span>
                <span class="QLU-action delete">🗑️</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="QLU-pagination">
        <button className="btn-ct">Trước</button>
        <button className="btn-active">1</button>
        <button className="btn-active">2</button>
        <button className="btn-active">3</button>
        <button className="btn-ct">Sau</button>
      </div>
    </div>
  );
};

export default QuanLyNguoiDung;
