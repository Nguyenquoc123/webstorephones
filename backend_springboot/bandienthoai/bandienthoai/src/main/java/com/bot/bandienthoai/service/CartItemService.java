package com.bot.bandienthoai.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.CartItemReponse;
import com.bot.bandienthoai.dto.reponse.CartItemUpdate;
import com.bot.bandienthoai.entity.Cart;
import com.bot.bandienthoai.entity.CartItem;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.CartItemMapper;
import com.bot.bandienthoai.repository.CartItemRepository;
import com.bot.bandienthoai.repository.CartRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.repository.PhienBanDienThoaiRepository;
import com.bot.bandienthoai.request.CartItemRequest;
import com.bot.bandienthoai.request.CartItemUpdateRequest;



@Service
public class CartItemService {
	@Autowired
	CartItemRepository cartItemRepository;
	@Autowired
	KhachHangRepository khachHangRepository;
	@Autowired
	PhienBanDienThoaiRepository phienBanDienThoaiRepository;
	@Autowired
	CartRepository cartRepository;
	@Autowired
	CartItemMapper cartItemMapper;
	
	public List<CartItemReponse> getDSInCart(){
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<Cart> cart_ = cartRepository.findByKhachHang_maKhachHang(maKhachHang_);
		if(cart_.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		List<CartItem> lst = cartItemRepository.findByCart_cartId(cart_.get().getCartId());
		return lst.stream().map(cartItemMapper::toCartItemReponse).collect(Collectors.toList());
	}

	public CartItemReponse addPhienBanInCart(CartItemRequest request) {
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());

		Optional<KhachHang> khachHang = khachHangRepository.findById(maKhachHang_);
		if(khachHang.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		Optional<Cart> cart_ = cartRepository.findByKhachHang_maKhachHang(maKhachHang_);
		Cart c;
		if(cart_.isEmpty()) {
			c = new Cart();
			try {
				c.setKhachHang(khachHang.get());
				c = cartRepository.save(c);
			} catch (Exception e) {
				throw new RunException(ErrorCode.Error_System);
			}
		}
		else {
			c = cart_.get();
		}
		Optional<PhienBanDienThoai> pb = phienBanDienThoaiRepository.findById(request.getMaPhienBan());
		if(pb.isEmpty()) {
			throw new RunException(ErrorCode.PhienBanDienThoai_Not_Found);
		}
		CartItem cartItem = new CartItem();
		cartItem.setCart(c);
		cartItem.setPhienBanDienThoai(pb.get());
		cartItem.setSoLuong(request.getSoLuong());
		try {
			cartItem = cartItemRepository.save(cartItem);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return cartItemMapper.toCartItemReponse(cartItem);
	}
	
	public String deleteKhoiGioHang(Integer maPhienBan) {
		Integer maKhachHang = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<Cart> cart_ = cartRepository.findByKhachHang_maKhachHang(maKhachHang);
		if(cart_.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		Optional<CartItem> cartItem = cartItemRepository.findByCart_cartIdAndPhienBanDienThoai_maPhienBan(cart_.get().getCartId(), maPhienBan);
		if(cartItem.isEmpty()) {
			throw new RunException(ErrorCode.CartItem_Not_Found);
		}
		
		try {
			cartItemRepository.delete(cartItem.get());
		} catch (Exception e) {
			e.printStackTrace();
			throw new RunException(ErrorCode.Error_System);
		}
		return "Delete Successful";
	}
}
