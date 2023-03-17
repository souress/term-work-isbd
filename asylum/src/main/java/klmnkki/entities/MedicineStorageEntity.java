package klmnkki.entities;

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
@Table(name = "med_storage", schema = "public")
public class MedicineStorageEntity {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private MedicineEntity medicine;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierEntity supplier;

    @Column(name = "quantity", columnDefinition = "INT NOT NULL CHECK ('quantity' >= 0)")
    private Integer quantity;

}
