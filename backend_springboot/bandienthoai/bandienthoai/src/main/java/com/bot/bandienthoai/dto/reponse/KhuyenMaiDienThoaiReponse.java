package com.bot.bandienthoai.dto.reponse;

import lombok.Data;

@Data
public class KhuyenMaiDienThoaiReponse {
	private Integer maKhuyenMai;
	private String tenKhuyenMai;
	private String loaiKhuyenMai;
	private Double giaTriGiam;
}
