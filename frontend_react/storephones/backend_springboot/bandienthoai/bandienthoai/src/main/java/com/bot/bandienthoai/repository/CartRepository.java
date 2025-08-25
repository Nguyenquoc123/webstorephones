package com.bot.bandienthoai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	Optional<Cart> findByKhachHang_maKhachHang(Integer maKhachHang);
}
