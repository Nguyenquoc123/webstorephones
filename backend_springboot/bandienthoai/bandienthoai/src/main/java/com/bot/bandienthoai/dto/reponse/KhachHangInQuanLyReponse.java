package com.bot.bandienthoai.dto.reponse;

import java.util.Date;

import lombok.Data;

@Data
public class KhachHangInQuanLyReponse {
	private Integer maKhachHang;
	private String hoTen;
	private String email;
	private String soDienThoai;
	private Date ngaySinh;
	private Integer gioiTinh;
	private String diaChi;
	private Integer trangThai;
	private String userName;
	private Date ngayDangKy;
}
