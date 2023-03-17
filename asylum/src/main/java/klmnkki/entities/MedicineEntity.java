package klmnkki.entities;

import klmnkki.entities.enums.MedicineType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private String actionType;

    @Column(name = "country")
    private String country;
}
