package com.bot.bandienthoai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.bot.bandienthoai.entity.CartItem;
import com.bot.bandienthoai.entity.CartItemId;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, CartItemId>{
	
	
	Optional<CartItem> findByCart_cartIdAndPhienBanDienThoai_maPhienBan(Integer cartId, Integer maPhienBan);
	List<CartItem> findByCart_cartId(Integer cartId);
}
