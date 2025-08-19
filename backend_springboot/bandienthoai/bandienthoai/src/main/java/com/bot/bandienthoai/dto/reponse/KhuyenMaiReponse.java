package com.bot.bandienthoai.dto.reponse;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class KhuyenMaiReponse {
	private Integer maKhuyenMai;
	private String tenKhuyenMai;
	private String loaiKhuyenMai;
	private Double giaTriGiam;
	private Date ngayBatDau;
	private Date ngayKetThuc;
	private List<DienThoaiUseKhuyenMaiReponse> dsDienThoai;
	
}
