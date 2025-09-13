package com.chamaai.userservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.requests.GenerateOtpRequestDTO;
import com.chamaai.common.dto.requests.ValidateOtpRequestDTO;
import com.chamaai.common.dto.responses.ApiResponseDTO;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "auth-service", url = "${chama-ai.services.auth-service.url}")
public interface AuthFeignClient {

    @PostMapping("/api/v1/auth/otp/generate")
    <T> ApiResponseDTO<T> generateOtp(@RequestBody @Valid GenerateOtpRequestDTO request);

    @PostMapping("/api/v1/auth/otp/validate")
    <T> ApiResponseDTO<T> validateOtp(@RequestBody @Valid ValidateOtpRequestDTO request);
}
