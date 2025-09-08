package com.chamaai.userservice.application.ports.out;

public interface OtpSenderPort {

    /**
     * Envia um OTP para o usuário.
     *
     * @param destination - email ou telefone
     * @param otpCode     - código de verificação gerado
     */
    void sendOtp(String destination, String otpCode);
}
