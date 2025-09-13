package com.chamaai.authservice.application.ports.in;

import com.chamaai.authservice.application.commands.ValidateOtpCommand;

public interface ValidateOtpUseCase {
    String validate(ValidateOtpCommand validateOtpCommand);
}
