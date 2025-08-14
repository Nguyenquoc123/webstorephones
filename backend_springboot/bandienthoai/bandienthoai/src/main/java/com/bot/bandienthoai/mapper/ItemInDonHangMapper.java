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
	ItemInDonHang toItemInDonHang(ChiTietDonHang chiTietDonHang);
	
	List<ItemInDonHang> toItemInDonHangDTOList(List<ChiTietDonHang> chiTietDonHang);
}
