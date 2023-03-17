package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Room;
import klmnkki.entities.enums.RoomType;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.RoomNotFoundException;
import klmnkki.exceptionHandling.exceptions.RoomNotFoundException;
import klmnkki.services.RoomService;
import klmnkki.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final Gson gson = new Gson();

    @Autowired
    private RoomService roomService;

    @GetMapping("")
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(gson.toJson(roomService.getAllRooms()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(roomService.getRoomById(id)));
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addRoom(@RequestBody Room room) {
        roomService.addRoom(room);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable Integer id) throws ApiException {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.ok("");
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/type/{roomType}")
    public ResponseEntity<?> setRoomType(@PathVariable Integer id, @PathVariable RoomType roomType) throws ApiException {
        try {
            roomService.setRoomTypeById(id, roomType);
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }
}
