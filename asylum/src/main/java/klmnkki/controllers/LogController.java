package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Log;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.LogNotFoundException;
import klmnkki.services.LogService;
import klmnkki.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/logs")
public class LogController {
    private final Gson gson = new Gson();
    
    @Autowired
    private LogService logService;

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
    public ResponseEntity<?> addLog(@RequestBody Log log) {
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
