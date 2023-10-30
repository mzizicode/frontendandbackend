package facebookOriginal.facebook;

public record UserRegistrationRequest(
        int  id,
        String name,
        String email,
        Gender gender

) {
}
