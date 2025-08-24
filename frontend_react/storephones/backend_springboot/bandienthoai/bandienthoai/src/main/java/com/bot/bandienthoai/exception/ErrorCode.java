package com.bot.bandienthoai.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
	UserNameNotFound(1, "UserName không tìm thấy"),
	UserName_Not_Valid(2, "UserName phải dài hơn 6 kí tự"),
	UserName_Not_Null(3, "UserName không được trống."),
	Password_Not_Null(4, "Password không được trống."),
	Password_Not_Valid(5, "Password Phải dài hơn 8 kí tự."),
	HoTen_Not_Null(6, "Họ Tên không được trống."),
	NgaySinh_Not_Null(7, "Vui lòng chọn ngày sinh"),
	SDT_Not_Null(8, "Nhập số điện thoại."),
	SDT_Not_Valid(9, "Số điện thoại không đúng định dạng."),
	UserName_Exists(10, "UserName đã tồn tại."),
	SDT_Exists(11, "Số điện thoại đã tồn tại."),
	Email_Exists(12, "Email đã tồn tại."),
	Create_Failed(13, "Create không thành công."),
	Password_InValid(14, "Password không đúng."),
	KhachHang_Not_Found(15, "Không tìm thấy khách hang."),
	Unauthorized(16, "Token không  hợp lệ."),
	Password_Old_Not_Valid(17, "Mật khẩu không đúng."),
	Error_System(18, "Lỗi hệ thống."),
	Danh_Muc_Not_Found(19, "Không tìm thấy danh mục."),
	Dien_Thoai_Not_Found(20, "Không tìm thấy điện thoại."),
	PhienBanDienThoai_Not_Found(21, "Không tìm thấy điện thoại."),
	TenDanhMuc_Not_Null(22, "Tên danh mục không được null."),
	MoTa_Not_Null(23, "Mô Tả không được null."),
	TenDienThoai_Not_Null(24, "Tên điện thoại không đươc trống"),
	HangSanXuat_Not_Null(25, "Hãng sản xuất không được trống"),
	DanhMuc_Not_Null(26, "Chọn danh mục."),
	Image_Not_Valid(27, "Ảnh không hợp lệ."),
	CartItem_Not_Found(28, "Không tìm thấy sản phẩm"),
	Admin_Not_Declare(-99, "Không thể khởi tạo admin"),
	SoLuong_Khong_Du(29, "Số lượng còn lại không đủ"),
	CartItem_In_Cart(30, "Đã có trong giỏ hàng"),
	Dia_Chi_Not_Null(31, "Vui lòng nhập địa chỉ"),
	DonHang_Not_Found(32, "Không tìm thấy đơn hàng")
	;
	int code;
	String message;
}
