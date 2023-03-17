package klmnkki.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "treatment_program", schema = "public")
public class TreatmentProgramEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "treatment_program_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "diagnosis")
    private String diagnosis;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "medicine_id", referencedColumnName = "id")
    private MedicineEntity medicine;

    @ManyToMany(mappedBy = "treatmentPrograms")
    private List<ProductEntity> products;
}
