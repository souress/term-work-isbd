package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Product;
import klmnkki.POJO.TreatmentProgram;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.ProductNotFoundException;
import klmnkki.exceptionHandling.exceptions.TreatmentProgramNotFoundException;
import klmnkki.services.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/diet")
public class DietController {
    private final Gson gson = new Gson();

    @Autowired
    private DietService dietService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(gson.toJson(dietService.getAllProducts()));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(dietService.getProductById(id)));
        } catch (ProductNotFoundException e) {
            throw new ApiException(ApiErrorType.PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        dietService.addOrUpdateProduct(product);
        return ResponseEntity.ok("");
    }

    @PostMapping("/products/update")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        dietService.addOrUpdateProduct(product);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Integer id) throws ApiException {
        try {
            dietService.deleteProduct(id);
            return ResponseEntity.ok("");
        } catch (ProductNotFoundException e) {
            throw new ApiException(ApiErrorType.PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/products/{productId}/treatment/{treatmentId}")
    public ResponseEntity<?> makeDiet(@PathVariable Integer productId, @PathVariable Integer treatmentId) throws ApiException {
        try {
            dietService.makeDiet(productId, treatmentId);
        } catch (ProductNotFoundException e) {
            throw new ApiException(ApiErrorType.PRODUCT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        } catch (TreatmentProgramNotFoundException e) {
            throw new ApiException(ApiErrorType.TREATMENT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @GetMapping("/treatment")
    public ResponseEntity<?> getAllTreatmentPrograms() {
        return ResponseEntity.ok(gson.toJson(dietService.getAllTreatmentPrograms()));
    }

    @GetMapping("/treatment/{id}")
    public ResponseEntity<?> getTreatmentById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(dietService.getTreatmentProgramById(id)));
        } catch (TreatmentProgramNotFoundException e) {
            throw new ApiException(ApiErrorType.TREATMENT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/treatment")
    public ResponseEntity<?> addTreatmentProgram(@RequestBody TreatmentProgram treatment) {
        dietService.addOrUpdateTreatmentProgram(treatment);
        return ResponseEntity.ok("");
    }

    @PostMapping("/treatment/update")
    public ResponseEntity<?> updateTreatmentProgram(@RequestBody TreatmentProgram treatment) {
        dietService.addOrUpdateTreatmentProgram(treatment);
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/treatment/{id}")
    public ResponseEntity<?> deleteTreatmentProgramById(@PathVariable Integer id) throws ApiException {
        try {
            dietService.deleteTreatmentProgram(id);
            return ResponseEntity.ok("");
        } catch (TreatmentProgramNotFoundException e) {
            throw new ApiException(ApiErrorType.TREATMENT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/treatment/{treatmentId}/diagnosis")
    public ResponseEntity<?> setDiagnosis(@PathVariable Integer treatmentId, @RequestBody String diagnosis) throws ApiException {
        try {
            dietService.setDiagnosis(treatmentId, diagnosis);
        } catch (TreatmentProgramNotFoundException e) {
            throw new ApiException(ApiErrorType.TREATMENT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }
}
