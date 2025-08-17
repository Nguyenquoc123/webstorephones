package com.bot.bandienthoai.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiTrongCartReponse;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.PhienBanDienThoaiMapper;
import com.bot.bandienthoai.repository.CartRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;

@Service
public class CartService {
	@Autowired
	CartRepository cartRepository;
	
	@Autowired 
	KhachHangRepository khachHangRepository;
	
	@Autowired
	PhienBanDienThoaiMapper phienBanDienThoaiMapper;

	
}
