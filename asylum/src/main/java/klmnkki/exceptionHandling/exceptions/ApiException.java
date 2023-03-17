package klmnkki.exceptionHandling.exceptions;

import klmnkki.exceptionHandling.ApiErrorModel;
import klmnkki.exceptionHandling.ApiErrorType;
import org.springframework.http.HttpStatus;

public class ApiException extends Exception {
    public HttpStatus statusCode;

    public ApiErrorModel errorModel;

    public ApiException(String message, HttpStatus status, ApiErrorModel model) {
        super(message != null ? message : "");
        statusCode = status;
        errorModel = model;
        if (message != null && !message.isEmpty() && errorModel != null) {
            errorModel.details.put("exceptionMessage", message);
        }
    }

    public ApiException(String message, ApiErrorType errorType, HttpStatus statusCode) {
        this(message, statusCode, new ApiErrorModel(errorType));
    }

    public ApiException(ApiErrorModel errorModel, HttpStatus statusCode) {
        this(null, statusCode, errorModel);
    }

    public ApiException(ApiErrorType errorType, HttpStatus statusCode) {
        this(new ApiErrorModel(errorType), statusCode);
    }
}
