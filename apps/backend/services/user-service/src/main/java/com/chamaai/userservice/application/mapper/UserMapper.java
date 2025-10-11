package com.chamaai.userservice.application.mapper;

import com.chamaai.userservice.application.commands.CompleteRegistrationCommand;
import com.chamaai.userservice.domain.enums.AuthProvider;
import com.chamaai.userservice.domain.enums.AuthRole;
import com.chamaai.userservice.domain.enums.CommunicationChannel;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    default User toDomain(CompleteRegistrationCommand dto) {
        if (dto == null) return null;

        return new User.UserBuilder()
                .withEmail(dto.email())
                .withTaxId(dto.taxId())
                .withPasswordHash(dto.password()) // hash se necessário
                .withFirstName(dto.firstName())
                .withLastName(dto.lastName())
                .withDateOfBirth(dto.dateOfBirth())
                .withGender(dto.gender())
                .withAccountType(dto.accountType() == null ? Set.of() : Set.of(dto.accountType()))
                .withAuthProvider(AuthProvider.LOCAL)
                .withRole(AuthRole.COMMON_USER)
                .withIsActive(true)
                .withTwoFactorEnabled(false)
                .withPreferredCommunicationChannel(CommunicationChannel.EMAIL)
                .withLastLogin(LocalDateTime.now())
                .build();
    }

    UserResponseDTO toDTO(User user);
}
