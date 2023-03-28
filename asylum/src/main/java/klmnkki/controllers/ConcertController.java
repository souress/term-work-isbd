package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Artist;
import klmnkki.POJO.Label;
import klmnkki.POJO.Room;
import klmnkki.POJO.Schedule;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.services.LabelArtistService;
import klmnkki.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.LinkedHashMap;

@RestController
@RequestMapping("/api/concert")
public class ConcertController {
    private final Gson gson = new Gson();

    @Autowired
    private LabelArtistService labelArtistService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/labels")
    public ResponseEntity<?> getAllLabels() {
        return ResponseEntity.ok(gson.toJson(labelArtistService.getAllLabels()));
    }

    @GetMapping("/labels/{id}")
    public ResponseEntity<?> getLabelById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(labelArtistService.getLabelById(id)));
        } catch (LabelNotFoundException e) {
            throw new ApiException(ApiErrorType.LABEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/labels")
    public ResponseEntity<?> addLabel(@RequestBody Label label) {
        labelArtistService.addLabel(label);
        return ResponseEntity.ok("");
    }

    @PostMapping("/labels/update")
    public ResponseEntity<?> updateLabel(@RequestBody Label label) {
        labelArtistService.updateLabel(label);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/labels/{id}")
    public ResponseEntity<?> deleteLabelById(@PathVariable Integer id) throws ApiException {
        try {
            labelArtistService.deleteLabel(id);
            return ResponseEntity.ok("");
        } catch (LabelNotFoundException e) {
            throw new ApiException(ApiErrorType.LABEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/labels/{labelId}/artist/{artistId}")
    public ResponseEntity<?> addArtistToLabelById(@PathVariable Integer labelId, @PathVariable Integer artistId) throws ApiException {
        try {
            labelArtistService.addArtistToLabelById(labelId, artistId);
            return ResponseEntity.ok("");
        } catch (LabelNotFoundException e) {
            throw new ApiException(ApiErrorType.LABEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/labels/{labelId}/artist")
    public ResponseEntity<?> addArtistToLabel(@PathVariable Integer labelId, @RequestBody Artist artist) throws ApiException {
        try {
            labelArtistService.addArtistToLabel(labelId, artist);
            return ResponseEntity.ok("");
        } catch (LabelNotFoundException e) {
            throw new ApiException(ApiErrorType.LABEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/artists")
    public ResponseEntity<?> getAllArtists() {
        return ResponseEntity.ok(gson.toJson(labelArtistService.getAllArtists()));
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(labelArtistService.getArtistById(id)));
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/artists")
    public ResponseEntity<?> addArtist(@RequestBody Artist artist) throws ApiException {
        try {
            labelArtistService.addArtist(artist);
        } catch (LabelNotFoundException e) {
            throw new ApiException(ApiErrorType.LABEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/artists/update")
    public ResponseEntity<?> updateArtist(@RequestBody Artist artist) throws ApiException {
        labelArtistService.updateArtist(artist);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/artists/{id}")
    public ResponseEntity<?> deleteArtistById(@PathVariable Integer id) throws ApiException {
        try {
            labelArtistService.deleteArtist(id);
            return ResponseEntity.ok("");
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/schedules")
    public ResponseEntity<?> getAllSchedules() {
        return ResponseEntity.ok(gson.toJson(labelArtistService.getAllSchedules()));
    }

    @GetMapping("/schedules/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(labelArtistService.getScheduleById(id)));
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/byIds")
    public ResponseEntity<?> getSchedulesByIds(@RequestBody Collection<Integer> id) {
        return ResponseEntity.ok(gson.toJson(labelArtistService.getSchedulesByIds(id)));
    }

    @PostMapping("/schedules")
    public ResponseEntity<?> addSchedule(@RequestBody Object scheduleObj) throws ApiException {
        var scheduleMap = (LinkedHashMap) scheduleObj;
        var dateTimeArr = String.valueOf(scheduleMap.get("begin")).split("T");
        var timestamp = String.format("%s %s:00", dateTimeArr[0], dateTimeArr[1]);
        try {
            var schedule = new Schedule(
                    Artist.convertToArtist(labelArtistService.getArtistById(Integer.parseInt(String.valueOf(scheduleMap.get("artist"))))),
                    Room.convertToRoom(roomService.getRoomById(Integer.parseInt(String.valueOf(scheduleMap.get("place"))))),
                    Integer.parseInt(String.valueOf(scheduleMap.get("price"))),
                    Timestamp.valueOf(timestamp),
                    Integer.parseInt(String.valueOf(scheduleMap.get("duration")))
            );
            labelArtistService.addOrUpdateSchedule(schedule);
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/schedules/update")
    public ResponseEntity<?> updateSchedule(@RequestBody Object scheduleObj) throws ApiException {
        var scheduleMap = (LinkedHashMap) scheduleObj;
        var dateTimeArr = String.valueOf(scheduleMap.get("begin")).split("T");
        var timestamp = String.format("%s %s:00", dateTimeArr[0], dateTimeArr[1]);
        try {
            var schedule = new Schedule(
                    Integer.parseInt(String.valueOf(scheduleMap.get("id"))),
                    Artist.convertToArtist(labelArtistService.getArtistById(Integer.parseInt(String.valueOf(scheduleMap.get("artist"))))),
                    Room.convertToRoom(roomService.getRoomById(Integer.parseInt(String.valueOf(scheduleMap.get("place"))))),
                    Integer.parseInt(String.valueOf(scheduleMap.get("price"))),
                    Timestamp.valueOf(timestamp),
                    Integer.parseInt(String.valueOf(scheduleMap.get("duration")))
            );
            labelArtistService.addOrUpdateSchedule(schedule);
        } catch (ArtistNotFoundException e) {
            throw new ApiException(ApiErrorType.ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<?> deleteScheduleById(@PathVariable Integer id) throws ApiException {
        try {
            labelArtistService.deleteSchedule(id);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/{scheduleId}/sign/{personId}")
    public ResponseEntity<?> signPersonToSchedule(@PathVariable Integer scheduleId, @PathVariable Integer personId) throws ApiException {
        try {
            labelArtistService.addPersonToSchedule(personId, scheduleId);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/{scheduleId}/remove/{personId}")
    public ResponseEntity<?> removePersonFromSchedule(@PathVariable Integer scheduleId, @PathVariable Integer personId) throws ApiException {
        try {
            labelArtistService.removePersonFromSchedule(personId, scheduleId);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/{scheduleId}/buyTicket/{personId}")
    public ResponseEntity<?> buyTicket(@PathVariable Integer scheduleId, @PathVariable Integer personId) throws ApiException {
        try {
            labelArtistService.buyTicket(personId, scheduleId);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (NotEnoughCreditsException e) {
            throw new ApiException(ApiErrorType.TOO_LOW_PERSON_BALANCE, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/{scheduleId}/room/{roomId}")
    public ResponseEntity<?> addRoomToScheduleById(@PathVariable Integer scheduleId, @PathVariable Integer roomId) throws ApiException {
        try {
            labelArtistService.setScheduleRoomById(scheduleId, roomId);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedules/{scheduleId}/room")
    public ResponseEntity<?> addRoomToSchedule(@PathVariable Integer scheduleId, @RequestBody Room room) throws ApiException {
        try {
            labelArtistService.setScheduleRoom(scheduleId, room);
            return ResponseEntity.ok("");
        } catch (ScheduleNotFoundException e) {
            throw new ApiException(ApiErrorType.SCHEDULE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
}
