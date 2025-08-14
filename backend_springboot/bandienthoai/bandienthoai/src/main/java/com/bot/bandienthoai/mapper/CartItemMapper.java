package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.CartItemReponse;

import com.bot.bandienthoai.entity.CartItem;

@Mapper(componentModel = "spring", uses = ImagesMapper.class)
public interface CartItemMapper {


	
	@Mapping(source = "phienBanDienThoai.maPhienBan", target = "maPhienBan")
	@Mapping(source = "phienBanDienThoai.dienThoai.tenDienThoai", target = "tenDienThoai")
	@Mapping(source = "soLuong", target = "soLuong")
	@Mapping(source = "phienBanDienThoai.giaBan", target = "giaBan")
	@Mapping(source = "phienBanDienThoai.images", target = "image")
	@Mapping(source = "phienBanDienThoai.rom", target = "rom")
	@Mapping(source = "phienBanDienThoai.ram", target = "ram")
	@Mapping(source = "phienBanDienThoai.moTa", target = "moTa")
	@Mapping(source = "phienBanDienThoai.mauSac", target = "mauSac")
	@Mapping(target = "thanhTien", expression = "java(cartItem.getSoLuong() * cartItem.getPhienBanDienThoai().getGiaBan())")
	CartItemReponse toCartItemReponse(CartItem cartItem);
}
