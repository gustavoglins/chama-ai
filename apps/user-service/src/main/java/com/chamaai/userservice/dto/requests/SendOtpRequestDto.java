package com.chamaai.userservice.dto.requests;

import com.chamaai.userservice.enums.OtpChannelType;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record SendOtpRequestDto(

        @NotNull(message = "Channel is required.")
        OtpChannelType channel,
        String email,
        BigInteger phoneNumber
) {

    @AssertTrue(message = "Email is required when choose channel is Email")
    private boolean isEmailValid(){
        return channel != OtpChannelType.EMAIL || (email != null && !email.isBlank());
    }

    @AssertTrue(message = "Phone number is required when choose channel is Phone")
    private boolean isPhoneValid(){
        return channel != OtpChannelType.WHATSAPP || phoneNumber != null;
    }
}
