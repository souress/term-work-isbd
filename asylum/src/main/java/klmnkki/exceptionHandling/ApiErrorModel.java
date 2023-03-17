package klmnkki.exceptionHandling;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;

public class ApiErrorModel {
    @JsonProperty("errorCode")
    public ApiErrorType errorCode;

    @JsonProperty("details")
    public HashMap<String, String> details;

    @JsonCreator
    public ApiErrorModel(
            @JsonProperty("errorCode") ApiErrorType apiErrorType,
            @JsonProperty("details") HashMap<String, String> details) {
        this.errorCode = apiErrorType;
        this.details = details != null ? details : new HashMap<>();
    }

    public ApiErrorModel(ApiErrorType apiErrorType) {
        this(apiErrorType, new HashMap<>());
    }
}
