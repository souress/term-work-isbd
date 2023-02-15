package klmnkki.services;

import klmnkki.POJO.AuthRequest;
import klmnkki.POJO.User;
import klmnkki.entities.UserEntity;
import klmnkki.entities.enums.UserRole;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.repositories.UserRepository;
import klmnkki.security.Hasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

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
}
