package facebookOriginal.facebook;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
   boolean existsUserById(Integer id);

   boolean existsUserByEmail(String email);
    // No additional code is needed here since JpaRepository provides CRUD methods
}
