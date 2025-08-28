package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.KhachHangInQuanLyReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangReponse;
import com.bot.bandienthoai.entity.KhachHang;

@Mapper(componentModel = "spring")
public interface KhachHangMapper {
	@Mapping(source = "maKhachHang", target = "maKhachHang")
	@Mapping(source = "hoTen", target = "hoTen")
	@Mapping(source = "email", target = "email")
	@Mapping(source = "soDienThoai", target = "soDienThoai")
	@Mapping(source = "ngaySinh", target = "ngaySinh")
	@Mapping(source = "gioiTinh", target = "gioiTinh")
	@Mapping(source = "diaChi", target = "diaChi")
	KhachHangReponse toKhachHangReponse(KhachHang khachHang);
	
	KhachHangInQuanLyReponse toKhachHangInQuanLyReponse(KhachHang khachHang);
	
//	default KhachHangInQuanLyReponse toKhachHangInQuanLyReponse(Object[] data) {
//		KhachHangInQuanLyReponse kh = new KhachHangInQuanLyReponse();
//		kh.setMaKhachHang(Integer.valueOf(data[0].toString()));
//		kh.setHoTen(null);
//	}
}
