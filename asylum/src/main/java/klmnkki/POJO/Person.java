package klmnkki.POJO;

import klmnkki.entities.PersonEntity;
import klmnkki.entities.ScheduleEntity;
import klmnkki.entities.enums.PersonRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    private Integer id;
    private String fullName;
    private PersonRole role;
    private Integer balance;
    private List<ScheduleEntity> schedules;

    public static PersonEntity convertToEntity(Person person) {
        return new PersonEntity(
                person.getId(),
                person.getFullName(),
                person.getRole(),
                person.getBalance(),
                person.getSchedules());
    }

    public static Person convertToPerson(PersonEntity personEntity) {
        return new Person(
                personEntity.getId(),
                personEntity.getFullName(),
                personEntity.getRole(),
                personEntity.getBalance(),
                personEntity.getSchedules());
    }
}
