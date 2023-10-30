package facebookOriginal.facebook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    void registerUser(@RequestBody UserRegistrationRequest request) {
        userService.addUser(request);
    }
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId") Integer userId) {
        userService.deleteUserById(userId);
    }

    @PutMapping("/{userId}")
    public void updateUser(
            @PathVariable ("userId") Integer userId,
            @RequestBody UsersUpdateRequest updateRequest) {
        userService.updateUser(userId, updateRequest);
    }






}
