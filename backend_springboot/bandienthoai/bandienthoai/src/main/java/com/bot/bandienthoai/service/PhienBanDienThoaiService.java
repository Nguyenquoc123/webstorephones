package com.bot.bandienthoai.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiReponse;
import com.bot.bandienthoai.entity.DienThoai;
import com.bot.bandienthoai.entity.Images;
import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.PhienBanDienThoaiMapper;
import com.bot.bandienthoai.repository.DienThoaiRepository;
import com.bot.bandienthoai.repository.ImagesRepository;
import com.bot.bandienthoai.repository.PhienBanDienThoaiRepository;

import com.bot.bandienthoai.request.PhienBanDienThoaiAddRequest;

import com.bot.bandienthoai.request.PhienBanDienThoaiUpdateRequest;
import com.bot.bandienthoai.request.SearchAndFilterRequest;

@Service
public class PhienBanDienThoaiService {
	@Autowired
	DienThoaiRepository dienThoaiRepository;

	@Autowired
	PhienBanDienThoaiRepository phienBanDienThoaiRepository;

	@Autowired
	ImagesRepository imagesRepository;

	@Autowired
	PhienBanDienThoaiMapper phienBanDienThoaiMapper;
	
	@Autowired
	EntityManagerService entityManagerService;

	public List<PhienBanDienThoaiReponse> getAllPhienBan() {
		List<PhienBanDienThoai> lstPhienBan = phienBanDienThoaiRepository.getAllPhienBan();
		return lstPhienBan.stream().filter(item -> item.getTrangThai() != -1)
				.map(phienBanDienThoaiMapper::toPhienBanDienThoaiReponse).collect(Collectors.toList());
	}

	// get ds phan trang
	public Page<PhienBanDienThoaiReponse> getDSPhienBanPhanTrang(Integer page, Integer size){
		Pageable pageable = PageRequest.of(page, size);
		Page<PhienBanDienThoai> lst = phienBanDienThoaiRepository.findByTrangThaiNot(-1, pageable);
		return lst.map(phienBanDienThoaiMapper::toPhienBanDienThoaiReponse);
	}
	
	public List<PhienBanDienThoaiReponse> getDSPhienBanByMaDienThoai(Integer maDienThoai) {
		List<PhienBanDienThoai> ds = phienBanDienThoaiRepository.findByDienThoai_MaDienThoai(maDienThoai);
		return ds.stream().map(phienBanDienThoaiMapper::toPhienBanDienThoaiReponse).collect(Collectors.toList());
	}
	@Transactional
	public PhienBanDienThoaiReponse updatePhienBanDienThoai(PhienBanDienThoaiUpdateRequest request,
			List<MultipartFile> images, List<Integer> lstImageDelete) {

		Optional<PhienBanDienThoai> pbdt = phienBanDienThoaiRepository.findById(request.getMaPhienBan());
		if (pbdt.isEmpty()) {
			throw new RunException(ErrorCode.PhienBanDienThoai_Not_Found);
		}
		Optional<DienThoai> dt = dienThoaiRepository.findById(request.getMaDienThoai());
		PhienBanDienThoai pb = pbdt.get();
		pb.setCamera(request.getCamera());
		pb.setDienThoai(dt.get());
		pb.setGiaBan(request.getDonGia());
		pb.setManHinh(request.getManHinh());
		pb.setMauSac(request.getMauSac());
		pb.setPin(request.getPin());
		pb.setRam(request.getRam());
		pb.setRom(request.getRom());
		pb.setSoLuong(request.getSoLuong());
		pb.setMoTa(request.getMoTa());
		try {
			pb = phienBanDienThoaiRepository.save(pb);
		} catch (Exception e) {
			System.out.println("Chắc là ko đâu");
			throw new RunException(ErrorCode.Error_System);
		}


		List<Images> dsImages = new ArrayList<Images>();
		if (images != null && !images.isEmpty()) {
			String urlFolder = System.getProperty("user.dir") + "\\uploads";

			File uploadFolder = new File(urlFolder);
			if (!uploadFolder.exists()) {
				uploadFolder.mkdirs();
			}
			for (MultipartFile image : images) {
				String fileName = System.currentTimeMillis() + image.getOriginalFilename();
				File destination = new File(uploadFolder, fileName);

				try {
					image.transferTo(destination);
					System.out.println("Daluu");
					System.out.println(urlFolder);
					Images i = new Images();
					i.setPhienBanDienThoai(pb);
					i.setUrl(fileName);
					i = imagesRepository.save(i);
					dsImages.add(i);
				} catch (Exception e) {
					System.out.println("Lỗi rồi");
					throw new RunException(ErrorCode.Image_Not_Valid);

				}
			}

		}
		try {
			imagesRepository.deleteAllByIdIn(lstImageDelete);
		} catch (Exception e) {
			System.out.println("Chắc là ko đâu nừ");
			e.printStackTrace();
			throw new RunException(ErrorCode.Error_System);
		}
		pb.setImages(dsImages);
		return phienBanDienThoaiMapper.toPhienBanDienThoaiReponse(pb);
	}

