package klmnkki.POJO;

import klmnkki.entities.RoomEntity;
import klmnkki.entities.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    private Integer id;
    private RoomType roomType;

    public Room(RoomType roomType) {
        this.roomType = roomType;
    }

    public static RoomEntity convertToEntity(Room room) {
        return new RoomEntity(
                room.getId(),
                room.getRoomType());
    }

    public static Room convertToRoom(RoomEntity roomEntity) {
        return new Room(
                roomEntity.getId(),
                roomEntity.getRoomType());
    }
}
