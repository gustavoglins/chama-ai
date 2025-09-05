package com.chamaai.notificationservice.service.interfaces;

import com.chamaai.notificationservice.dtos.requests.SendOtpEmailRequestDto;
import com.chamaai.notificationservice.dtos.requests.SendOtpPhoneRequestDto;

public interface NotificationService {

    void sendOtpEmail(SendOtpEmailRequestDto request);
    void sendOtpWhatsapp(SendOtpPhoneRequestDto request);
}
