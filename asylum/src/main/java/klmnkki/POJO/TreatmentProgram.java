package klmnkki.POJO;

import klmnkki.entities.TreatmentProgramEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentProgram {
    private Integer id;
    private String diagnosis;
    private Medicine medicine;
    private List<Product> products;

    public TreatmentProgram(String diagnosis, Medicine medicine, List<Product> products) {
        this.diagnosis = diagnosis;
        this.medicine = medicine;
        this.products = products == null ? new ArrayList<>() : products;
    }

    public static TreatmentProgramEntity convertToEntity(TreatmentProgram treatmentProgram) {
        return new TreatmentProgramEntity(
                treatmentProgram.getId(),
                treatmentProgram.getDiagnosis(),
                Medicine.convertToEntity(treatmentProgram.getMedicine()),
                treatmentProgram.getProducts().stream().map(Product::convertToEntity).collect(Collectors.toList()));
    }

    public static TreatmentProgram convertToTreatmentProgram(TreatmentProgramEntity treatmentProgramEntity) {
        return new TreatmentProgram(
                treatmentProgramEntity.getId(),
                treatmentProgramEntity.getDiagnosis(),
                Medicine.convertToMedicine(treatmentProgramEntity.getMedicine()),
                treatmentProgramEntity.getProducts().stream().map(Product::convertToProduct).collect(Collectors.toList()));
    }
}
