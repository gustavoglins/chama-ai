package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.commands.StartRegistrationCommand;

public interface StartRegistrationUseCase {
    void startRegistration(StartRegistrationCommand command);
}
