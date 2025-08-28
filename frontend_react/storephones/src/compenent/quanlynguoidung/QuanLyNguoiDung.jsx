import React, { useEffect, useState } from "react";
import "./QuanLyNguoiDung.css";
import MenuAdmin from "../menuadmin/MenuAdmin";
import search from "../../icons/icon-search.png";
import Xoa from "./xoa/Xoa";
import ThemTaiKhoan from "./themtaikhoan/ThemTaiKhoan";
import ChinhSua from "./chinhsua/ChinhSua";
import {
  fetchEditKhachHang,
  fetchGetDSKhachHang,
  fetchGetThongKeTK,
  fetchKhoaMoKhachHan,
  fetchKhoaMoKhachHang,
  fetchTimKiemKhachHang,
  fetchXoa1TaiKhoan,
  fetchXoaNhieuTaiKhoan,
} from "../../api/khachhang";
import { fetchSigup } from "../../api/authApi";
import Popup from "../popup/Popup";

const QuanLyNguoiDung = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [users, setUsers] = useState([]);

  // --- State cho bộ lọc ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // --- State cho checkbox ---
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadDSKhachHang();
    loadThongKe();
  }, []);

  useEffect(() => {
    loadDSKhachHang();
  }, [statusFilter]);

  const loadDSKhachHang = async () => {
    const response = await fetchGetDSKhachHang(statusFilter);
    if (response.code === 200) {
      setUsers(response.result);
      console.log(response.result);
    }
  };

  const clickSearch = async () => {
    console.log("Giá trị tìm kiếm ", searchTerm);
    const response = await fetchTimKiemKhachHang(searchTerm);
    if (response.code === 200) {
      setUsers(response.result);
    }
    console.log(response);
  };

  // Mở modal xóa 1 user
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Xoá 1 user
  const handleDeleteUser = async () => {
    const response = await fetchXoa1TaiKhoan(selectedUser.maKhachHang);
    if (response.code === 200) {
      loadDSKhachHang();
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Xoá nhiều user
  const handleDeleteSelected = async () => {
    const response = await fetchXoaNhieuTaiKhoan(selectedIds);
    if (response.code === 200) {
      loadDSKhachHang();
    }
    setSelectedIds([]);
  };

  // Hủy xoá
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Khoá / mở khoá
  const handleToggleLock = async (userId) => {
    const response = await fetchKhoaMoKhachHang(userId);
    if (response.code === 200) {
      loadDSKhachHang();
    }
  };

  // Thêm user
  const handleAddUser = async (newUser) => {
    const response = await fetchSigup(newUser);
    if (response.code === 200) {
      setShowAddModal(false);
      loadDSKhachHang();
    } else if (response.code === 10) {
      setShowPopup({ show: true, type: false, message: "Username đã tồn tại" });
    } else if (response.code === 11) {
      setShowPopup({
        show: true,
        type: false,
        message: "Số điện thoại đã tồn tại",
      });
    } else if (response.code === 12) {
      setShowPopup({ show: true, type: false, message: "Email đã tồn tại" });
    }
  };

  // Chỉnh sửa user
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleEditUser = async (updatedUser) => {
    const response = await fetchEditKhachHang(updatedUser);
    if (response.code === 200) {
      loadDSKhachHang();
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  // --- Checkbox ---
  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(users.map((u) => u.maKhachHang));
    } else {
      setSelectedIds([]);
    }
  };

  // --- Bộ lọc ---
  const filteredUsers = (value) => {
    console.log(value);
    setStatusFilter(value);
    // loadDSKhachHang(value)
  };
  const [dashboard, setDashBoard] = useState({
    tongTaiKhoan: 0,
    hoatDong: 0,
    biKhoa: 0,
    moiDangKy: 0,
  });

  const loadThongKe = async () => {
    const response = await fetchGetThongKeTK();
    if (response.code === 200) {
      setDashBoard(response.result);
      console.log(response);
    }
  };

  // Thống kê

  return (
    <>
      <MenuAdmin />

      <div className="QLU-container">
        <div className="QLU-header">
          <div className="QLU-card">
            <span className="QLU-title">Tổng tài khoản</span>
            <strong className="QLU-value">{dashboard.tongTaiKhoan}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Đang hoạt động</span>
            <strong className="QLU-value">{dashboard.hoatDong}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Bị khoá</span>
            <strong className="QLU-value">{dashboard.biKhoa}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Mới hôm nay</span>
            <strong className="QLU-value">{dashboard.moiDangKy}</strong>
          </div>
        </div>

        <div className="QLU-active">
          <div className="search-box" role="Search">
            <input
              className="search"
              type="search"
              placeholder="Tìm kiếm tài khoản"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              className="icon-search"
              src={search}
              alt=""
              onClick={clickSearch}
            />
          </div>

          <label htmlFor="status">
            Trạng thái:{" "}
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => filteredUsers(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value={0}>Bị khóa</option>
              <option value={1}>Hoạt động</option>
            </select>
          </label>

          <button className="QLU-btn" onClick={() => setShowAddModal(true)}>
            Thêm tài khoản
          </button>

          {selectedIds.length > 0 && (
            <button className="QLU-btn danger" onClick={handleDeleteSelected}>
              Xoá đã chọn ({selectedIds.length})
            </button>
          )}
        </div>

        <div className="QLU-table-container">
          <table className="QLU-user-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === users.length
                    }
                  />
                </th>
                <th>NGƯỜI DÙNG</th>
                <th>EMAIL</th>
                <th>TRẠNG THÁI</th>
                <th>NGÀY TẠO</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.maKhachHang}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.maKhachHang)}
                      onChange={() => toggleCheckbox(user.maKhachHang)}
                    />
                  </td>
                  <td>
                    <div className="QLU-user-info">
                      <div className="QLU-avatar">{user?.hoTen.charAt(0)}</div>
                      <div>
                        <strong>{user.hoTen}</strong>
                        <br />
                        <span>{user.soDienThoai}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`QLU-badge status ${
                        user.trangThai === 1 ? "active" : "blocked"
                      }`}
                    >
                      {user.trangThai === 1 ? "Hoạt đông" : "Bị khóa"}
                    </span>
                  </td>
                  <td>{user.ngayDangKy}</td>
                  <td>
                    <span
                      className="QLU-action edit"
                      onClick={() => handleOpenEdit(user)}
                      title="Chỉnh sửa"
                    >
                      ✏️
                    </span>
                    <span
                      className="QLU-action lock"
                      onClick={() => handleToggleLock(user.maKhachHang)}
                      title={user.locked ? "Mở khóa" : "Khóa tài khoản"}
                    >
                      {user.trangThai == 1 ? "🔓" : "🔒"}
                    </span>
                    <span
                      className="QLU-action delete"
                      onClick={() => handleOpenDelete(user)}
                      title="Xóa tài khoản"
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <ThemTaiKhoan
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
        />
      )}

      {showEditModal && (
        <ChinhSua
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditUser}
        />
      )}

      {showDeleteModal && (
        <Xoa
          user={selectedUser}
          onClose={handleCancelDelete}
          onConfirm={handleDeleteUser}
        />
      )}

      {showPopup.show && (
        <Popup
          type={showPopup.type}
          message={showPopup.message}
          onclose={() => setShowPopup({ ...showPopup, show: false })}
        />
      )}
    </>
  );
};

export default QuanLyNguoiDung;
