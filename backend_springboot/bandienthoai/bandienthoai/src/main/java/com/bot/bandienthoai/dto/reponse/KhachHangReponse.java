package com.bot.bandienthoai.dto.reponse;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhachHangReponse {
	private Integer maKhachHang;
	private String hoTen;
	private String email;
	private String soDienThoai;
	private Date ngaySinh;
	private Integer gioiTinh;
	private String diaChi;
}
