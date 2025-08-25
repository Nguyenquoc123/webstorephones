package com.bot.bandienthoai.request;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class KhuyenMaiUpdateRequest {
	private Integer maKhuyenMai;
	private String tenKhuyenMai;
	private String loaiKhuyenMai;
	private Double giaTriGiam;
	private Date ngayBatDau;
	private Date ngayKetThuc;
	private List<Integer> dsDienThoaiNew;
	private List<Integer> dsDienThoaiDelete;
}
