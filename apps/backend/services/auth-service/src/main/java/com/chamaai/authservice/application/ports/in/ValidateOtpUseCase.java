package com.chamaai.authservice.application.ports.in;

import com.chamaai.authservice.application.commands.ValidateOtpCommand;

public interface ValidateOtpUseCase {
    boolean validate(ValidateOtpCommand validateOtpCommand);
}
