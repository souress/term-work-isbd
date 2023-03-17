package klmnkki.POJO;


import klmnkki.entities.MedicineEntity;
import klmnkki.entities.enums.MedicineType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {
    private Integer id;
    private String name;
    private MedicineType medicineType;
    private String actionType;
    private String country;

    public Medicine(String name, MedicineType medicineType, String actionType, String country) {
        this.name = name;
        this.medicineType = medicineType;
        this.actionType = actionType;
        this.country = country;
    }

    public static MedicineEntity convertToEntity(Medicine medicine) {
        return new MedicineEntity(
                medicine.getId(),
                medicine.getName(),
                medicine.getMedicineType(),
                medicine.getActionType(),
                medicine.getCountry());
    }

    public static Medicine convertToMedicine(MedicineEntity medicineEntity) {
        return new Medicine(
                medicineEntity.getId(),
                medicineEntity.getName(),
                medicineEntity.getMedicineType(),
                medicineEntity.getActionType(),
                medicineEntity.getCountry());

    }
}
