package klmnkki.services;

import klmnkki.POJO.AuthRequest;
import klmnkki.POJO.Person;
import klmnkki.POJO.User;
import klmnkki.entities.UserEntity;
import klmnkki.entities.enums.UserRole;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.repositories.PersonRepository;
import klmnkki.repositories.UserRepository;
import klmnkki.security.Hasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PersonRepository personRepository;

    public void register(AuthRequest authRequest) throws UserAlreadyExistsException, IncorrectCredentialsException {
        if (userRepository.existsByLogin(authRequest.getLogin())) {
            throw new UserAlreadyExistsException("Login is already in use.");
        }
        if (authRequest.getLogin().length() < 5 || authRequest.getLogin().length() > 15) {
            throw new IncorrectCredentialsException("Login length is invalid.");
        }
        var user = new UserEntity(authRequest.getLogin(), Hasher.encryptMD5(authRequest.getPassword()), UserRole.PATIENT);
        userRepository.save(user);
    }

    public void login(AuthRequest authRequest) throws UserNotFoundException, WrongPasswordException {
        if (!userRepository.existsByLogin(authRequest.getLogin())) {
            throw new UserNotFoundException(authRequest.getLogin());
        }
        var entity = userRepository.findByLogin(authRequest.getLogin());
        if (!Hasher.encryptMD5(authRequest.getPassword()).equals(entity.getPassword())) {
            throw new WrongPasswordException(authRequest.getLogin());
        }
    }

    public boolean checkAdminRights(String login) throws UserNotFoundException {
        var entity = userRepository.findByLogin(login);
        if (entity == null) {
            throw new UserNotFoundException(login);
        }
        return entity.getRole() == UserRole.ADMIN;
    }

    public UserRole checkRole(String login) throws UserNotFoundException {
        var entity = userRepository.findByLogin(login);
        if (entity == null) {
            throw new UserNotFoundException(login);
        }
        return entity.getRole();
    }

    public void addUser(User user) throws IncorrectCredentialsException, UserAlreadyExistsException {
        if (userRepository.existsByLogin(user.getLogin())) {
            throw new UserAlreadyExistsException("Login is already in use.");
        }
        if (user.getLogin().length() < 5 || user.getLogin().length() > 15) {
            throw new IncorrectCredentialsException("Login length is invalid.");
        }
        var userEntity = new UserEntity(user.getLogin(), Hasher.encryptMD5(user.getPassword()), user.getRole());
        userRepository.save(userEntity);
    }

    public void updateUser(User user) throws IncorrectCredentialsException {
        if (user.getLogin().length() < 5 || user.getLogin().length() > 15) {
            throw new IncorrectCredentialsException("Login length is invalid.");
        }
        var userEntity = new UserEntity(
                user.getId(),
                user.getLogin(),
                Hasher.encryptMD5(user.getPassword()),
                user.getRole(),
                Person.convertToEntity(user.getPerson())
        );
        userRepository.save(userEntity);
    }

    public List<AbstractMap.SimpleEntry<Integer, String>> getAllUsers() {
        var users = userRepository.findAll();
        var response = new ArrayList<Map.Entry<Integer, String>>();
        return users.stream().map(x -> new AbstractMap.SimpleEntry<>(x.getId(), x.getLogin())).toList();
    }

    public void setPersonForUser(Integer personId, String login) throws UserNotFoundException, PersonNotFoundException {
        if (!userRepository.existsByLogin(login)) {
            throw new UserNotFoundException("Wrong login.");
        }
        var person = personRepository.findById(personId).orElseThrow(PersonNotFoundException::new);
        var user = userRepository.findByLogin(login);
        user.setPerson(person);
        userRepository.save(user);
    }

    public Person getPersonForUser(String login) throws UserNotFoundException, PersonNotFoundException {
        if (!userRepository.existsByLogin(login)) {
            throw new UserNotFoundException("Wrong login.");
        }
        var personEntity = userRepository.findByLogin(login).getPerson();
        if (personEntity == null) throw new PersonNotFoundException();
        return Person.convertToPerson(personEntity);
    }
}
