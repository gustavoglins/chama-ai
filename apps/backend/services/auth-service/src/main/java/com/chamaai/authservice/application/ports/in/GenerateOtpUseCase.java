package com.chamaai.authservice.application.ports.in;

import com.chamaai.authservice.application.commands.GenerateOtpCommand;

public interface GenerateOtpUseCase {
    void generateOTP(GenerateOtpCommand generateOtpCommand);
}
