package klmnkki.exceptions;

public class ForbiddenAccessException extends Exception {
    public ForbiddenAccessException(String login, String type) {
        super("User with login - " + login + " don't have " + type + " permission.");
    }
}
