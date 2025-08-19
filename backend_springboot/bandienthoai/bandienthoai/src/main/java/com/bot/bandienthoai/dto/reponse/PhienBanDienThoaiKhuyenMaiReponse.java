package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;

@Data
public class PhienBanDienThoaiKhuyenMaiReponse {
	private Integer maDienThoai;
	private String tenDienThoai;
	private List<ImagesReponse> image;
	private String hangSanXuat;
	private Integer maPhienBan;
	private String rom;
	private String ram;
	private Integer soLuong;
	private Double giaBan;
	private Integer camera;
	private Double manHinh;
	private Integer pin;
	private String moTa;
	private String mauSac;
	private KhuyenMaiDienThoaiReponse km;
}
