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
    private Artist artist;
    private Room room;
    private Integer price;
    private Timestamp beginDatetime;
    private Integer duration;

    public Schedule(Artist artist, Room room, Integer price, Timestamp beginDatetime, Integer duration) {
        this.artist = artist;
        this.room = room;
        this.price = price;
        this.beginDatetime = beginDatetime;
        this.duration = duration;
    }

    public static ScheduleEntity convertToEntity(Schedule schedule) {
        return new ScheduleEntity(
                schedule.getId(),
                Artist.convertToEntity(schedule.getArtist()),
                Room.convertToEntity(schedule.getRoom()),
                schedule.getPrice(),
                schedule.getBeginDatetime(),
                schedule.getDuration());
    }

    public static Schedule convertToSchedule(ScheduleEntity scheduleEntity) {
        return new Schedule(
                scheduleEntity.getId(),
                Artist.convertToArtist(scheduleEntity.getArtist()),
                Room.convertToRoom(scheduleEntity.getRoom()),
                scheduleEntity.getPrice(),
                scheduleEntity.getBeginDatetime(),
                scheduleEntity.getDuration());
    }
}
