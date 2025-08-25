package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;

import com.bot.bandienthoai.dto.reponse.ThongKeTaiKhoanReponse;

@Mapper(componentModel = "spring")
public interface ThongKeMapper {
	default ThongKeTaiKhoanReponse toThongKeTaiKhoanReponse(Object[] data) {
		ThongKeTaiKhoanReponse tk = new ThongKeTaiKhoanReponse();
		tk.setTongTaiKhoan(Integer.valueOf(data[0].toString()));
		tk.setHoatDong(Integer.valueOf(data[1].toString()));
		tk.setBiKhoa(Integer.valueOf(data[2].toString()));
		tk.setMoiDangKy(Integer.valueOf(data[3].toString()));
		
		return tk;
	}
}
