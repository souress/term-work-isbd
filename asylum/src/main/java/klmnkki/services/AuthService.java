package klmnkki.services;

import klmnkki.POJO.AuthRequest;
import klmnkki.entities.UserEntity;
import klmnkki.entities.enums.UserRole;
import klmnkki.exceptions.*;
import klmnkki.repositories.UserRepository;
import klmnkki.security.Hasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public void register(AuthRequest authRequest) throws UserAlreadyExistsException {
        if (userRepository.existsByLogin(authRequest.getLogin())) {
            throw new UserAlreadyExistsException("Login is already in use.");
        }
        UserEntity user = new UserEntity(authRequest.getLogin(), Hasher.encryptMD5(authRequest.getPassword()), UserRole.PATIENT);
        userRepository.save(user);
    }

    public void login(AuthRequest authRequest) throws UserNotFoundException, WrongPasswordException {
        if (!userRepository.existsByLogin(authRequest.getLogin())) {
            throw new UserNotFoundException(authRequest.getLogin());
        }
        UserEntity entity = userRepository.findByLogin(authRequest.getLogin());
        if (!Hasher.encryptMD5(authRequest.getPassword()).equals(entity.getPassword())) {
            throw new WrongPasswordException(authRequest.getLogin());
        }
    }

    public boolean checkAdminRights(String login) {
        UserEntity entity = userRepository.findByLogin(login);
        return entity.getRole() == UserRole.ADMIN;
    }
}
