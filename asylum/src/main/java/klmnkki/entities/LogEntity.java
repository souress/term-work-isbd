package klmnkki.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "log", schema = "public")
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "log_id_seq")
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private PersonEntity person;

    @ManyToOne
    @JoinColumn(name = "treatment_program_id", nullable = false)
    private TreatmentProgramEntity treatmentProgram;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private RoomEntity room;

    @Column(name = "treatment_begin_date")
    private Timestamp treatmentBeginDate;

    @Column(name = "treatment_end_date")
    private Timestamp treatmentEndDate;
}
