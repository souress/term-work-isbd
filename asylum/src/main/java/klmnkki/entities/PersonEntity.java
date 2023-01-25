package klmnkki.entities;

import klmnkki.entities.enums.PersonRole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
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
    private List<ScheduleEntity> schedules;
}
