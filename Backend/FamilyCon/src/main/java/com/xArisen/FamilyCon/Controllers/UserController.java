package com.xArisen.FamilyCon.Controllers;

import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

import static com.xArisen.FamilyCon.security.SecurityConstants.REGISTER_URL;

@Controller
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(REGISTER_URL)
    public ResponseEntity<?> createUser(@Valid @RequestBody User user){
        if(userService.getUserByName(user.getName()) != null){
            return ResponseEntity.badRequest().body("User already created.");
        }
        Long userId = userService.registerUser(user);
        return ResponseEntity.ok(userId);
    }
}
