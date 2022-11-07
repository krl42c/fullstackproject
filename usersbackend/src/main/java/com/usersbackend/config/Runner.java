package com.usersbackend.config;

import com.usersbackend.user.User;
import com.usersbackend.user.UserRepository;
import com.usersbackend.user.UserType;
import com.usersbackend.user.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Runner implements CommandLineRunner {
    @Autowired
    private UserTypeRepository userTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        UserType admin = new UserType(1,"Admin");
        if(userTypeRepository.count() == 0) {
            userTypeRepository.save(admin);
        }
        if(userRepository.count() == 0) {
            userRepository.save(new User(1,"John", "Doe", "john@mail.com",admin ));
        }
    }
}
