package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;

@Data
public class ChiTietDonHangReponse {
	private String maDonHang;
	private String hoTen;
	private String email;
	private String soDienThoai;
	private String diaChiNhanHang;
	private String ghiChu;
	private Integer trangThai;
	private List<ItemInDonHang> ds;
}
