package com.chamaai.userservice.entity;

import com.chamaai.userservice.enums.AccountType;
import com.chamaai.userservice.enums.AuthProvider;
import com.chamaai.userservice.enums.AuthRole;
import com.chamaai.userservice.enums.Gender;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tb_users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String accountId;
    private String email;
    private String cpf;
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
    private LocalDateTime lastLogin;
    private boolean isActive;
    private boolean isVerified;
    private String verificationToken;
    private String passwordResetToken;
    private LocalDateTime passwordResetTokenExpiryAt;

    private String firstName;
    private String lastName;
    @ElementCollection(targetClass = AccountType.class)
    @CollectionTable(
            name = "user_account_types",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "account_type")
    @Enumerated(EnumType.STRING)
    private Set<AccountType> accountType;
    private BigInteger phoneNumber;
    private String profilePicture;
    private LocalDate dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String bio;

    @Enumerated(EnumType.STRING)
    private AuthRole role;
    private boolean twoFactorEnabled;

    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;
    private LocalDateTime lastPasswordChangeAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == AuthRole.ADMIN)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isActive;
    }

    public User() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public LocalDateTime getPasswordResetTokenExpiryAt() {
        return passwordResetTokenExpiryAt;
    }

    public void setPasswordResetTokenExpiryAt(LocalDateTime passwordResetTokenExpiryAt) {
        this.passwordResetTokenExpiryAt = passwordResetTokenExpiryAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<AccountType> getAccountType() {
        return accountType;
    }

    public void setAccountType(Set<AccountType> accountType) {
        this.accountType = accountType;
    }

    public BigInteger getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(BigInteger phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public AuthRole getRole() {
        return role;
    }

    public void setRole(AuthRole role) {
        this.role = role;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }

    public void setTwoFactorEnabled(boolean twoFactorEnabled) {
        this.twoFactorEnabled = twoFactorEnabled;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public LocalDateTime getLastPasswordChangeAt() {
        return lastPasswordChangeAt;
    }

    public void setLastPasswordChangeAt(LocalDateTime lastPasswordChangeAt) {
        this.lastPasswordChangeAt = lastPasswordChangeAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", accountId='" + accountId + '\'' +
                ", email='" + email + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", authProvider=" + authProvider +
                ", lastLogin=" + lastLogin +
                ", isActive=" + isActive +
                ", isVerified=" + isVerified +
                ", verificationToken='" + verificationToken + '\'' +
                ", passwordResetToken='" + passwordResetToken + '\'' +
                ", passwordResetTokenExpiryAt=" + passwordResetTokenExpiryAt +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", accountType=" + accountType +
                ", phoneNumber=" + phoneNumber +
                ", profilePicture='" + profilePicture + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", gender=" + gender +
                ", bio='" + bio + '\'' +
                ", role=" + role +
                ", twoFactorEnabled=" + twoFactorEnabled +
                ", updatedAt=" + updatedAt +
                ", createdAt=" + createdAt +
                ", deletedAt=" + deletedAt +
                ", lastPasswordChangeAt=" + lastPasswordChangeAt +
                '}';
    }
}
