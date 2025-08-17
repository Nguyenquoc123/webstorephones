package com.bot.bandienthoai.dto.reponse;

import java.sql.Date;

import lombok.Data;

@Data
public class DonHangReponse {
	private String maDonHang;
	private Date ngayTao;
	private Integer trangThai;
	private Integer maKhachHang;
	private String hoTen;
	private String soDienThoai;
	private String email;
	private String diaChi;
	private Double tongTien;
	private Integer phuongThucThanhToan;
	private Boolean trangThaiThanhToan;
}
