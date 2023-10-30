package facebookOriginal.facebook;

import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;
@Service
public class UserDTOMapper implements Function<User,UserDTO> {

    @Override
    public UserDTO apply(User user) {

        return  new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getGender()


        );
    }
}
