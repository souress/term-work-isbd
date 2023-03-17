package klmnkki.POJO;

import klmnkki.entities.MedicineStorageEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineStorage {
    private Integer id;
    private Medicine medicine;
    private Supplier supplier;
    private Integer quantity;

    public MedicineStorage(Medicine medicine, Supplier supplier, Integer quantity) {
        this.medicine = medicine;
        this.supplier = supplier;
        this.quantity = quantity;
    }

    public static MedicineStorageEntity convertToEntity(MedicineStorage medicineStorage) {
        return new MedicineStorageEntity(
                medicineStorage.getId(),
                Medicine.convertToEntity(medicineStorage.getMedicine()),
                Supplier.convertToEntity(medicineStorage.getSupplier()),
                medicineStorage.getQuantity());
    }

    public static MedicineStorage convertToMedicineStorage(MedicineStorageEntity medicineStorageEntity) {
        return new MedicineStorage(
                medicineStorageEntity.getId(),
                Medicine.convertToMedicine(medicineStorageEntity.getMedicine()),
                Supplier.convertToSupplier(medicineStorageEntity.getSupplier()),
                medicineStorageEntity.getQuantity());
    }
}
