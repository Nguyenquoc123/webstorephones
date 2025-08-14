package com.bot.bandienthoai.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bot.bandienthoai.dto.reponse.APIReponse;

@ControllerAdvice
public class GlobalException {
	// ngoại lệ nhận dữ liệu
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<APIReponse> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        ErrorCode errorCode = ErrorCode.valueOf(exception.getFieldError().getDefaultMessage());
        APIReponse apiResponse = APIReponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();
        return ResponseEntity.badRequest().body(apiResponse);
    }
    
    // ngoại lệ khi chạy
    @ExceptionHandler(value = RunException.class)
    public ResponseEntity<APIReponse> handlingRunException(RunException exception) {
    	System.out.println("chay nè");
        APIReponse apiResponse = APIReponse.builder()
            .code(exception.getErrorCode().getCode())
            .message(exception.getErrorCode().getMessage())
            .build();
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
