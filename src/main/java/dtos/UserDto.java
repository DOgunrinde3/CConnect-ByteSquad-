package dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Optional;
import java.util.UUID;

@Data
@Accessors(chain = true)
public class UserDto {
    private UUID userId;
    private String username;
    private String password;
    private Boolean isAdmin;
    private Integer companyCode;
    private Optional<UserInformationDto> userInformationDto;

}
