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
public class ChiTietDonHangId implements Serializable{
	private DonHang donHang;
	private PhienBanDienThoai phienBanDienThoai;
}
