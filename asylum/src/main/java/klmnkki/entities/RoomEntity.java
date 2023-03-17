package klmnkki.entities;

import klmnkki.entities.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room", schema = "public")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "room_id_seq")
    @Column(name = "id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    private RoomType roomType;
}
