package klmnkki.controllers;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import klmnkki.POJO.*;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.LinkedHashMap;

@RestController
@RequestMapping("api/logs")
public class LogController {
    private final Gson gson = new Gson();
    @Autowired
    private LogService logService;
    @Autowired
    private PersonService personService;
    @Autowired
    private DietService dietService;
    @Autowired
    private RoomService roomService;

    @GetMapping("")
    public ResponseEntity<?> getAllLogs() {
        return ResponseEntity.ok(gson.toJson(logService.getAllLogs()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(logService.getLogById(id)));
        } catch (LogNotFoundException e) {
            throw new ApiException(ApiErrorType.LOG_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addLog(@RequestBody Object logObj) throws ApiException {
        var logMap = (LinkedTreeMap) logObj;
        var dateTimeArrBegin = String.valueOf(logMap.get("begin")).split("T");
        var dateTimeArrEnd = String.valueOf(logMap.get("end")).split("T");
        var timestampBegin = String.format("%s %s:00", dateTimeArrBegin[0], dateTimeArrBegin[1]);
        var timestampEnd = String.format("%s %s:00", dateTimeArrEnd[0], dateTimeArrEnd[1]);
        try {
            var log = new Log(
                    Person.convertToPerson(personService.getPersonById(Integer.parseInt(String.valueOf(logMap.get("person"))))),
                    TreatmentProgram.convertToTreatmentProgram(dietService.getTreatmentProgramById(Integer.parseInt(String.valueOf(logMap.get("treatment"))))),
                    Room.convertToRoom(roomService.getRoomById(Integer.parseInt(String.valueOf(logMap.get("room"))))),
                    Timestamp.valueOf(timestampBegin),
                    Timestamp.valueOf(timestampEnd)
            );
            logService.addLog(log);
        } catch (RoomNotFoundException e) {
            throw new ApiException(ApiErrorType.ROOM_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (TreatmentProgramNotFoundException e) {
            throw new ApiException(ApiErrorType.TREATMENT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateLog(@RequestBody Log log) {
        logService.addLog(log);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLogById(@PathVariable Integer id) throws ApiException {
        try {
            logService.deleteLog(id);
            return ResponseEntity.ok("");
        } catch (LogNotFoundException e) {
            throw new ApiException(ApiErrorType.LOG_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<?> setLogType(@PathVariable Integer id, @RequestBody Log log) throws ApiException {
        try {
            logService.updateLog(id, log);
        } catch (LogNotFoundException e) {
            throw new ApiException(ApiErrorType.LOG_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

}
