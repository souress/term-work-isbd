package klmnkki.services;

import klmnkki.POJO.TreatmentProgram;
import klmnkki.POJO.Product;
import klmnkki.entities.TreatmentProgramEntity;
import klmnkki.entities.ProductEntity;
import klmnkki.exceptionHandling.exceptions.TreatmentProgramNotFoundException;
import klmnkki.exceptionHandling.exceptions.ProductNotFoundException;
import klmnkki.repositories.ProductRepository;
import klmnkki.repositories.TreatmentProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DietService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TreatmentProgramRepository treatmentProgramRepository;

    public void addProduct(Product product) {
        productRepository.save(Product.convertToEntity(product));
    }

    public void addProductList(List<Product> productList) {
        productList.stream().map(Product::convertToEntity).forEach(productRepository::save);
    }

    public List<Product> getAllProducts() {
        var productEntities = productRepository.findAll();
        var productList = new ArrayList<Product>();
        productEntities.stream().map(Product::convertToProduct).forEach(productList::add);
        return productList;
    }

    public ProductEntity getProductById(Integer id) throws ProductNotFoundException {
        var entity = productRepository.findById(id);
        return entity.orElseThrow(ProductNotFoundException::new);
    }

    public void deleteProduct(Integer id) throws ProductNotFoundException {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new ProductNotFoundException();
        }
    }

    public void makeDiet(Integer productId, Integer treatmentProgramId) throws ProductNotFoundException, TreatmentProgramNotFoundException {
        var product = productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
        var treatment = treatmentProgramRepository.findById(treatmentProgramId).orElseThrow(TreatmentProgramNotFoundException::new);
        product.getTreatmentPrograms().add(treatment);
        treatment.getProducts().add(product);
        productRepository.save(product);
        treatmentProgramRepository.save(treatment);
    }

    public void addTreatmentProgram(TreatmentProgram treatment) {
        treatmentProgramRepository.save(TreatmentProgram.convertToEntity(treatment));
    }

    public void addTreatmentProgramList(List<TreatmentProgram> treatmentList) {
        treatmentList.stream().map(TreatmentProgram::convertToEntity).forEach(treatmentProgramRepository::save);
    }

    public List<TreatmentProgram> getAllTreatmentPrograms() {
        var treatmentProgramEntities = treatmentProgramRepository.findAll();
        var treatmentProgramList = new ArrayList<TreatmentProgram>();
        treatmentProgramEntities.stream().map(TreatmentProgram::convertToTreatmentProgram).forEach(treatmentProgramList::add);
        return treatmentProgramList;
    }

    public TreatmentProgramEntity getTreatmentProgramById(Integer id) throws TreatmentProgramNotFoundException {
        var entity = treatmentProgramRepository.findById(id);
        return entity.orElseThrow(TreatmentProgramNotFoundException::new);
    }

    public void deleteTreatmentProgram(Integer id) throws TreatmentProgramNotFoundException {
        if (treatmentProgramRepository.existsById(id)) {
            treatmentProgramRepository.deleteById(id);
        } else {
            throw new TreatmentProgramNotFoundException();
        }
    }

    public void setDiagnosis(Integer treatmentId, String diagnosis) throws TreatmentProgramNotFoundException {
        var treatment = treatmentProgramRepository.findById(treatmentId).orElseThrow(TreatmentProgramNotFoundException::new);
        treatment.setDiagnosis(diagnosis);
        treatmentProgramRepository.save(treatment);
    }
}
