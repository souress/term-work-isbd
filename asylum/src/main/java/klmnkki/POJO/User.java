package klmnkki.POJO;

import klmnkki.entities.ScheduleEntity;
import klmnkki.entities.UserEntity;
import klmnkki.entities.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {
    private Integer id;
    private String login;
    private String password;
    private UserRole role;

    private Person person;

    public User(String login, String password, UserRole role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public User(Integer id, String login, String password, UserRole role) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public static UserEntity convertToEntity(User user) {
        return new UserEntity(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                user.getRole(),
                Person.convertToEntity(user.getPerson())
                );
    }

    public static User convertToUser(UserEntity userEntity) {
        return new User(
                userEntity.getId(),
                userEntity.getLogin(),
                userEntity.getPassword(),
                userEntity.getRole(),
                Person.convertToPerson(userEntity.getPerson())
        );
    }
}
