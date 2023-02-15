package klmnkki.controllers;

import com.google.gson.Gson;

import klmnkki.POJO.Person;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.NotFoundException;
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

//    @PostMapping("")
//    public ResponseEntity<?> addPersonList(@RequestBody List<Person> personList) {
//        personService.addPersonList(personList);
//        return ResponseEntity.ok("");
//    }

    @PostMapping()
    public ResponseEntity<?> addPerson(@RequestBody Person person) {
        personService.addPerson(person);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(personService.getPersonById(id)));
        } catch (NotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
}
