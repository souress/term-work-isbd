package klmnkki.repositories;

import klmnkki.entities.LabelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabelRepository extends JpaRepository<LabelEntity, Integer> {
    Optional<LabelEntity> findByName(String name);
}
