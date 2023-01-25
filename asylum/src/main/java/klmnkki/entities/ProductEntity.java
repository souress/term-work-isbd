package klmnkki.entities;

import klmnkki.entities.enums.ProductType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
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
    private List<TreatmentProgramEntity> treatmentPrograms;
}
