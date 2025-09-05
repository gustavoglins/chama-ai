package com.chamaai.userservice.service.implementations;

import com.chamaai.userservice.clients.NotificationClient;
import com.chamaai.userservice.dto.events.UserCreatedEventDTO;
import com.chamaai.userservice.dto.requests.*;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;
import com.chamaai.userservice.entity.User;
import com.chamaai.userservice.enums.AccountType;
import com.chamaai.userservice.enums.AuthProvider;
import com.chamaai.userservice.enums.AuthRole;
import com.chamaai.userservice.enums.OtpChannelType;
import com.chamaai.userservice.exceptions.*;
import com.chamaai.userservice.kafka.UserProducer;
import com.chamaai.userservice.repository.UserRepository;
import com.chamaai.userservice.service.interfaces.AuthService;
import com.chamaai.userservice.service.interfaces.RedisService;
import com.chamaai.userservice.service.interfaces.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Service
public class AuthServiceImpl implements AuthService {

    private static final int LEGAL_AGE = 18;

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserProducer userProducer;
    private final NotificationClient notificationClient;
    private final RedisService redisService;

    public AuthServiceImpl(UserRepository userRepository, TokenService tokenService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserProducer userProducer, NotificationClient notificationClient, RedisService redisService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userProducer = userProducer;
        this.notificationClient = notificationClient;
        this.redisService = redisService;
    }

    @Override
    public AuthResponseDTO signup(ClientSignupRequestDto data) {
        if (!isOfLegalAge(data.dateOfBirth())) throw new UserNotOfLegalAgeException();

        String key = tokenService.validateToken(data.token());
        if (!Objects.equals(key, "")) {
            if (key.contains("@")) {
                String userEmail = key;
                if (emailAlreadyInUse(userEmail)) throw new EmailAlreadyInUseException();

                User newUser = new User();

                newUser.setAccountId(data.firstName() + '#' + generateAccountId(data.firstName()));
                newUser.setEmail(userEmail);
                newUser.setPhoneNumber(null);
                newUser.setPasswordHash(passwordEncoder.encode(data.password()));
                newUser.setAuthProvider(AuthProvider.LOCAL);
                newUser.setLastLogin(LocalDateTime.now());
                newUser.setActive(true);
                newUser.setVerified(false);
                newUser.setVerificationToken(null);
                newUser.setPasswordResetToken(null);

                newUser.setFirstName(data.firstName());
                newUser.setLastName(data.lastName());
                newUser.setCpf(data.cpf());
                newUser.setAccountType(Set.of(AccountType.CLIENT));
                newUser.setProfilePicture(null);
                newUser.setDateOfBirth(data.dateOfBirth());
                newUser.setGender(data.gender());
                newUser.setBio(null);

                newUser.setRole(AuthRole.COMMON_USER);
                newUser.setTwoFactorEnabled(false);

                newUser.setUpdatedAt(LocalDateTime.now());
                newUser.setCreatedAt(LocalDateTime.now());
                newUser.setDeletedAt(null);
                newUser.setLastPasswordChangeAt(LocalDateTime.now());

                User createdUser = this.userRepository.save(newUser);
                userProducer.sendUserCreated(new UserCreatedEventDTO(
                        createdUser.getFirstName(),
                        createdUser.getLastName(),
                        createdUser.getEmail(),
                        createdUser.getPhoneNumber(),
                        createdUser.getDateOfBirth()
                ));

                String token = tokenService.generateToken(createdUser);
                return new AuthResponseDTO(token);
            } else {
                BigInteger userPhoneNumber = new BigInteger(key);
                if (phoneNumberAlreadyInUse(userPhoneNumber))
                    throw new PhoneAlreadyInUseException();

                User newUser = new User();

                newUser.setAccountId(data.firstName() + '#' + generateAccountId(data.firstName()));
                newUser.setPhoneNumber(userPhoneNumber);
                newUser.setEmail(null);
                newUser.setPasswordHash(passwordEncoder.encode(data.password()));
                newUser.setAuthProvider(AuthProvider.LOCAL);
                newUser.setLastLogin(LocalDateTime.now());
                newUser.setActive(true);
                newUser.setVerified(false);
                newUser.setVerificationToken(null);
                newUser.setPasswordResetToken(null);

                newUser.setFirstName(data.firstName());
                newUser.setLastName(data.lastName());
                newUser.setCpf(data.cpf());
                newUser.setAccountType(Set.of(AccountType.CLIENT));
                newUser.setProfilePicture(null);
                newUser.setDateOfBirth(data.dateOfBirth());
                newUser.setGender(data.gender());
                newUser.setBio(null);

                newUser.setRole(AuthRole.COMMON_USER);
                newUser.setTwoFactorEnabled(false);

                newUser.setUpdatedAt(LocalDateTime.now());
                newUser.setCreatedAt(LocalDateTime.now());
                newUser.setDeletedAt(null);
                newUser.setLastPasswordChangeAt(LocalDateTime.now());

                User createdUser = this.userRepository.save(newUser);
                userProducer.sendUserCreated(new UserCreatedEventDTO(
                        createdUser.getFirstName(),
                        createdUser.getLastName(),
                        createdUser.getEmail(),
                        createdUser.getPhoneNumber(),
                        createdUser.getDateOfBirth()
                ));

                String token = tokenService.generateToken(createdUser);
                return new AuthResponseDTO(token);
            }
        } else {
            throw new IllegalArgumentException("Invalid token.");
        }

    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO loginRequestDto) {
        System.out.println(loginRequestDto);
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequestDto.login(), loginRequestDto.password());
            System.out.printf(usernamePassword.toString());

