package com.bot.bandienthoai.service;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

import com.bot.bandienthoai.controller.ConfigController;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.dto.reponse.KetQuaDonHangReponse;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class BuildVnpayService {
	public static Map<String, String> buildVnpayParams(KetQuaDonHangReponse donHang, HttpServletRequest request) {
	    String vnp_TxnRef = donHang.getMaDonHang();
	    String vnp_OrderInfo = "Thanh toan don hang: " + donHang.getMaDonHang();
	    String orderType = "other";
	    String vnp_IpAddr = request.getRemoteAddr();
	    String vnp_TmnCode = ConfigController.vnp_TmnCode;
	    long amount = Math.round(donHang.getTongTien() * 100);

	    Map<String, String> vnp_Params = new HashMap<String, String>();
	    vnp_Params.put("vnp_Version", "2.1.0");
	    vnp_Params.put("vnp_Command", "pay");
	    vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
	    vnp_Params.put("vnp_Amount", String.valueOf(amount));
	    vnp_Params.put("vnp_CurrCode", "VND");
	    vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
	    vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
	    vnp_Params.put("vnp_OrderType", orderType);
	    vnp_Params.put("vnp_Locale", "vn");
	    vnp_Params.put("vnp_ReturnUrl", ConfigController.vnp_ReturnUrl);
	    vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

	    // Thêm thời gian tạo đơn
	    Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
	    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	    String vnp_CreateDate = formatter.format(cld.getTime());
	    vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

	    return vnp_Params;
	}
	
	public static String buildPaymentUrl(Map<String, String> vnp_Params) throws Exception {
	   
	    // Sinh chữ ký HMAC SHA512
	    String queryUrl = ConfigController.createQueryUrl(vnp_Params);
	    String hashData = ConfigController.hashAllFields(vnp_Params);
	    String vnp_SecureHash = ConfigController.hmacSHA512(ConfigController.secretKey, hashData);
	    queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

	    // Trả về link thanh toán
	    return ConfigController.vnp_PayUrl + "?" + queryUrl;
	}


}
