

package com.bot.bandienthoai.service;

import java.io.File;

import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.bot.bandienthoai.dto.reponse.DienThoaiAdminReponse;

import com.bot.bandienthoai.entity.DanhMuc;
import com.bot.bandienthoai.entity.DienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.DienThoaiMapper;
import com.bot.bandienthoai.repository.DanhMucRepository;
import com.bot.bandienthoai.repository.DienThoaiRepository;
import com.bot.bandienthoai.request.DienThoaiAddRequest;

import com.bot.bandienthoai.request.DienThoaiUpdateRequets;



@Service
public class DienThoaiService {
	@Autowired
	DienThoaiRepository dienThoaiRepository;
	
	@Autowired
	DanhMucRepository danhMucRepository;
	
	@Autowired
	DienThoaiMapper dienThoaiMapper;
	
	
	public List<DienThoaiAdminReponse> getDSDienThoaiAdmin(){
		List<DienThoai> dsDienThoai = dienThoaiRepository.getDSDienThoai();
		return dsDienThoai.stream().map(dienThoaiMapper::toDienThoaiReponse).collect(Collectors.toList());
	}
	// get phân trang
	public Page<DienThoaiAdminReponse> getDSDienThoaiPhanTrang(int page, int size){
		Pageable pageable = PageRequest.of(page, size);
		Page<DienThoai> lst = dienThoaiRepository.findByTrangThaiNot(-1, pageable);
		return lst.map(dienThoaiMapper::toDienThoaiReponse);
	}
	
	
	public DienThoaiAdminReponse addDienThoai(DienThoaiAddRequest request, MultipartFile image) {
		String urlFolder = System.getProperty("user.dir") + "\\uploads";
		
		File uploadFolder = new File(urlFolder);
		if (!uploadFolder.exists()) {
			uploadFolder.mkdirs();
	     }
		
		 String fileName = System.currentTimeMillis() + image.getOriginalFilename();
		 File destination = new File(uploadFolder, fileName);
		
		 try {
			image.transferTo(destination);
			System.out.println("Daluu");
			System.out.println(urlFolder);
		} catch (Exception e) {
			System.out.println("Lỗi rồi");
			throw new RunException(ErrorCode.Image_Not_Valid);
			
		}
		Optional<DanhMuc> danhMuc = danhMucRepository.findById(request.getMaDanhMuc());
		if(danhMuc.isEmpty()) {
			throw new RunException(ErrorCode.Danh_Muc_Not_Found);
		}
		
		DienThoai dienThoai = new DienThoai();
		dienThoai.setDanhMuc(danhMuc.get());
		dienThoai.setHangSanXuat(request.getHangSanXuat());
		dienThoai.setImage(fileName);
		dienThoai.setMoTa(request.getMoTa());
		dienThoai.setTenDienThoai(request.getTenDienThoai());
		dienThoai.setTrangThai(1);
		try {
			dienThoai = dienThoaiRepository.save(dienThoai);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		
		return dienThoaiMapper.toDienThoaiReponse(dienThoai);
	}
	
	public DienThoaiAdminReponse updateDienThoai(DienThoaiUpdateRequets request, MultipartFile image) {
		String url = "";
		if(image != null && !image.isEmpty()) {
			String urlFolder = System.getProperty("user.dir") + "\\uploads";
			
			File uploadFolder = new File(urlFolder);
			if (!uploadFolder.exists()) {
				uploadFolder.mkdirs();
		     }
			
			 String fileName = System.currentTimeMillis() + image.getOriginalFilename();
			 url = fileName;
			 File destination = new File(uploadFolder, fileName);
			
			 try {
				image.transferTo(destination);
				System.out.println("Daluu");
				System.out.println(urlFolder);
			} catch (Exception e) {
				System.out.println("Lỗi rồi");
				throw new RunException(ErrorCode.Image_Not_Valid);
				
			}
		}
		
		Optional<DienThoai> dienThoai = dienThoaiRepository.findById(request.getMaDienThoai());
		if(dienThoai.isEmpty()) {
			throw new RunException(ErrorCode.Dien_Thoai_Not_Found);
		}
		Optional<DanhMuc> danhMuc = danhMucRepository.findById(request.getMaDanhMuc());
		if(danhMuc.isEmpty()) {
			throw new RunException(ErrorCode.Danh_Muc_Not_Found);
		}
		
		DienThoai dt = dienThoai.get();
		dt.setDanhMuc(danhMuc.get());
		dt.setHangSanXuat(request.getHangSanXuat());
		if(url != "")
			dt.setImage(url);
		
		dt.setMoTa(request.getMoTa());
		dt.setTenDienThoai(request.getTenDienThoai());
		try {
			dt = dienThoaiRepository.save(dt);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return dienThoaiMapper.toDienThoaiReponse(dt);
	}
	
	// Delete Dien thoai
	public String deleteDienThoai(Integer maDienThoai) {
		Optional<DienThoai> dienThoai = dienThoaiRepository.findById(maDienThoai);
		if(dienThoai.isEmpty()) {
			throw new RunException(ErrorCode.Dien_Thoai_Not_Found);
		}
		// set trang thai = -1
		DienThoai dt = dienThoai.get();
		dt.setTrangThai(-1);
		try {
			dt = dienThoaiRepository.save(dt);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		// trả về kết quả
		return "Delete Successful";
	}
}
