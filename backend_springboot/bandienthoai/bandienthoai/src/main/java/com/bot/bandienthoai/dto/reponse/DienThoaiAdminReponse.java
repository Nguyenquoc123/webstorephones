package com.bot.bandienthoai.dto.reponse;

import lombok.Data;

@Data
public class DienThoaiAdminReponse {
	private Integer maDienThoai;
	private String tenDienThoai;
	private String hangSanXuat;
	private String image;
	private String moTa;
	private Integer maDanhMuc;
	private String tenDanhMuc;
}
