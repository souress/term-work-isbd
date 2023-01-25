package klmnkki.repositories;

import klmnkki.entities.TreatmentProgramEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentProgramRepository extends JpaRepository<TreatmentProgramEntity, Integer> {
}
