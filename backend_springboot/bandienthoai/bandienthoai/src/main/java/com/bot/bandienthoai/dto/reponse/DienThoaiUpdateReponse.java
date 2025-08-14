package com.bot.bandienthoai.dto.reponse;

import lombok.Data;

@Data
public class DienThoaiUpdateReponse {
	private Integer maDienThoai;
	private String tenDienThoai;
	private String image;
	private String hangSanXuat;
	private Integer maDanhMuc;
	private String tenDanhMuc;
	private String moTa;
}
