package klmnkki.services;

import klmnkki.POJO.Room;
import klmnkki.entities.RoomEntity;
import klmnkki.entities.enums.RoomType;
import klmnkki.exceptionHandling.exceptions.RoomNotFoundException;
import klmnkki.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public void addOrUpdateRoom(Room room) {
        roomRepository.save(Room.convertToEntity(room));
    }

    public void addRoomList(List<Room> roomList) {
        roomList.stream().map(Room::convertToEntity).forEach(roomRepository::save);
    }

    public ArrayList<Room> getAllRooms() {
        var roomEntities = roomRepository.findAll();
        var roomList = new ArrayList<Room>();
        roomEntities
                .stream()
                .map(Room::convertToRoom)
                .forEach(roomList::add);
        return roomList;
    }

    public RoomEntity getRoomById(Integer id) throws RoomNotFoundException {
        var entity = roomRepository.findById(id);
        return entity.orElseThrow(RoomNotFoundException::new);
    }

    public void deleteRoom(Integer id) throws RoomNotFoundException {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
        } else {
            throw new RoomNotFoundException();
        }
    }

    public void setRoomTypeById(Integer id, RoomType type) throws RoomNotFoundException {
        var room = roomRepository.findById(id).orElseThrow(RoomNotFoundException::new);
        room.setRoomType(type);
        roomRepository.save(room);
    }

    public RoomType[] getRoomTypes() {
        return RoomType.values();
    }
}
