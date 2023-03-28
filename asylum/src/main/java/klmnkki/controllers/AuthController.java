package klmnkki.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.internal.LinkedTreeMap;
import klmnkki.POJO.AuthRequest;
import klmnkki.POJO.Person;
import klmnkki.POJO.User;
import klmnkki.entities.enums.UserRole;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.*;
import klmnkki.security.JwtUtils;
import klmnkki.services.AuthService;
import klmnkki.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final Gson gson = new Gson();

    @Autowired
    private AuthService authService;
    @Autowired
    private PersonService personService;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest user) throws ApiException {
        try {
            authService.register(user);
            return ResponseEntity.ok(String.format("{\"token\": \"%s\"}", jwtUtils.generateToken(user.getLogin())));
        } catch (UserAlreadyExistsException e) {
            throw new ApiException(ApiErrorType.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        } catch (IncorrectCredentialsException e) {
            throw new ApiException(ApiErrorType.INCORRECT_LOGIN_LENGTH, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ApiException("An error occurred on the server", ApiErrorType.UNKNOWN_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest user) throws ApiException {
        try {
            authService.login(user);
            return ResponseEntity.ok(String.format("{\"token\": \"%s\"}", jwtUtils.generateToken(user.getLogin())));
        } catch (UserNotFoundException ex) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (WrongPasswordException ex) {
            throw new ApiException(ApiErrorType.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @GetMapping("/checkAdmin/{login}")
    public ResponseEntity<?> checkAdminRights(@PathVariable String login) throws ApiException {
        try {
            return ResponseEntity.ok(
                    String.format("{\"adminRights\": \"%b\"}", authService.checkAdminRights(login))
            );
        } catch (UserNotFoundException e) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/checkRole/{login}")
    public ResponseEntity<?> checkRole(@PathVariable String login) throws ApiException {
        try {
            return ResponseEntity.ok(
                    String.format("{\"role\": \"%s\"}", authService.checkRole(login).toString())
            );
        } catch (UserNotFoundException e) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check/{login}")
    public ResponseEntity<?> check(@PathVariable String login) {
        if (!login.equals("")) {
            return ResponseEntity.ok(jwtUtils.generateToken(login));
        }
        return ResponseEntity.ok(0);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(UserRole.values());
    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user) throws ApiException {
        try {
            authService.addUser(user);
            return ResponseEntity.ok(String.format("{\"token\": \"%s\"}", jwtUtils.generateToken(user.getLogin())));
        } catch (UserAlreadyExistsException e) {
            throw new ApiException(ApiErrorType.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        } catch (IncorrectCredentialsException e) {
            throw new ApiException(ApiErrorType.INCORRECT_LOGIN_LENGTH, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ApiException("An error occurred on the server", ApiErrorType.UNKNOWN_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        var list = authService.getAllUsers();
        var ret = list.stream().map(x -> String.format("{\"id\": %d, \"login\": \"%s\"}", x.getKey(), x.getValue())).toList();
        var newRet = ret.stream().map(x -> gson.fromJson(x, JsonObject.class)).toList();
        return ResponseEntity.ok(newRet);
    }

    @PostMapping("/users/update")
    public ResponseEntity<?> updateUser(@RequestBody Object userObj) throws ApiException {
        try {
            var userMap = (LinkedTreeMap) userObj;
            var user = new User(
                    Integer.parseInt(String.valueOf(userMap.get("id"))),
                    String.valueOf(userMap.get("login")),
                    String.valueOf(userMap.get("password")),
                    UserRole.valueOf(String.valueOf(userMap.get("role"))),
                    Person.convertToPerson(personService.getPersonById(Integer.parseInt(String.valueOf(userMap.get("person")))))
            );
            authService.updateUser(user);
            return ResponseEntity.ok("");
        } catch (IncorrectCredentialsException e) {
            throw new ApiException(ApiErrorType.INCORRECT_LOGIN_LENGTH, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ApiException("An error occurred on the server", ApiErrorType.UNKNOWN_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/user/{login}/setPerson/{personId}")
    public ResponseEntity<?> setPersonForUser(@PathVariable String login, @PathVariable Integer personId) throws ApiException {
        try {
            authService.setPersonForUser(personId, login);
        } catch (UserNotFoundException e) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @GetMapping("/user/{login}/person")
    public ResponseEntity<?> getPersonForUser(@PathVariable String login) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(authService.getPersonForUser(login)));
        } catch (UserNotFoundException e) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            throw new ApiException(ApiErrorType.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
}
