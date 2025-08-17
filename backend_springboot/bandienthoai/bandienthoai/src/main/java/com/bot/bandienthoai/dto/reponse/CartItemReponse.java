package com.bot.bandienthoai.dto.reponse;

import java.util.List;

import lombok.Data;
@Data
public class CartItemReponse {
	private Integer maPhienBan;
    private String tenDienThoai;
    private List<ImagesReponse> image;
    private Integer soLuong;
    private Double giaBan;      
    private String moTa;
    private String rom;
    private String ram;
    private String mauSac;
    private Double thanhTien;
}
