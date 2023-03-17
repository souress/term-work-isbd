package klmnkki.POJO;

import klmnkki.entities.SupplierEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    private Integer id;
    private String name;
    private String address;
    private String email;

    public Supplier(String name, String address, String email) {
        this.name = name;
        this.address = address;
        this.email = email;
    }

    public static SupplierEntity convertToEntity(Supplier supplier) {
        return new SupplierEntity(
                supplier.getId(),
                supplier.getName(),
                supplier.getAddress(),
                supplier.getEmail());
    }

    public static Supplier convertToSupplier(SupplierEntity supplierEntity) {
        return new Supplier(
                supplierEntity.getId(),
                supplierEntity.getName(),
                supplierEntity.getAddress(),
                supplierEntity.getEmail());
    }
}