            var auth = this.authenticationManager.authenticate(usernamePassword);
            System.out.printf(auth.toString());

            User user = findUserByLogin(auth.getName());
            System.out.println(user.toString());

            var token = tokenService.generateToken(user);

            System.out.println(token);
            return new AuthResponseDTO(token);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid login or password");
        }
    }

    @Override
    public void sendOtp(SendOtpRequestDto sendOtpRequestDto) {
        if (sendOtpRequestDto.channel() == OtpChannelType.EMAIL) {
            if (sendOtpRequestDto.email() != null) {
                int otpCode = generateRandomCode();
                String email = sendOtpRequestDto.email();
                this.notificationClient.sendEmail(new SendOtpNotificationRequestDto(email, otpCode));
                redisService.saveValue(email, String.valueOf(otpCode), 10, TimeUnit.MINUTES);
            } else {
                throw new IllegalArgumentException("Email is required.");
            }

        } else if (sendOtpRequestDto.channel() == OtpChannelType.WHATSAPP) {
            if (sendOtpRequestDto.phoneNumber() != null) {
                int otpCode = generateRandomCode();
                String phone = String.valueOf(sendOtpRequestDto.phoneNumber());
                this.notificationClient.sendWhatsapp(new SendOtpNotificationRequestDto(phone, otpCode));
                redisService.saveValue(phone, String.valueOf(otpCode), 10, TimeUnit.MINUTES);
            } else {
                throw new IllegalArgumentException("Phone number is required.");
            }

        } else {
            throw new IllegalArgumentException("Invalid OTP channel. OTP channel must be EMAIL, SMS, or WHATSAPP");
        }
    }

    @Override
    public AuthResponseDTO verifyOtp(VerifyOtpRequestDTO verifyOtpRequestDTO) {
        validateOtp(verifyOtpRequestDTO);
        redisService.deleteValue(verifyOtpRequestDTO.key());
        return new AuthResponseDTO(tokenService.generateSignupVerificationToken(verifyOtpRequestDTO.key()));
    }

    @Override
    public void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDto) {
        String email = tokenService.validateToken(resetPasswordRequestDto.token());

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email: " + email + " not found."));

        user.setPasswordHash(passwordEncoder.encode(resetPasswordRequestDto.newPassword()));
        userRepository.save(user);
    }

    private int generateRandomCode() {
        return ThreadLocalRandom.current().nextInt(100000, 999999);
    }

    private Boolean emailAlreadyInUse(String email) {
        return this.userRepository.findByEmail(email).isPresent();
    }

    private Boolean phoneNumberAlreadyInUse(BigInteger phoneNumber) {
        return this.userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }

    private boolean isOfLegalAge(LocalDate birthDate) {
        LocalDate currentDate = LocalDate.now();
        int age = Period.between(birthDate, currentDate).getYears();
        return age >= LEGAL_AGE;
    }

    private String generateAccountId(String firstName) {
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        String month = String.format("%02d", now.getMonthValue());
        String day = String.format("%02d", now.getDayOfMonth());
        String millis = String.format("%03d", now.getNano() / 1_000_000);
        String year = String.valueOf(now.getYear()).substring(2);

        return firstName + "#" + month + day + millis + year;
    }

    private User findUserByLogin(String login) {
        if (login.contains("@")) {
            return userRepository.findByEmail(login)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + login));
        } else {
            return userRepository.findByPhoneNumber(BigInteger.valueOf(Long.parseLong(login)))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with phone: " + login));
        }
    }

    private void sendOtpTo(String destination, OtpChannelType channel) {
        int otp = generateRandomCode();
        if (channel == OtpChannelType.EMAIL) {
            notificationClient.sendEmail(new SendOtpNotificationRequestDto(destination, otp));
        } else if (channel == OtpChannelType.WHATSAPP) {
            notificationClient.sendWhatsapp(new SendOtpNotificationRequestDto(destination, otp));
        }
        redisService.saveValue(destination, String.valueOf(otp), 10, TimeUnit.MINUTES);
    }

    private void validateOtp(VerifyOtpRequestDTO verifyOtpRequestDTO) {
        String expectedCode = redisService.getValue(verifyOtpRequestDTO.key());
        if (!Objects.equals(expectedCode, verifyOtpRequestDTO.code())) {
            throw new InvalidOtpException();
        }
    }
}
