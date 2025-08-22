package com.bot.bandienthoai.dto.reponse;

import java.util.Date;

import lombok.Data;

@Data
public class ThongTinGiaoDichReponse {
	private Double tongTien;
	private Integer soDonHang;
	private Date ngayDatHangGanNhat;
}
