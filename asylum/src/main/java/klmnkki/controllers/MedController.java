package klmnkki.controllers;

import com.google.gson.Gson;
import klmnkki.POJO.Medicine;
import klmnkki.POJO.Supplier;
import klmnkki.exceptionHandling.ApiErrorType;
import klmnkki.exceptionHandling.exceptions.ApiException;
import klmnkki.exceptionHandling.exceptions.MedicineNotFoundException;
import klmnkki.exceptionHandling.exceptions.SupplierNotFoundException;
import klmnkki.services.MedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/med")
public class MedController {
    private final Gson gson = new Gson();

    @Autowired
    private MedService medService;

    @GetMapping("/medicines")
    public ResponseEntity<?> getAllMedicines() {
        var medicines = medService.getAllMedicines();
        return ResponseEntity.ok(gson.toJson(medicines));
    }

    @PostMapping("/medicines")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        medService.addMedicine(medicine);
        return ResponseEntity.ok("");
    }

    @PostMapping("/medicines/{medId}/supplier/{supId}")
    public ResponseEntity<?> setMedicineSupplierById(@PathVariable Integer medId, @PathVariable Integer supId) throws ApiException {
        try {
            medService.setMedicineSupplierById(medId, supId);
            return ResponseEntity.ok("");
        } catch (SupplierNotFoundException e) {
            throw new ApiException(ApiErrorType.SUPPLIER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/medicines/{medId}/supplier")
    public ResponseEntity<?> setMedicineSupplier(@PathVariable Integer medId, @RequestBody Supplier supplier) throws ApiException {
        medService.setMedicineSupplier(medId, supplier);
        return ResponseEntity.ok("");
    }

    @GetMapping("/medicines/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(medService.getMedicineById(id)));
        } catch (MedicineNotFoundException e) {
            throw new ApiException(ApiErrorType.MEDICINE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/medicines/{id}")
    public ResponseEntity<?> deleteMedicineById(@PathVariable Integer id) throws ApiException {
        try {
            medService.deleteMedicine(id);
        } catch (MedicineNotFoundException e) {
            throw new ApiException(ApiErrorType.MEDICINE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }

    @PostMapping("/medicines/{id}/amount/{amount}")
    public ResponseEntity<?> setMedicineQuantity(@PathVariable Integer id, @PathVariable Integer amount) throws ApiException {
        medService.setMedicineQuantityById(id, amount);
        return ResponseEntity.ok("");
    }

    @GetMapping("/medicines/{id}/amount")
    public ResponseEntity<?> getMedicineQuantity(@PathVariable Integer id) throws ApiException {
        return ResponseEntity.ok(gson.toJson(medService.getMedicineQuantityById(id)));
    }

    @GetMapping("/suppliers")
    public ResponseEntity<?> getAllSuppliers() {
        var suppliers = medService.getAllSuppliers();
        return ResponseEntity.ok(gson.toJson(suppliers));
    }

    @PostMapping("/suppliers")
    public ResponseEntity<?> addSupplier(@RequestBody Supplier supplier) {
        medService.addSupplier(supplier);
        return ResponseEntity.ok("");
    }

    @GetMapping("/suppliers/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable Integer id) throws ApiException {
        try {
            return ResponseEntity.ok(gson.toJson(medService.getSupplierById(id)));
        } catch (SupplierNotFoundException e) {
            throw new ApiException(ApiErrorType.SUPPLIER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<?> deleteSupplierById(@PathVariable Integer id) throws ApiException {
        try {
            medService.deleteSupplier(id);
        } catch (SupplierNotFoundException e) {
            throw new ApiException(ApiErrorType.SUPPLIER_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("");
    }
}
