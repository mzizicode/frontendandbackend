package facebookOriginal.facebook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository("jpa")
public class UserJPADataAccessService implements UserDao {

    private final UserRepository userRepository;

    public UserJPADataAccessService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> selectAllUsers() {
        Page<User> page = userRepository.findAll(Pageable.ofSize(1000));
        return page.getContent();
    }

    @Override
    public Optional<User> selectUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void insertUser(User user) {
        userRepository.save(user);

    }

    @Override
    public boolean existsUserWithEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    @Override
    public boolean existsUserById(Integer id) {
        return userRepository.existsUserById(id);
    }

    @Override
    public void deleteUserById(Integer userId) {
        userRepository.deleteById(userId);

    }

    @Override
    public void updateUser(User update) {
        userRepository.save(update);

    }
}
