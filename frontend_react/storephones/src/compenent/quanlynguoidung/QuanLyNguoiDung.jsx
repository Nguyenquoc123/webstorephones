import React, { useState } from "react";
import "./QuanLyNguoiDung.css";
import MenuAdmin from "../menuadmin/MenuAdmin";
import search from "../../icons/icon-search.png";
import Xoa from "./xoa/Xoa";
import ThemTaiKhoan from "./themtaikhoan/ThemTaiKhoan";
import ChinhSua from "./chinhsua/ChinhSua";

const QuanLyNguoiDung = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Trần Đại Đức",
      phone: "0393340406",
      email: "daiducka123@gmail.com",
      status: "Hoạt động",
      createdDate: "15/1/2024",
      locked: false,
    },
    {
      id: 2,
      name: "Phạm Thị Dung",
      phone: "0934567890",
      email: "phamthidung@gmail.com",
      status: "Bị khóa",
      createdDate: "12/1/2024",
      locked: true,
    },
  ]);

  // --- State cho bộ lọc ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");

  // --- State cho checkbox ---
  const [selectedIds, setSelectedIds] = useState([]);

  // Mở modal xóa 1 user
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Xoá 1 user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Xoá nhiều user
  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selectedIds.includes(user.id)));
    setSelectedIds([]);
  };

  // Hủy xoá
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Khoá / mở khoá
  const handleToggleLock = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              locked: !user.locked,
              status: user.locked ? "Hoạt động" : "Bị khóa",
            }
          : user
      )
    );
  };

  // Thêm user
  const handleAddUser = (newUser) => {
    setUsers([
      ...users,
      { ...newUser, id: Date.now(), createdDate: "26/08/2025" },
    ]);
    setShowAddModal(false);
  };

  // Chỉnh sửa user
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // --- Checkbox ---
  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  // --- Bộ lọc ---
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "Tất cả trạng thái" || u.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Thống kê
  const tongTaiKhoan = users.length;
  const hoatDong = users.filter((u) => !u.locked).length;
  const biKhoa = users.filter((u) => u.locked).length;
  const moiHomNay = users.filter((u) => u.createdDate === "26/08/2025").length;

  return (
    <>
      <MenuAdmin />

      <div className="QLU-container">
        <div className="QLU-header">
          <div className="QLU-card">
            <span className="QLU-title">Tổng tài khoản</span>
            <strong className="QLU-value">{tongTaiKhoan}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Đang hoạt động</span>
            <strong className="QLU-value">{hoatDong}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Bị khoá</span>
            <strong className="QLU-value">{biKhoa}</strong>
          </div>
          <div className="QLU-card">
            <span className="QLU-title">Mới hôm nay</span>
            <strong className="QLU-value">{moiHomNay}</strong>
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
            <img className="icon-search" src={search} alt="" />
          </div>

          <label htmlFor="status">
            Trạng thái:{" "}
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Tất cả trạng thái</option>
              <option>Bị khóa</option>
              <option>Hoạt động</option>
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
                      selectedIds.length === filteredUsers.length
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleCheckbox(user.id)}
                    />
                  </td>
                  <td>
                    <div className="QLU-user-info">
                      <div className="QLU-avatar">{user.name.charAt(0)}</div>
                      <div>
                        <strong>{user.name}</strong>
                        <br />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`QLU-badge status ${
                        user.status === "Hoạt động" ? "active" : "blocked"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.createdDate}</td>
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
                      onClick={() => handleToggleLock(user.id)}
                      title={user.locked ? "Mở khóa" : "Khóa tài khoản"}
                    >
                      {user.locked ? "🔓" : "🔒"}
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
    </>
  );
};

export default QuanLyNguoiDung;
