package com.chamaai.userservice.service;

import com.chamaai.userservice.dto.events.UserCreatedEventDTO;
import com.chamaai.userservice.dto.requests.LoginRequestDTO;
import com.chamaai.userservice.dto.requests.ResetPasswordRequestDTO;
import com.chamaai.userservice.dto.requests.SignupRequestDTO;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;
import com.chamaai.userservice.entity.User;
import com.chamaai.userservice.enums.AuthProvider;
import com.chamaai.userservice.enums.AuthRole;
import com.chamaai.userservice.kafka.UserProducer;
import com.chamaai.userservice.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private static final int LEGAL_AGE = 18;

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserProducer userProducer;

    public AuthServiceImpl(UserRepository userRepository, TokenService tokenService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserProducer userProducer) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userProducer = userProducer;
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

    @Override
    public AuthResponseDTO signup(SignupRequestDTO signupRequestDto) {
        userRepository.deleteAll();
        if (!isOfLegalAge(signupRequestDto.dateOfBirth()))
            throw new IllegalArgumentException("User must be of legal age.");
        if (emailAlreadyInUse(signupRequestDto.email())) throw new IllegalArgumentException("Email already in use.");
        if (phoneNumberAlreadyInUse(signupRequestDto.phoneNumber()))
            throw new IllegalArgumentException("Phone number already in use.");

        User newUser = new User();

        newUser.setAccountId(signupRequestDto.firstName() + '#' + generateAccountId(signupRequestDto.firstName()));
        newUser.setEmail(signupRequestDto.email());
        newUser.setPasswordHash(passwordEncoder.encode(signupRequestDto.password()));
        newUser.setAuthProvider(AuthProvider.LOCAL);
        newUser.setLastLogin(LocalDateTime.now());
        newUser.setActive(true);
        newUser.setVerified(false);
        newUser.setVerificationToken(null);
        newUser.setPasswordResetToken(null);

        newUser.setFirstName(signupRequestDto.firstName());
        newUser.setLastName(signupRequestDto.lastName());
        newUser.setAccountType(Set.of(signupRequestDto.accountType()));
        newUser.setPhoneNumber(signupRequestDto.phoneNumber());
        newUser.setProfilePicture(null);
        newUser.setDateOfBirth(signupRequestDto.dateOfBirth());
        newUser.setGender(signupRequestDto.gender());
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

        String token = tokenService.generateResetPasswordToken(createdUser);
        return new AuthResponseDTO(token);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO loginRequestDto) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequestDto.email(), loginRequestDto.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var email = auth.getName();

            User user = this.userRepository.findByEmail(email).orElseThrow();
            var token = tokenService.generateToken(user);

            return new AuthResponseDTO(token);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @Override
    public void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDto) {
        String email = tokenService.validateToken(resetPasswordRequestDto.token());

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User with email: " + email + " not found."));
        if (user == null) throw new RuntimeException("User not found.");

        user.setPasswordHash(passwordEncoder.encode(resetPasswordRequestDto.newPassword()));
        userRepository.save(user);
    }
}
