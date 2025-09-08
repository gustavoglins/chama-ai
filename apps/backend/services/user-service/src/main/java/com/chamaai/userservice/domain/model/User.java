package com.chamaai.userservice.domain.model;

import com.chamaai.userservice.domain.enums.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class User {

    private UUID id;
    private String email;
    private String taxId;

    private String passwordHash;
    private AuthProvider authProvider;
    private LocalDateTime lastLogin;
    private boolean isActive;
    private String verificationToken;
    private String passwordResetToken;
    private LocalDateTime passwordResetTokenExpiryAt;
    private LocalDateTime lastPasswordChangeAt;
    private boolean twoFactorEnabled;
    private CommunicationChannel preferredCommunicationChannel;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profilePicture;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String bio;
    private Set<AccountType> accountType;

    private AuthRole role;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    private User() {
    }

    private User(UserBuilder builder) {
        this.id = UUID.randomUUID();
        this.email = builder.email;
        this.taxId = builder.taxId;
        this.passwordHash = builder.passwordHash;
        this.authProvider = builder.authProvider;
        this.lastLogin = builder.lastLogin;
        this.isActive = builder.isActive;
        this.verificationToken = builder.verificationToken;
        this.passwordResetToken = builder.passwordResetToken;
        this.passwordResetTokenExpiryAt = builder.passwordResetTokenExpiryAt;
        this.lastPasswordChangeAt = builder.lastPasswordChangeAt;
        this.twoFactorEnabled = builder.twoFactorEnabled;
        this.preferredCommunicationChannel = builder.preferredCommunicationChannel;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.phoneNumber = builder.phoneNumber;
        this.profilePicture = builder.profilePicture;
        this.dateOfBirth = builder.dateOfBirth;
        this.gender = builder.gender;
        this.bio = builder.bio;
        this.accountType = builder.accountType;
        this.role = builder.role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getTaxId() {
        return taxId;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public LocalDateTime getPasswordResetTokenExpiryAt() {
        return passwordResetTokenExpiryAt;
    }

    public LocalDateTime getLastPasswordChangeAt() {
        return lastPasswordChangeAt;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }

    public CommunicationChannel getPreferredCommunicationChannel() {
        return preferredCommunicationChannel;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public String getBio() {
        return bio;
    }

    public Set<AccountType> getAccountType() {
        return accountType;
    }

    public AuthRole getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void updatedEmail(String newEmail) {
        this.email = newEmail;
        this.updatedAt = LocalDateTime.now();
    }

    public void updatedPhoneNumber(String newPhoneNumber) {
        this.phoneNumber = newPhoneNumber;
    }

    public void updatedPassword(String newPasswordHash) {
        this.passwordHash = newPasswordHash;
        this.lastPasswordChangeAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void markDeleted() {
        this.deletedAt = LocalDateTime.now();
        this.isActive = false;
        this.updatedAt = LocalDateTime.now();
    }

    public static class UserBuilder {
        private UUID id;
        private String email;
        private String taxId;

        private String passwordHash;
        private AuthProvider authProvider;
        private LocalDateTime lastLogin;
        private boolean isActive;
        private String verificationToken;
        private String passwordResetToken;
        private LocalDateTime passwordResetTokenExpiryAt;
        private LocalDateTime lastPasswordChangeAt;
        private boolean twoFactorEnabled;
        private CommunicationChannel preferredCommunicationChannel;

        private String firstName;
        private String lastName;
        private String phoneNumber;
        private String profilePicture;
        private LocalDate dateOfBirth;
        private Gender gender;
        private String bio;
        private Set<AccountType> accountType;

        private AuthRole role;

        public UserBuilder withAuthProvider(AuthProvider authProvider) {
            this.authProvider = authProvider;
            return this;
        }

        public UserBuilder withAccountType(Set<AccountType> accountType) {
            this.accountType = accountType;
            return this;
        }

        public UserBuilder withRole(AuthRole role) {
            this.role = role;
            return this;
        }

        public UserBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder withPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserBuilder withTaxId(String taxId) {
            this.taxId = taxId;
            return this;
        }

        public UserBuilder withPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public UserBuilder withFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserBuilder withLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserBuilder withProfilePicture(String profilePicture) {
            this.profilePicture = profilePicture;
            return this;
        }

        public UserBuilder withDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public UserBuilder withGender(Gender gender) {
            this.gender = gender;
            return this;
        }

        public UserBuilder withBio(String bio) {
            this.bio = bio;
            return this;
        }

        public UserBuilder withLastLogin(LocalDateTime lastLogin) {
            this.lastLogin = lastLogin;
            return this;
        }

        public UserBuilder withIsActive(boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public UserBuilder withTwoFactorEnabled(boolean twoFactorEnabled) {
            this.twoFactorEnabled = twoFactorEnabled;
            return this;
        }

        public UserBuilder withPreferredCommunicationChannel(CommunicationChannel channel) {
            this.preferredCommunicationChannel = channel;
            return this;
        }

        public UserBuilder withVerificationToken(String verificationToken) {
            this.verificationToken = verificationToken;
            return this;
        }

        public UserBuilder withPasswordResetToken(String passwordResetToken) {
            this.passwordResetToken = passwordResetToken;
            return this;
        }

        public UserBuilder withPasswordResetTokenExpiryAt(LocalDateTime expiry) {
            this.passwordResetTokenExpiryAt = expiry;
            return this;
        }

        public UserBuilder withLastPasswordChangeAt(LocalDateTime lastPasswordChangeAt) {
            this.lastPasswordChangeAt = lastPasswordChangeAt;
            return this;
        }

        public User build() {
            if (authProvider == null) throw new IllegalArgumentException("AuthProvider cannot be null");
            if (accountType == null || accountType.isEmpty())
                throw new IllegalArgumentException("AccountType cannot be null");
            if (role == null) throw new IllegalArgumentException("Role cannot be null");
            if (email == null) throw new IllegalArgumentException("Email cannot be null");
            if (taxId == null) throw new IllegalArgumentException("Tax ID cannot be null");
            if (authProvider == AuthProvider.LOCAL && passwordHash == null)
                throw new IllegalArgumentException("Password cannot be null when using LOCAL auth provider");
            return new User(this);
        }
    }
}