package klmnkki.entities;

import klmnkki.entities.enums.PersonRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person", schema = "public")
public class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "person_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private PersonRole role;

    @Column(name = "balance", columnDefinition = "INT NOT NULL CHECK ('balance' >= 0)")
    private Integer balance;

    @ManyToMany
    @JoinTable(name = "personal_schedule",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "schedule_id"))
    private List<ScheduleEntity> schedules;

    public PersonEntity(String fullName, PersonRole role, Integer balance, List<ScheduleEntity> schedules) {
        this.fullName = fullName;
        this.role = role;
        this.balance = balance;
        this.schedules = schedules;
    }
}
