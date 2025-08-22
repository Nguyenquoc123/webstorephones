package com.bot.bandienthoai.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.ItemInDonHang;
import com.bot.bandienthoai.entity.ChiTietDonHang;

@Mapper(componentModel = "spring", uses = ImagesMapper.class)
public interface ItemInDonHangMapper {

	@Mapping(source = "phienBanDienThoai.maPhienBan", target = "maPhienBan")
	@Mapping(source = "phienBanDienThoai.dienThoai.tenDienThoai", target = "tenDienThoai")
	@Mapping(source = "phienBanDienThoai.images", target = "image")
	@Mapping(source = "phienBanDienThoai.rom", target = "rom")
	@Mapping(source = "phienBanDienThoai.ram", target = "ram")
	@Mapping(source = "phienBanDienThoai.mauSac", target = "mauSac")
	@Mapping(source = "soLuong", target = "soLuong")
	@Mapping(source = "giaBan", target = "giaBan")
	ItemInDonHang toItemInDonHang(ChiTietDonHang chiTietDonHang);
	
	List<ItemInDonHang> toItemInDonHangDTOList(List<ChiTietDonHang> chiTietDonHang);
}
