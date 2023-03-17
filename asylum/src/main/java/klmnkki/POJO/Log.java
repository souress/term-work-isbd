package klmnkki.POJO;

import klmnkki.entities.LogEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    private Integer id;
    private Person person;
    private TreatmentProgram treatmentProgram;
    private Room room;
    private Timestamp treatmentBeginDate;
    private Timestamp treatmentEndDate;

    public Log(Person person, TreatmentProgram treatmentProgram, Room room, Timestamp treatmentBeginDate, Timestamp treatmentEndDate) {
        this.person = person;
        this.treatmentProgram = treatmentProgram;
        this.room = room;
        this.treatmentBeginDate = treatmentBeginDate;
        this.treatmentEndDate = treatmentEndDate;
    }

    public static LogEntity convertToEntity(Log log) {
        return new LogEntity(
                log.getId(),
                Person.convertToEntity(log.getPerson()),
                TreatmentProgram.convertToEntity(log.getTreatmentProgram()),
                Room.convertToEntity(log.getRoom()),
                log.getTreatmentBeginDate(),
                log.getTreatmentEndDate());
    }

    public static Log convertToLog(LogEntity logEntity) {
        return new Log(
                logEntity.getId(),
                Person.convertToPerson(logEntity.getPerson()),
                TreatmentProgram.convertToTreatmentProgram(logEntity.getTreatmentProgram()),
                Room.convertToRoom(logEntity.getRoom()),
                logEntity.getTreatmentBeginDate(),
                logEntity.getTreatmentEndDate());
    }
}
