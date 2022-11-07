package com.usersbackend.controller;

import com.usersbackend.user.UserRepository;
import com.usersbackend.user.UserType;
import com.usersbackend.user.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class UserTypeController {

    @Autowired
    private UserTypeRepository userTypeRepository;

    @GetMapping("/user_types")
    public @ResponseBody Iterable<UserType> getUserTypes() {
        return userTypeRepository.findAll();
    }

    @PostMapping("/user_types")
    public @ResponseBody UserType addUserType(@RequestBody UserType userType) {
        userTypeRepository.save(userType);
        return userType;
    }

    @DeleteMapping("/user_types")
    public ResponseEntity deleteUserType(@RequestParam int id) {
        userTypeRepository.deleteById(id);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/user_types")
    public ResponseEntity editUserType(@RequestBody UserType userType) {
        UserType target = userTypeRepository.findById(userType.getId()).get();
        target.setType(userType.getType());
        userTypeRepository.save(target);
        return ResponseEntity.ok(userType);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }
}
