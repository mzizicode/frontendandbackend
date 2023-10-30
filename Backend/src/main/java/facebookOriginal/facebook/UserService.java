package facebookOriginal.facebook;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserDao userDao;
    private final UserDTOMapper userDTOMapper;

    public UserService(UserDao userDao, UserDTOMapper userDTOMapper) {
        this.userDao = userDao;
        this.userDTOMapper = userDTOMapper;
    }

    public List<UserDTO> getAllUsers() {
        return userDao.selectAllUsers()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(int id) {
        return userDao.selectUserById(id).map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(id)
                ));
    }


    public void addUser(UserRegistrationRequest request) {
        String email = request.email();
        if (userDao.existsUserWithEmail(email)) {
            throw new DuplicateResourceException(
                    "email already exist"
            );
        }
        User user = new User(
                request.id(),
                request.name(),
                request.gender(),
                request.email());
        userDao.insertUser(user);
    }

    public void deleteUserById(Integer userId) {
        checkIfUserExistOrThrow(userId);
        userDao.deleteUserById(userId);
    }

    private void checkIfUserExistOrThrow(Integer userId) {
        if (!userDao.existsUserById(userId)) {
            throw new ResourceNotFoundException(
                    "user with id [%s] not found".formatted(userId)
            );
        }
    }

    public void updateUser(Integer userId, UsersUpdateRequest updateRequest) {

        User users = userDao.selectUserById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("user with id [%s] not found".formatted(userId)));

        boolean changes = false;


        if (updateRequest.name() != null && !updateRequest.name().equals(users.getName())) {
            users.setName(updateRequest.name());
            changes = true;
        }

        if (updateRequest.email() != null && !updateRequest.email().equals(users.getEmail())) {
            if (userDao.existsUserWithEmail(updateRequest.email())) {
                throw new DuplicateResourceException(
                        "email already taken"
                );
            }
            users.setEmail(updateRequest.email());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("no data changes found");
        }

          userDao.updateUser(users);
    }



}


  






