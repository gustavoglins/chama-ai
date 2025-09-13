package com.chamaai.userservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.requests.GenerateOtpRequestDTO;
import com.chamaai.common.dto.requests.ValidateOtpRequestDTO;
import com.chamaai.common.dto.responses.ApiResponseDTO;
import com.chamaai.userservice.application.ports.out.AuthRestPort;
import org.springframework.stereotype.Component;

@Component
public class AuthRestAdapter implements AuthRestPort {

    private final AuthFeignClient authFeignClient;

    public AuthRestAdapter(AuthFeignClient authFeignClient) {
        this.authFeignClient = authFeignClient;
    }

    //TODO: create DTO
    @Override
    public ApiResponseDTO generateOtp(String login) {
        return this.authFeignClient.generateOtp(new GenerateOtpRequestDTO(login));
    }


    //TODO: create DTO
    @Override
    public ApiResponseDTO validateOtp(String login, String otp) {
        return this.authFeignClient.validateOtp(new ValidateOtpRequestDTO(login, otp));
    }

}
