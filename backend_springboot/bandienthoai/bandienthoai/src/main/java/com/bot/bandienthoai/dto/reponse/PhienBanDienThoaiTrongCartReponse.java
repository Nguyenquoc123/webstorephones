package com.bot.bandienthoai.dto.reponse;

import lombok.Data;

@Data
public class PhienBanDienThoaiTrongCartReponse {
	private Integer maDienThoai;
	private String tenDienThoai;
	private Integer maPhienBan;
	private String image;
	private String moTa;
	private Double giaBan;
	private Integer soLuongConLai;
	private Integer soLuong;
	private Double tongTien;
}
