package com.chamaai.userservice.infrastructure.persistence.mapper;

import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.infrastructure.persistence.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface UserEntityMapper {

    UserEntityMapper INSTANCE = Mappers.getMapper(UserEntityMapper.class);

    default User toDomain(UserEntity entity) {
        if (entity == null) return null;

        return new User.UserBuilder()
                .withId(entity.getId())
                .withEmail(entity.getEmail())
                .withTaxId(entity.getTaxId())
                .withPasswordHash(entity.getPasswordHash())
                .withAuthProvider(entity.getAuthProvider())
                .withLastLogin(entity.getLastLogin())
                .withIsActive(entity.isActive())
                .withVerificationToken(entity.getVerificationToken())
                .withPasswordResetToken(entity.getPasswordResetToken())
                .withPasswordResetTokenExpiryAt(entity.getPasswordResetTokenExpiryAt())
                .withLastPasswordChangeAt(entity.getLastPasswordChangeAt())
                .withTwoFactorEnabled(entity.isTwoFactorEnabled())
                .withPreferredCommunicationChannel(entity.getPreferredCommunicationChannel())
                .withFirstName(entity.getFirstName())
                .withLastName(entity.getLastName())
                .withPhoneNumber(entity.getPhoneNumber())
                .withProfilePicture(entity.getProfilePicture())
                .withDateOfBirth(entity.getDateOfBirth())
                .withGender(entity.getGender())
                .withBio(entity.getBio())
                .withAccountType(entity.getAccountType())
                .withRole(entity.getRole())
                .withCreatedAt(entity.getCreatedAt())
                .withUpdatedAt(entity.getUpdatedAt())
                .withDeletedAt(entity.getDeletedAt())
                .build();
    }

    UserEntity toEntity(User domain);
}
