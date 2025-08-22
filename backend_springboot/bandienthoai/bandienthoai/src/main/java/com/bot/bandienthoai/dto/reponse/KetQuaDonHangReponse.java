package com.bot.bandienthoai.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaDonHangReponse {
	private String maDonHang;
	private Double tongTien;
	private String queryUrl;
}
