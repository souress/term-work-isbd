package klmnkki.services;

import klmnkki.POJO.Artist;
import klmnkki.POJO.Label;
import klmnkki.POJO.Room;
import klmnkki.POJO.Schedule;
import klmnkki.entities.ArtistEntity;
import klmnkki.entities.LabelEntity;
import klmnkki.entities.ScheduleEntity;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LabelArtistService {
    @Autowired
    private LabelRepository labelRepository;
    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private PersonService personService;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private RoomRepository roomRepository;

    public void addLabel(Label label) {
        labelRepository.save(Label.convertToEntity(label));
    }

    public void addLabelList(List<Label> labelList) {
        labelList.stream().map(Label::convertToEntity).forEach(labelRepository::save);
    }

    public List<Label> getAllLabels() {
        var labelEntities = labelRepository.findAll();
        var labelList = new ArrayList<Label>();
        labelEntities.stream().map(Label::convertToLabel).forEach(labelList::add);
        return labelList;
    }

    public LabelEntity getLabelById(Integer id) throws LabelNotFoundException {
        var entity = labelRepository.findById(id);
        return entity.orElseThrow(LabelNotFoundException::new);
    }

    public void deleteLabel(Integer id) throws LabelNotFoundException {
        if (labelRepository.existsById(id)) {
            labelRepository.deleteById(id);
        } else {
            throw new LabelNotFoundException();
        }
    }

    public void addArtist(Artist artist) throws LabelNotFoundException {
        LabelEntity labelEntity;
        if (artist.getLabel() == null) {
            labelEntity = null;
        } else {
            labelEntity = labelRepository.findByName(artist.getLabel().getName()).orElseThrow(LabelNotFoundException::new);
        }
        var artistEntity = Artist.convertToEntity(artist);
        artistEntity.setLabelEntity(labelEntity);
        artistRepository.save(artistEntity);
    }

    public List<Artist> getAllArtists() {
        var artistEntities = artistRepository.findAll();
        var artistList = new ArrayList<Artist>();
        artistEntities.stream().map(Artist::convertToArtist).forEach(artistList::add);
        return artistList;
    }

    public ArtistEntity getArtistById(Integer id) throws ArtistNotFoundException {
        var entity = artistRepository.findById(id);
        return entity.orElseThrow(ArtistNotFoundException::new);
    }

    public void deleteArtist(Integer id) throws ArtistNotFoundException {
        if (artistRepository.existsById(id)) {
            artistRepository.deleteById(id);
        } else {
            throw new ArtistNotFoundException();
        }
    }

    public void addArtistToLabelById(Integer labelId, Integer artistId) throws ArtistNotFoundException, LabelNotFoundException {
        var label = labelRepository.findById(labelId).orElseThrow(LabelNotFoundException::new);
        var artist = artistRepository.findById(artistId).orElseThrow(ArtistNotFoundException::new);
        label.getArtists().add(artist);
        labelRepository.save(label);
        artistRepository.save(artist);
    }

    public void addArtistToLabel(Integer labelId, Artist artist) throws ArtistNotFoundException, LabelNotFoundException {
        var labelEntity = labelRepository.findById(labelId).orElseThrow(LabelNotFoundException::new);
        var artistEntity = artistRepository.save(Artist.convertToEntity(artist));
        artistEntity.setLabelEntity(labelEntity);
        labelEntity.getArtists().add(artistEntity);
        labelRepository.save(labelEntity);
        artistRepository.save(artistEntity);
    }

    public void addSchedule(Schedule schedule) {
        scheduleRepository.save(Schedule.convertToEntity(schedule));
    }

    public List<Schedule> getAllSchedules() {
        var scheduleEntities = scheduleRepository.findAll();
        var scheduleList = new ArrayList<Schedule>();
        scheduleEntities.stream().map(Schedule::convertToSchedule).forEach(scheduleList::add);
        return scheduleList;
    }

    public ScheduleEntity getScheduleById(Integer id) throws ScheduleNotFoundException {
        var entity = scheduleRepository.findById(id);
        return entity.orElseThrow(ScheduleNotFoundException::new);
    }

    public void deleteSchedule(Integer id) throws ScheduleNotFoundException {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
        } else {
            throw new ScheduleNotFoundException();
        }
    }

    public void addPersonToSchedule(Integer personId, Integer scheduleId) throws ScheduleNotFoundException, PersonNotFoundException {
        var schedule = getScheduleById(scheduleId);
        var person = personService.getPersonById(personId);
        schedule.getPersons().add(person);
        person.getSchedules().add(schedule);
        scheduleRepository.save(schedule);
        personRepository.save(person);
    }

    public void removePersonFromSchedule(Integer personId, Integer scheduleId) throws ScheduleNotFoundException, PersonNotFoundException {
        var schedule = getScheduleById(scheduleId);
        var person = personService.getPersonById(personId);
        schedule.getPersons().remove(person);
        person.getSchedules().remove(schedule);
        scheduleRepository.save(schedule);
        personRepository.save(person);
    }

    public void buyTicket(Integer personId, Integer scheduleId) throws NotEnoughCreditsException, PersonNotFoundException, ScheduleNotFoundException {
        var person = personService.getPersonById(personId);
        var balance = person.getBalance();
        var schedule = getScheduleById(scheduleId);
        var price = schedule.getPrice();

        if (balance >= price) {
            person.setBalance(balance - price);
            personRepository.save(person);
            addPersonToSchedule(personId, scheduleId);
        } else {
            throw new NotEnoughCreditsException();
        }
    }

    public void setScheduleRoomById(Integer scheduleId, Integer roomId) throws RoomNotFoundException, ScheduleNotFoundException {
        var room = roomRepository.findById(roomId).orElseThrow(RoomNotFoundException::new);
        var schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);

        schedule.setRoom(room);
        scheduleRepository.save(schedule);
    }

    public void setScheduleRoom(Integer scheduleId, Room room) throws ScheduleNotFoundException {
        var schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);
        var roomEntity = roomRepository.save(Room.convertToEntity(room));
        schedule.setRoom(roomEntity);
        scheduleRepository.save(schedule);
    }
}
