package klmnkki.POJO;

import klmnkki.entities.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {
    private String login;
    private String password;
    private UserRole role;
}
