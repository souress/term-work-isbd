package klmnkki.repositories;

import klmnkki.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    boolean existsByLogin(String login);

    UserEntity findByLogin(String login);
}
