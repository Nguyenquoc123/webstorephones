package com.bot.bandienthoai.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.dto.reponse.KhuyenMaiReponse;
import com.bot.bandienthoai.entity.DienThoai;
import com.bot.bandienthoai.entity.KhuyenMai;
import com.bot.bandienthoai.entity.KhuyenMai_DienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.KhuyenMaiMapper;
import com.bot.bandienthoai.repository.DienThoaiRepository;
import com.bot.bandienthoai.repository.KhuyenMaiDienThoaiRepository;
import com.bot.bandienthoai.repository.KhuyenMaiRepository;
import com.bot.bandienthoai.request.KhuyenMaiRequest;
import com.bot.bandienthoai.request.KhuyenMaiUpdateRequest;



@Service
public class KhuyenMaiService {
	@Autowired
	KhuyenMaiRepository khuyenMaiRepository;
	
	@Autowired
	DienThoaiRepository dienThoaiRepository;
	
	@Autowired
	KhuyenMaiDienThoaiRepository khuyenMaiDienThoaiRepository;
	
	@Autowired
	KhuyenMaiMapper khuyenMaiMapper;
	
	public List<KhuyenMaiReponse> getDSKhuyenMai(){
		List<KhuyenMai> lst = khuyenMaiRepository.findAll();
		
		return lst.stream().map(khuyenMaiMapper::toKhuyenMaiReponse).collect(Collectors.toList());
	}
	
	public KhuyenMaiReponse addKhuyenMai(KhuyenMaiRequest request) {
		KhuyenMai km = new KhuyenMai();
		km.setTenKhuyenMai(request.getTenKhuyenMai());
		km.setLoaiKhuyenMai(request.getLoaiKhuyenMai());
		km.setGiaTriGiam(request.getGiaTriGiam());
		km.setNgayBatDau(request.getNgayBatDau());
		km.setNgayKetThuc(request.getNgayKetThuc());
		km.setTrangThai(1);
		km.setDieuKien(0.0);
		try {
			km = khuyenMaiRepository.save(km);
			
			for (Integer maDienThoai : request.getDsDienThoai()) {
				Optional<DienThoai> dt = dienThoaiRepository.findById(maDienThoai);
				if(dt.isEmpty())
					throw new RunException(ErrorCode.Dien_Thoai_Not_Found);
				DienThoai dienThoai = dt.get();
				KhuyenMai_DienThoai km_dt = new KhuyenMai_DienThoai();
				km_dt.setDienThoai(dienThoai);
				km_dt.setKhuyenMai(km);
				
				km_dt = khuyenMaiDienThoaiRepository.save(km_dt);
			}
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		
		return khuyenMaiMapper.toKhuyenMaiReponse(km);
	}
	
	public KhuyenMaiReponse updateKhuyenMai(KhuyenMaiUpdateRequest request) {
		Optional<KhuyenMai> km = khuyenMaiRepository.findById(request.getMaKhuyenMai());
		if(km.isEmpty())
			throw new RunException(ErrorCode.Error_System);
		KhuyenMai khuyenMai = km.get();
		khuyenMai.setTenKhuyenMai(request.getTenKhuyenMai());
		khuyenMai.setLoaiKhuyenMai(request.getLoaiKhuyenMai());
		khuyenMai.setGiaTriGiam(request.getGiaTriGiam());
		khuyenMai.setNgayBatDau(request.getNgayBatDau());
		khuyenMai.setNgayKetThuc(request.getNgayKetThuc());
		try {
			khuyenMai = khuyenMaiRepository.save(khuyenMai);
			for(Integer madienthoai : request.getDsDienThoaiNew()) {
				Optional<DienThoai> dt = dienThoaiRepository.findById(madienthoai);
				if(dt.isPresent()) {
					KhuyenMai_DienThoai kmdt = new KhuyenMai_DienThoai(khuyenMai, dt.get());
					khuyenMaiDienThoaiRepository.save(kmdt);
				}
			}
			
			for(Integer madienthoai : request.getDsDienThoaiDelete()) {
				Optional<DienThoai> dt = dienThoaiRepository.findById(madienthoai);
				if(dt.isPresent()) {
					khuyenMaiDienThoaiRepository.deleteByKmAndDt(khuyenMai.getMaKhuyenMai(), madienthoai);
				}
			}
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return khuyenMaiMapper.toKhuyenMaiReponse(khuyenMai);
	}
	
	public String deleteKhuyenMai(Integer maKhuyenMai) {
		try {
			khuyenMaiDienThoaiRepository.deleteKhuyenMaiDienThoaiByMaKhuyenMai(maKhuyenMai);
			khuyenMaiRepository.deleteKhuyenMai(maKhuyenMai);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return "Delete success";
	}
}
