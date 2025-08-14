package com.bot.bandienthoai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.CartItemReponse;
import com.bot.bandienthoai.request.CartItemRequest;
import com.bot.bandienthoai.service.CartItemService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class CartItemController {
	@Autowired
	CartItemService cartItemService;
	
	@GetMapping("/getdsgiohang")
	public APIReponse<List<CartItemReponse>> getDSGioHang(){
		return APIReponse.<List<CartItemReponse>>builder().result(cartItemService.getDSInCart()).build();
	}
	@PostMapping("/themvaogiohang")
	public APIReponse<CartItemReponse> addVaoGioHang(@Valid @RequestBody CartItemRequest request){
		return APIReponse.<CartItemReponse>builder().result(cartItemService.addPhienBanInCart(request)).build();
	}
	@GetMapping("/xoakhoigiohang/{maPhienBan}")
	public APIReponse<String> xoaKhoiGioHang(@PathVariable(name = "maPhienBan") Integer maPhienBan){
		return APIReponse.<String>builder().result(cartItemService.deleteKhoiGioHang(maPhienBan)).build();
	}
}
