package dtos;


import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class UserInformationDto {
    private UUID userId;
    private String bio;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
    private String phoneNumber;
    private String email;
}
