package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;

@Data
public class ItemInDonHang {
	private Integer maPhienBan;
	private String tenDienThoai;
	private String rom;
	private String ram;
	private Double giaBan;
	private Integer soLuong;
	private String mauSac;
	private List<ImagesReponse> image;
}
