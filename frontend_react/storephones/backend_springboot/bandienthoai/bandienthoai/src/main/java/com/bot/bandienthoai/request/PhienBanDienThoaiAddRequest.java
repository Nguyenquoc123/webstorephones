package com.bot.bandienthoai.request;

import lombok.Data;

@Data
public class PhienBanDienThoaiAddRequest {
	private Integer maDienThoai;
	private String rom;
	private String ram;
	private Integer soLuong;
	private Double donGia;
	private Integer camera;
	private Double manHinh;
	private Integer pin;
	private String mauSac;
	private String moTa;
}
