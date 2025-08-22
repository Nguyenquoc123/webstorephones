package com.bot.bandienthoai.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class ConfigController {

	public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
	public static String vnp_ReturnUrl = "http://localhost:8080/storephones/thanhtoan";
	public static String vnp_TmnCode = "LPNC4XZN";
	public static String secretKey = "X6NR1G7F2J4KD0OLGS54S70WDO76EH6G";
	public static String vnp_ApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";


    //Util for VNPAY
	public static String hashAllFields(Map<String, String> fields) throws UnsupportedEncodingException {
	    List<String> fieldNames = new ArrayList<>(fields.keySet());
	    Collections.sort(fieldNames); // sort alphabet

	    StringBuilder sb = new StringBuilder();
	    for (String fieldName : fieldNames) {
	        String fieldValue = fields.get(fieldName);
	        if ((fieldValue != null) && (fieldValue.length() > 0) 
	            && (!fieldName.equals("vnp_SecureHash"))) {  // bỏ SecureHash ra
	            sb.append(fieldName);
	            sb.append('=');
	            sb.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
	            sb.append('&');
	        }
	    }
	    sb.deleteCharAt(sb.length() - 1); // bỏ dấu & cuối
	    return sb.toString();
	}

    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }
    
    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }

    public static String createQueryUrl(Map<String, String> params) throws UnsupportedEncodingException {
        // Sắp xếp key theo alphabet
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++) {
            String key = fieldNames.get(i);
            String value = params.get(key);
            if ((value != null) && (value.length() > 0)) {
                // Encode UTF-8 theo chuẩn VNPAY
                sb.append(URLEncoder.encode(key, StandardCharsets.US_ASCII.toString()));
                sb.append("=");
                sb.append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));
                if (i < fieldNames.size() - 1) {
                    sb.append("&");
                }
            }
        }
        return sb.toString();
    }

}
