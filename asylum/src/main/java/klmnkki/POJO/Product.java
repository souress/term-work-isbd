package klmnkki.POJO;

import klmnkki.entities.ProductEntity;
import klmnkki.entities.enums.ProductType;
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
public class Product {
    private Integer id;
    private String name;
    private Integer calories;
    private ProductType productType;
    private List<TreatmentProgram> treatmentPrograms;

    public Product(String name, Integer calories, ProductType productType, List<TreatmentProgram> treatmentPrograms) {
        this.name = name;
        this.calories = calories;
        this.productType = productType;
        this.treatmentPrograms = treatmentPrograms == null ? new ArrayList<>() : treatmentPrograms;
    }

    public static ProductEntity convertToEntity(Product product) {
        return new ProductEntity(
                product.getId(),
                product.getName(),
                product.getCalories(),
                product.getProductType(),
                product.getTreatmentPrograms().stream().map(TreatmentProgram::convertToEntity).collect(Collectors.toList()));
    }

    public static Product convertToProduct(ProductEntity productEntity) {
        return new Product(
                productEntity.getId(),
                productEntity.getName(),
                productEntity.getCalories(),
                productEntity.getProductType(),
                productEntity.getTreatmentPrograms().stream().map(TreatmentProgram::convertToTreatmentProgram).collect(Collectors.toList()));
    }
}
