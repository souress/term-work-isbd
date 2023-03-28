package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Person;
import klmnkki.entities.enums.PersonRole;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.PersonNotFoundException;
import klmnkki.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
public class PersonController {
    private final Gson gson = new Gson();

    @Autowired
    private PersonService personService;

    @GetMapping()
    public ResponseEntity<?> getAllPersons() {
        var persons = personService.getAllPersons();
        return ResponseEntity.ok(gson.toJson(persons));
    }

    @PostMapping()
    public ResponseEntity<?> addPerson(@RequestBody Person person) {
        personService.addPerson(person);
        return ResponseEntity.ok("");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePerson(@RequestBody Person person) {
        personService.updatePerson(person);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(personService.getPersonById(id)));
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePersonById(@PathVariable Integer id) throws ApiException {
        try {
            personService.deletePerson(id);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/{id}/balance/{balance}")
    public ResponseEntity<?> setPersonBalanceById(@PathVariable Integer id, @PathVariable Integer balance) throws ApiException {
        try {
            personService.setBalanceById(id, balance);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/{id}/schedules")
    public ResponseEntity<?> getPersonSchedulesById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(personService.getSchedulesById(id)));
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(PersonRole.values());
    }

}
