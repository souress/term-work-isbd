package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.AuthRequest;
import klmnkki.exceptions.*;
import klmnkki.security.JwtUtils;
import klmnkki.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.function.Function;

@RestController
@CrossOrigin("http://localhost:8080")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    JwtUtils jwtUtils;

    private static final Gson gson = new Gson();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest user) throws ApiException {
        try {
            authService.register(user);
            return ResponseEntity.ok(String.format("{\"token\": \"%s\"}", jwtUtils.generateToken(user.getLogin())));
        } catch (UserAlreadyExistsException e) {
            throw new ApiException(ApiErrorType.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ApiException("An error occurred on the server", ApiErrorType.UNKNOWN_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest user) throws ApiException {
        try {
            authService.login(user);
            return ResponseEntity.ok(jwtUtils.generateToken(user.getLogin()));
        } catch (UserNotFoundException ex) {
            throw new ApiException(ApiErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (WrongPasswordException ex) {
            throw new ApiException(ApiErrorType.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @GetMapping("/checkAdmin/{login}")
    public ResponseEntity<?> checkAdminRights(@PathVariable String login) {
        boolean rights = authService.checkAdminRights(login);
        return rights ?
                ResponseEntity.ok("{\"adminRights\": \"true\"}") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"adminRights\": \"false\"}");
    }

    @GetMapping("/check/{login}")
    public ResponseEntity<?> check(@PathVariable String login) {
        if (!login.equals("")) {
            return ResponseEntity.ok(jwtUtils.generateToken(login));
        }
        return ResponseEntity.ok(0);
    }
}
