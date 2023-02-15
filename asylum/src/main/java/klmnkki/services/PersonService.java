package klmnkki.services;

import klmnkki.POJO.Person;
import klmnkki.entities.PersonEntity;
import klmnkki.entities.ScheduleEntity;
import klmnkki.exceptionHandling.exceptions.NotFoundException;
import klmnkki.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public void addPerson(Person person) {
        var entity = new PersonEntity(person.getFullName(), person.getRole(), person.getBalance(), person.getSchedules());
        personRepository.save(entity);
    }

    public void addPersonList(List<Person> personList) {
        personList.stream().map(Person::convertToEntity).forEach(personRepository::save);
    }

    public List<Person> getAllPersons() {
        var personEntities = personRepository.findAll();
        var personList = new ArrayList<Person>();
        personEntities.stream().map(Person::convertToPerson).forEach(personList::add);
        return personList;
    }

    public PersonEntity getPersonById(Integer id) throws NotFoundException {
        var entity = personRepository.findById(id);
        return entity.orElseThrow(NotFoundException::new);
    }

    public PersonEntity getPersonIdByName(String name) {
        return personRepository.findByFullName(name);
    }

    public void deletePerson(Integer id) {
        personRepository.deleteById(id);
    }

    public void setBalanceById(Integer id, Integer balance) throws NotFoundException {
        var personEntity = getPersonById(id);
        personEntity.setBalance(balance);
        personRepository.save(personEntity);
    }

    public void updatePerson(Person person) {
        personRepository.save(Person.convertToEntity(person));
    }

    public Collection<ScheduleEntity> getSchedulesById(Integer id) throws NotFoundException {
        return getPersonById(id).getSchedules();
    }


}
