package klmnkki.services;

import klmnkki.POJO.Log;
import klmnkki.entities.LogEntity;
import klmnkki.exceptionHandling.exceptions.LogNotFoundException;
import klmnkki.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public void addLog(Log log) {
        logRepository.save(Log.convertToEntity(log));
    }

    public void addLogList(List<Log> logList) {
        logList.stream().map(Log::convertToEntity).forEach(logRepository::save);
    }

    public List<Log> getAllLogs() {
        var logEntities = logRepository.findAll();
        var logList = new ArrayList<Log>();
        logEntities.stream().map(Log::convertToLog).forEach(logList::add);
        return logList;
    }

    public LogEntity getLogById(Integer id) throws LogNotFoundException {
        var entity = logRepository.findById(id);
        return entity.orElseThrow(LogNotFoundException::new);
    }

    public void deleteLog(Integer id) throws LogNotFoundException {
        if (logRepository.existsById(id)) {
            logRepository.deleteById(id);
        } else {
            throw new LogNotFoundException();
        }
    }

    public void updateLog(Integer id, Log log) throws LogNotFoundException {
        var logEntity = logRepository.findById(id).orElseThrow(LogNotFoundException::new);
        var temp = Log.convertToEntity(log);
        logEntity.setPerson(temp.getPerson());
        logEntity.setTreatmentProgram(temp.getTreatmentProgram());
        logEntity.setRoom(temp.getRoom());
        logEntity.setTreatmentBeginDate(temp.getTreatmentBeginDate());
        logEntity.setTreatmentEndDate(temp.getTreatmentEndDate());
        logRepository.save(logEntity);
    }
}
