package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;

@Data
public class ItemInDonHang {
	private Integer maPhienBan;
	private String tenDienThoai;
	private List<ImagesReponse> image;
}
