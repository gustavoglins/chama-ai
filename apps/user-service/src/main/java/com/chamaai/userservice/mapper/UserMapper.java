package com.chamaai.userservice.mapper;

import com.chamaai.userservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

//    @Mapping(target = "passwordHash", source = "password")
//    @Mapping(target = "dateOfBirth", expression = "java(userDto.dateOfBirth().atStartOfDay())")
//    @Mapping(target = "accountType", expression = "java(java.util.Set.of(userDto.accountType()))")
//    @Mapping(target = "active", constant = "true")
//    @Mapping(target = "verified", constant = "false")
//    @Mapping(target = "authProvider", constant = "LOCAL")
//    User toEntity(UserSignupRequestDto userDto);

    Object toDto(User user);
}

