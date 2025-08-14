package com.bot.bandienthoai.request;

import lombok.Data;

@Data
public class CartItemUpdateRequest {
	private Integer cartId;
	private Integer maPhienBan;
	private Integer soLuong;
}
