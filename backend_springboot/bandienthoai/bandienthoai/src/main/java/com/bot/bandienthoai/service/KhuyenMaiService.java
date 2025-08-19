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
}
