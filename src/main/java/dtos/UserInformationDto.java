package dtos;

import enums.Status;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserInformationDto {
    private String bio;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
