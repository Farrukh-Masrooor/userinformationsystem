package com.services;

import com.beans.User;
import com.repositoroy.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUsers(){
        List<User> userList= new ArrayList<>();
        userRepo.findAll().forEach(user -> userList.add(user));
        return userList;
    }

    public User addUser(User user){
        User userNew=userRepo.save(user);
        return user;
    }

    public User updateUer(User user){
        User userOld=userRepo.findById(user.getUserId()).get();
        userOld= user;
        userRepo.save(userOld);

        return user;
    }

    public int deleteUser(long id){
        if(userRepo.findById(id).isPresent())
            {
                userRepo.deleteById(id);
                return 1;
            }
        else
            return 0;

    }
}
