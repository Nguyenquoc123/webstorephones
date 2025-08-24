package com.bot.bandienthoai.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.DanhMucReponse;
import com.bot.bandienthoai.entity.Admin;
import com.bot.bandienthoai.entity.DanhMuc;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.DanhMucMapper;
import com.bot.bandienthoai.repository.AdminRepository;
import com.bot.bandienthoai.repository.DanhMucRepository;
import com.bot.bandienthoai.request.DanhMucAddRequest;

import com.bot.bandienthoai.request.DanhMucUpdateRequest;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class DanhMucService {
	@Autowired
	DanhMucRepository danhMucRepository;
	
	@Autowired
	DanhMucMapper danhMucMapper;
	
	@Autowired
	AdminRepository adminRepository;
	public List<DanhMucReponse> getDSDanhMuc(){
		List<DanhMuc> dsDanhMuc = danhMucRepository.findAll();
		return dsDanhMuc.stream().filter(item -> item.getTrangThai() != -1).map(danhMucMapper::toDanhMucReponse).collect(Collectors.toList());
	}
	
	public Page<DanhMucReponse> getDSDanhMucPhanTrang(Integer page, Integer size) {
	    Pageable pageable = PageRequest.of(page, size);
	    Page<DanhMuc> pageDanhMuc = danhMucRepository.findByTrangThaiNot(-1, pageable);
	    return pageDanhMuc.map(danhMucMapper::toDanhMucReponse);
	}

	
	public DanhMucReponse addDanhMuc(DanhMucAddRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println(authentication.getName() + " username");
		DanhMuc danhMuc = new DanhMuc();
		danhMuc.setTenDanhMuc(request.getTenDanhMuc());
		danhMuc.setMoTa(request.getMoTa());
		danhMuc.setTrangThai(1);
		try {
			danhMuc = danhMucRepository.save(danhMuc);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return danhMucMapper.toDanhMucReponse(danhMuc);
	}
	public DanhMucReponse updateDanhMuc(DanhMucUpdateRequest request) {
		
		Optional<DanhMuc> danhMuc = danhMucRepository.findById(request.getMaDanhMuc());
		if(danhMuc.isEmpty()) {
			throw new RunException(ErrorCode.Danh_Muc_Not_Found);
		}
		DanhMuc dm = danhMuc.get();
		dm.setTenDanhMuc(request.getTenDanhMuc());
		dm.setMoTa(request.getMoTa());
		try {
			dm = danhMucRepository.save(dm);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return danhMucMapper.toDanhMucReponse(dm);
	}
	
	public String deleteDanhMuc(Integer maDanhMuc) {
	
		
		Optional<DanhMuc> danhMuc = danhMucRepository.findById(maDanhMuc);
		if(danhMuc.isEmpty()) {
			throw new RunException(ErrorCode.Danh_Muc_Not_Found);
		}
		DanhMuc dm = danhMuc.get();
		dm.setTrangThai(-1);
		try {
			dm = danhMucRepository.save(dm);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return "Delete Succesful";
	}
}
