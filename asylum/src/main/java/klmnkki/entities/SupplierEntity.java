package klmnkki.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "supplier", schema = "public")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "supplier_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "supplier")
    private Set<MedicineStorageEntity> medicineStorageEntitySet;
}
