package com.bot.bandienthoai.dto.reponse;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class DashBoardReponse {
	private Double doanhThu;
	private Integer donHang;
	private Integer khachHang;
	private Double doanhSo;
}
