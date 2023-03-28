package klmnkki.services;

import klmnkki.POJO.Medicine;
import klmnkki.POJO.Supplier;
import klmnkki.entities.MedicineEntity;
import klmnkki.entities.SupplierEntity;
import klmnkki.exceptionHandling.exceptions.MedicineNotFoundException;
import klmnkki.exceptionHandling.exceptions.SupplierNotFoundException;
import klmnkki.repositories.MedicineRepository;
import klmnkki.repositories.MedicineStorageRepository;
import klmnkki.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedService {
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private MedicineStorageRepository medicineStorageRepository;
    @Autowired
    private SupplierRepository supplierRepository;

    public void addOrUpdateMedicine(Medicine medicine) {
        medicineRepository.save(Medicine.convertToEntity(medicine));
    }

    public void addMedicineList(List<Medicine> medicineList) {
        medicineList.stream().map(Medicine::convertToEntity).forEach(medicineRepository::save);
    }

    public List<Medicine> getAllMedicines() {
        var medicineEntities = medicineRepository.findAll();
        var medicineList = new ArrayList<Medicine>();
        medicineEntities.stream().map(Medicine::convertToMedicine).forEach(medicineList::add);
        return medicineList;
    }

    public MedicineEntity getMedicineById(Integer id) throws MedicineNotFoundException {
        return medicineRepository.findById(id).orElseThrow(MedicineNotFoundException::new);
    }

    public void deleteMedicine(Integer id) throws MedicineNotFoundException {
        if (medicineRepository.existsById(id)) {
            medicineStorageRepository.deleteById(id);
        } else {
            throw new MedicineNotFoundException();
        }
    }

    public void addOrUpdateSupplier(Supplier supplier) {
        supplierRepository.save(Supplier.convertToEntity(supplier));
    }

    public void addSupplierList(List<Supplier> supplierList) {
        supplierList.stream().map(Supplier::convertToEntity).forEach(supplierRepository::save);
    }

    public List<Supplier> getAllSuppliers() {
        var supplierEntities = supplierRepository.findAll();
        var supplierList = new ArrayList<Supplier>();
        supplierEntities.stream().map(Supplier::convertToSupplier).forEach(supplierList::add);
        return supplierList;
    }

    public SupplierEntity getSupplierById(Integer id) throws SupplierNotFoundException {
        return supplierRepository.findById(id).orElseThrow(SupplierNotFoundException::new);
    }

    public void deleteSupplier(Integer id) throws SupplierNotFoundException {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
        } else {
            throw new SupplierNotFoundException();
        }
    }


    public void setMedicineSupplierById(Integer medicineId, Integer supplierId) throws SupplierNotFoundException {
        var storage = medicineStorageRepository.findByMedicineId(medicineId);
        storage.setSupplier(getSupplierById(supplierId));
    }

    public void setMedicineSupplier(Integer medicineId, Supplier supplier) {
        var storage = medicineStorageRepository.findByMedicineId(medicineId);
        var supplierEntity = supplierRepository.save(Supplier.convertToEntity(supplier));
        storage.setSupplier(supplierEntity);
        medicineStorageRepository.save(storage);
    }

    public void setMedicineQuantityById(Integer medicineId, Integer quantity) {
        var storage = medicineStorageRepository.findByMedicineId(medicineId);
        storage.setQuantity(quantity);
        medicineStorageRepository.save(storage);
    }

    public Integer getMedicineQuantityById(Integer medicineId) {
        var storage = medicineStorageRepository.findByMedicineId(medicineId);
        return storage.getQuantity();
    }
}
