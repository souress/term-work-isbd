package klmnkki.repositories;

import klmnkki.entities.MedicineStorageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineStorageRepository extends JpaRepository<MedicineStorageEntity, Integer> {
    MedicineStorageEntity findByMedicineId(Integer id);
}
