package com.bot.bandienthoai.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemId implements Serializable{
	private Cart cart;
	private PhienBanDienThoai phienBanDienThoai;
}