	// add
	public PhienBanDienThoaiReponse addPhienBanDienThoai(PhienBanDienThoaiAddRequest request,
			List<MultipartFile> images) {
		Optional<DienThoai> dt = dienThoaiRepository.findById(request.getMaDienThoai());
		if (dt.isEmpty()) {
			throw new RunException(ErrorCode.Dien_Thoai_Not_Found);
		}
		System.out.println(request.getDonGia());
		PhienBanDienThoai pbdt = new PhienBanDienThoai();
		pbdt.setCamera(request.getCamera());
		pbdt.setDienThoai(dt.get());
		pbdt.setGiaBan(request.getDonGia());
		pbdt.setManHinh(request.getManHinh());
		pbdt.setMauSac(request.getMauSac());
		pbdt.setPin(request.getPin());
		pbdt.setRam(request.getRam());
		pbdt.setRom(request.getRom());
		pbdt.setSoLuong(request.getSoLuong());
		pbdt.setMoTa(request.getMoTa());
		pbdt.setTrangThai(1);
		try {
			pbdt = phienBanDienThoaiRepository.save(pbdt);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}

		String urlFolder = System.getProperty("user.dir") + "\\uploads";
		List<Images> dsImages = new ArrayList<Images>();
		File uploadFolder = new File(urlFolder);
		if (!uploadFolder.exists()) {
			uploadFolder.mkdirs();
		}
		for (MultipartFile image : images) {
			String fileName = System.currentTimeMillis() + image.getOriginalFilename();
			File destination = new File(uploadFolder, fileName);

			try {
				image.transferTo(destination);
				System.out.println("Daluu");
				System.out.println(urlFolder);
				Images i = new Images();
				i.setPhienBanDienThoai(pbdt);
				i.setUrl(fileName);
				i = imagesRepository.save(i);
				dsImages.add(i);
			} catch (Exception e) {
				System.out.println("Lỗi rồi");
				throw new RunException(ErrorCode.Image_Not_Valid);

			}
		}

		pbdt.setImages(dsImages);

		return phienBanDienThoaiMapper.toPhienBanDienThoaiReponse(pbdt);
	}

	// delete
	public String deletePhienBanDienThoai(Integer maPhienBan) {
		Optional<PhienBanDienThoai> pbdt = phienBanDienThoaiRepository.findById(maPhienBan);
		if (pbdt.isEmpty()) {
			throw new RunException(ErrorCode.PhienBanDienThoai_Not_Found);
		}
		// set trang thai = -1
		PhienBanDienThoai pb = pbdt.get();
		pb.setTrangThai(-1);
		try {
			pb = phienBanDienThoaiRepository.save(pb);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		return "Delete Successful.";
	}
	

	public List<PhienBanDienThoaiReponse> searchAndFilter(SearchAndFilterRequest request){
		List<PhienBanDienThoai> lst ;
		if(request.getSearch() != null) {
			List<String> keysword = Arrays.asList(request.getSearch().strip().split("[ ]")) ;
			lst = entityManagerService.search(keysword);
		}
		else{
			lst = phienBanDienThoaiRepository.getAllPhienBan().stream().filter(pb -> pb.getTrangThai() != -1 ).collect(Collectors.toList());
		}
		
		if(request.getFilter()) {
			lst = entityManagerService.filterPhienBan(lst, request);
		}
		
		
		return lst.stream().map(phienBanDienThoaiMapper::toPhienBanDienThoaiReponse).collect(Collectors.toList());
	}
}
