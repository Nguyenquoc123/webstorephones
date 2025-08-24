package com.bot.bandienthoai.request;

import java.util.List;

import lombok.Data;

@Data
public class DonHangAddRequest {
	private String hoTen;
	private String email;
	private String soDienThoai;
	private String diaChi;
	private String ghiChu;
	private Integer phuongThucThanhToan;
	private Integer trangThaiThanhToan;
	private Double tongTien;
	private List<SanPhamMuaRequest> dsMua;
}
