package klmnkki.POJO;

import klmnkki.entities.ArtistEntity;
import klmnkki.entities.PersonEntity;
import klmnkki.entities.RoomEntity;
import klmnkki.entities.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Schedule {
    private Integer id;
    private ArtistEntity artist;
    private RoomEntity room;
    private Integer price;
    private Timestamp beginDatetime;
    private Integer duration;
    private List<PersonEntity> persons;

    public Schedule(ArtistEntity artist, RoomEntity room, Integer price, Timestamp beginDatetime, Integer duration, List<PersonEntity> persons) {
        this.artist = artist;
        this.room = room;
        this.price = price;
        this.beginDatetime = beginDatetime;
        this.duration = duration;
        this.persons = persons == null ? new ArrayList<>() : persons;
    }

    public static ScheduleEntity convertToEntity(Schedule schedule) {
        return new ScheduleEntity(
                schedule.getId(),
                schedule.getArtist(),
                schedule.getRoom(),
                schedule.getPrice(),
                schedule.getBeginDatetime(),
                schedule.getDuration(),
                schedule.getPersons());
    }

    public static Schedule convertToSchedule(ScheduleEntity scheduleEntity) {
        return new Schedule(
                scheduleEntity.getId(),
                scheduleEntity.getArtist(),
                scheduleEntity.getRoom(),
                scheduleEntity.getPrice(),
                scheduleEntity.getBeginDatetime(),
                scheduleEntity.getDuration(),
                scheduleEntity.getPersons());
    }
}
