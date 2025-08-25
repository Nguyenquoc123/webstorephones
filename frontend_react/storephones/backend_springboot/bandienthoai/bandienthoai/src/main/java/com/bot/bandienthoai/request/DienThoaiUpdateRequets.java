package com.bot.bandienthoai.request;

import lombok.Data;

@Data
public class DienThoaiUpdateRequets {
	private Integer maDienThoai;
	private String tenDienThoai;
	private String hangSanXuat;
	private Integer maDanhMuc;
	private String moTa;
}
