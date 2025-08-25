package com.bot.bandienthoai.dto.reponse;

import java.util.Date;

import lombok.Data;

@Data
public class DanhGiaReponse {
	private Integer maDanhGia;
	private Integer soSao;
	private String noiDung;
	private String hoTen;
	private Date ngayDanhGia;
	private Integer maKhachHang;
	private Integer maPhienBan;
	
	
}
