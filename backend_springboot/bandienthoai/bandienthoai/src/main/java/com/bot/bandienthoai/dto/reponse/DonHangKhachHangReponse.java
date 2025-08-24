package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;

@Data
public class DonHangKhachHangReponse {
	private String maDonHang;
	private Double tongTien;
	private Integer trangThai;
	private List<ItemInDonHang> ds;
}
