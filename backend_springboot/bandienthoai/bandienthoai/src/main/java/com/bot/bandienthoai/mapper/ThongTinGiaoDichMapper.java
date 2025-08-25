package com.bot.bandienthoai.mapper;

import java.time.LocalDate;
import java.util.Date;

import org.mapstruct.Mapper;

import com.bot.bandienthoai.dto.reponse.ThongTinGiaoDichReponse;

@Mapper(componentModel = "spring")
public interface ThongTinGiaoDichMapper {
	default ThongTinGiaoDichReponse toThongTinGiaoDichReponse(Object[] kq) {
		ThongTinGiaoDichReponse tmp = new ThongTinGiaoDichReponse();
		System.out.println("Không chạy");
		if(kq[0] != null)
			tmp.setTongTien(Double.valueOf(kq[0].toString()));
		else
			tmp.setTongTien(0.0);
		System.out.println("Không chạy");
		if(kq[1] != null)
			tmp.setSoDonHang(Integer.valueOf(kq[1].toString()));
		else
			tmp.setSoDonHang(0);
		System.out.println("Không chạy");
		if(kq[2] != null)
			tmp.setNgayDatHangGanNhat((Date)kq[2]);
		else
			tmp.setNgayDatHangGanNhat(null);
		System.out.println("Không chạy");
		return tmp;
		
	}
}
