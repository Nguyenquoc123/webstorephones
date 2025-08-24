package com.bot.bandienthoai.controller;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.entity.DonHang;
import com.bot.bandienthoai.service.DonHangService;

import jakarta.servlet.http.HttpServletRequest;

@Controller

public class ThanhToanController {
	@Autowired
	DonHangService donHangService;
	
	@GetMapping("/thanhtoan")
	public String ketQuaThanhToan(HttpServletRequest request) throws UnsupportedEncodingException {
		Map<String, String> fields = new HashMap<>();
	    for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements();) {
	        String fieldName = params.nextElement();
	        String fieldValue = request.getParameter(fieldName);
	        if ((fieldValue != null) && (fieldValue.length() > 0)) {
	            fields.put(fieldName, fieldValue);
	        }
	    }
	    
	    String vnp_SecureHash = request.getParameter("vnp_SecureHash");
	    fields.remove("vnp_SecureHashType");
	    fields.remove("vnp_SecureHash");
	    
	    String signValue = ConfigController.hashAllFields(fields);
	    String checkHash = ConfigController.hmacSHA512(ConfigController.secretKey, signValue);

	    if (checkHash.equals(vnp_SecureHash)) {
	        String maDonHang = request.getParameter("vnp_TxnRef");
	        String responseCode = request.getParameter("vnp_ResponseCode");

	        Optional<DonHang> donHangOpt = donHangService.getDonHangByMaDonHang(maDonHang);
	        if (donHangOpt.isPresent()) {
	            DonHang dh = donHangOpt.get();
	            if ("00".equals(responseCode)) { // Thanh toán thành công
	            	donHangService.updateTrangThaiThanhToan(maDonHang, 2);
	             
	            } else {      // Thanh toán thất bại
	            	donHangService.updateTrangThaiThanhToan(maDonHang, 3);
	            }
	            
	        }

	        return "redirect:http://localhost:3000/home/chitietdonhang/" + maDonHang;
	    } else {
	        return "redirect:http://localhost:3000/home/chitietdonhang/";
	    }
	}
}
