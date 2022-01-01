package com.controllers;

import com.beans.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping(path = "/user")
    public List<User> getAllUsers(){
        return userService.getAllUsers();

    }

    @PostMapping(path = "/user")
    public ResponseEntity<User> addUser(@RequestBody String data){
        ObjectMapper objectMapper= new ObjectMapper();
        User user= new User();
        try {
            user= objectMapper.readValue(data,User.class);
            user=userService.addUser(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

        catch (Exception e) {
            if( e instanceof DataIntegrityViolationException)
                return new ResponseEntity("please provide a differnet mobile number",HttpStatus.BAD_REQUEST);
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @PutMapping(path = "/user")
    public ResponseEntity<User> updateUser(@RequestBody String data){
        ObjectMapper objectMapper= new ObjectMapper();
        User user= new User();
        try {
            user= objectMapper.readValue(data,User.class);
            user=userService.updateUer(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @DeleteMapping(path = "/user")
    public ResponseEntity<String> deleteUser(@RequestParam long userId){
        int res=userService.deleteUser(userId);
        if(res==1)
            return new ResponseEntity<>( HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
