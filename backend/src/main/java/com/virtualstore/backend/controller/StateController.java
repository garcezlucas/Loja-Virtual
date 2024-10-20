package com.virtualstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.virtualstore.backend.entity.State;
import com.virtualstore.backend.service.StateService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/state")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("/")
    public List<State> getAllStates() {
        return stateService.getAllStates();
    }

    @PostMapping("/")
    public State createState(@RequestBody State state) {
        return stateService.create(state);
    }

    @PutMapping("/")
    public State updateState(@RequestBody State state) {
        return stateService.update(state);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeState(@PathVariable("id") Long id) {
        stateService.remove(id);
        return ResponseEntity.ok().build();
    }

}
