package klmnkki.entities;

import klmnkki.entities.enums.MedicineType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "medicine", schema = "public")
public class MedicineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "medicine_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "med_type")
    private MedicineType medicineType;

    @Column(name = "action_type")
    private String action_type;

    @Column(name = "country")
    private String country;

    @OneToMany(mappedBy = "medicine")
    private Set<MedicineStorageEntity> medicineStorageEntitySet;

    @OneToOne(mappedBy = "medicine")
    private TreatmentProgramEntity treatmentProgram;
}
