package com.usersbackend.controller;

import com.usersbackend.user.User;
import com.usersbackend.user.UserRepository;
import com.usersbackend.user.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserTypeRepository userTypeRepository;

    @GetMapping("/users")
    public @ResponseBody Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public @ResponseBody User addUser(@RequestBody User user) {
        userRepository.save(user);
        return user;
    }

    @DeleteMapping(path = "/users")
    public ResponseEntity deleteUser(@RequestParam int id) {
        System.out.println("Deleting user with ID " + id);
        User temp = userRepository.findById(id).get();
        userRepository.delete(temp);
        return ResponseEntity.ok(temp);
    }

    @PutMapping(path = "/users")
    public ResponseEntity editUser(@RequestBody User editUser) {
        User user = userRepository.findById(editUser.getId()).get();

        user.setName(editUser.getName());
        user.setLast_name(editUser.getLast_name());
        user.setEmail(editUser.getEmail());
        user.setUser_type(editUser.getUser_type());
        userRepository.save(user);
        return ResponseEntity.ok(editUser);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }
}
