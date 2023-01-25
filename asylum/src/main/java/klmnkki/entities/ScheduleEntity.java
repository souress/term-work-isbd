package klmnkki.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "schedule", schema = "public")
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "schedule_id_seq")
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private ArtistEntity artist;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private RoomEntity room;

    @Column(name = "price", columnDefinition = "INT NOT NULL CHECK ('price' >= 0)")
    private Integer price;

    @Column(name = "begin_datetime")
    private Timestamp beginDatetime;

    @Column(name = "duration", columnDefinition = "INT NOT NULL CHECK ('duration' >= 0)")
    private Integer duration;

    @ManyToMany(mappedBy = "schedules")
    private List<PersonEntity> persons;
}
