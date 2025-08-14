package com.bot.bandienthoai.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.entity.DonHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.DonHangMapper;
import com.bot.bandienthoai.repository.DonHangRepository;
import com.bot.bandienthoai.request.DonHangUpdateRequest;

@Service
public class DonHangService {	
	@Autowired
	DonHangRepository donHangRepository;
	
	@Autowired
	DonHangMapper donHangMapper;
	
	
	
	
	public List<DonHangReponse> getDSDonHang(){
		List<DonHang> lst = donHangRepository.findAll();
		return lst.stream().map(donHangMapper::toDonHangReponse).collect(Collectors.toList());
	}
	
	public List<DonHangReponse> getDSByTrangThai(Integer trangThai){
		if(trangThai == -1) {
			return getDSDonHang();
		}
		List<DonHang> lst = donHangRepository.findByTrangThai(trangThai);
		return lst.stream().map(donHangMapper::toDonHangReponse).collect(Collectors.toList());
	}
	public DonHangReponse updateTrangThaiDonHang(DonHangUpdateRequest request) {
		Optional<DonHang> donHang = donHangRepository.findByMaDonHang(request.getMaDonHang());
		if(donHang.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		DonHang dh = donHang.get();
		dh.setTrangThai(request.getTrangThai());
		try {
			dh =  donHangRepository.save(dh);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return donHangMapper.toDonHangReponse(dh);
	}
	
	public ChiTietDonHangReponse getAllInDonHang(String maDonHang) {
		Optional<DonHang> donHang = donHangRepository.findByMaDonHang(maDonHang);
		if(donHang.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		DonHang dh = donHang.get();
		return donHangMapper.toChiTietDonHangReponse(dh);
	}
}
