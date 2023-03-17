package klmnkki.entities;

import klmnkki.entities.enums.ProductType;
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
@Table(name = "product", schema = "public")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "product_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "calories", columnDefinition = "INT NOT NULL CHECK ('calories' >= 0)")
    private Integer calories;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type")
    private ProductType productType;

    @ManyToMany
    @JoinTable(name = "diet",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "treatment_program_id"))
    private List<TreatmentProgramEntity> treatmentPrograms;
}
