package com.bot.bandienthoai.request;

import lombok.Data;

@Data
public class EditKhachHangRequest {
	private Integer maKhachHang;
	private String hoTen;
	private String soDienThoai;
	private String email;
	private boolean resetpassword;
}
