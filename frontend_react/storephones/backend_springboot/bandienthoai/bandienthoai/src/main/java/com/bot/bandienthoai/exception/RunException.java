package com.bot.bandienthoai.exception;




import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RunException extends RuntimeException{
	ErrorCode errorCode;
	public RunException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
