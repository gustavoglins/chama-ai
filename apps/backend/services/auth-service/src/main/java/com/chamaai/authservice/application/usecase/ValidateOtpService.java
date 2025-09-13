package com.chamaai.authservice.application.usecase;

import com.chamaai.authservice.application.commands.ValidateOtpCommand;
import com.chamaai.authservice.application.exceptions.InvalidOtpException;
import com.chamaai.authservice.application.ports.in.ValidateOtpUseCase;
import com.chamaai.authservice.application.ports.out.CachePort;
import com.chamaai.authservice.application.ports.out.TokenProviderPort;
import com.chamaai.common.enums.TokenPurpose;
import org.springframework.stereotype.Service;

@Service
public class ValidateOtpService implements ValidateOtpUseCase {

    private static final String OTP_CACHE_KEY_PREFIX = "OTP:";

    private final CachePort cachePort;
    private final TokenProviderPort tokenProviderPort;

    public ValidateOtpService(CachePort cachePort, TokenProviderPort tokenProviderPort) {
        this.cachePort = cachePort;
        this.tokenProviderPort = tokenProviderPort;
    }

    @Override
    public String validate(ValidateOtpCommand validateOtpCommand) {
        Object retrieveItem = cachePort.getItem(OTP_CACHE_KEY_PREFIX + validateOtpCommand.login());
        if (retrieveItem == null || retrieveItem.toString().isEmpty()) {
            throw new InvalidOtpException("OTP has expired");
        }
        if (!retrieveItem.toString().equals(validateOtpCommand.otp())) {
            throw new InvalidOtpException("Invalid OTP");
        }
        cachePort.deleteItem(OTP_CACHE_KEY_PREFIX + validateOtpCommand.login());
        return tokenProviderPort.generateToken(validateOtpCommand.login(), TokenPurpose.ACCOUNT_CREATION);
    }
}
