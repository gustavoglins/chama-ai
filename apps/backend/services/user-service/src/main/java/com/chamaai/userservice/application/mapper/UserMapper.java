package com.chamaai.userservice.application.mapper;

import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.domain.enums.AuthProvider;
import com.chamaai.userservice.domain.enums.AuthRole;
import com.chamaai.userservice.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    default User toDomain(CreateUserRequestDTO dto) {
        if (dto == null) return null;

        return new User.UserBuilder()
                .withEmail(dto.email())
                .withTaxId(dto.taxId())
                .withPasswordHash(dto.password()) // hash se necessário
                .withFirstName(dto.firstName())
                .withLastName(dto.lastName())
                .withDateOfBirth(dto.dateOfBirth())
                .withGender(dto.gender())
                .withPhoneNumber(dto.phoneNumber())
                .withProfilePicture(dto.profilePicture())
                .withBio(dto.bio())
                .withAccountType(dto.accountType() == null ? Set.of() : Set.of(dto.accountType()))
                .withAuthProvider(AuthProvider.LOCAL)
                .withRole(AuthRole.COMMON_USER)
                .withIsActive(true)
                .build();
    }

    UserResponseDTO toDTO(User user);
}
