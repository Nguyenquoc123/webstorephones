package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.entity.DonHang;

@Mapper(componentModel = "spring", uses = ItemInDonHangMapper.class)
public interface DonHangMapper {
	@Mapping(source = "khachHang.maKhachHang", target = "maKhachHang")
	@Mapping(source = "khachHang.hoTen", target = "hoTen")
	@Mapping(source = "khachHang.email", target = "email")
	@Mapping(source = "khachHang.soDienThoai", target = "soDienThoai")
	@Mapping(source = "diaChiGiaoHang", target = "diaChi")
	@Mapping(source = "tongTien", target = "tongTien")
	DonHangReponse toDonHangReponse(DonHang donHang);
	
	
	@Mapping(source = "maDonHang", target = "maDonHang")
	@Mapping(source = "khachHang.hoTen", target = "hoTen")
	@Mapping(source = "khachHang.email", target = "email")
	@Mapping(source = "khachHang.soDienThoai", target = "soDienThoai")
	@Mapping(source = "diaChiGiaoHang", target = "diaChiNhanHang")
	@Mapping(source = "ghiChu", target = "ghiChu")
	@Mapping(source = "trangThai", target = "trangThai")
	@Mapping(source = "chiTietDonHang", target = "ds")
	@Mapping(source = "trangThaiThanhToan", target = "trangThaiThanhToan")
	ChiTietDonHangReponse toChiTietDonHangReponse(DonHang donHang);
	
	@Mapping(source = "maDonHang", target = "maDonHang")
	@Mapping(source = "trangThai", target = "trangThai")
	@Mapping(source = "tongTien", target = "tongTien")
	@Mapping(source = "chiTietDonHang", target = "ds")
	DonHangKhachHangReponse toDonHangKhachHangReponse(DonHang donHang);
}
