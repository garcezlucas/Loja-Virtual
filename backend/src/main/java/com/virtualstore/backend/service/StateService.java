package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.State;
import com.virtualstore.backend.repository.StateRepository;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public State create(State state) {
        state.setCreationDate(new Date());
        State newState = stateRepository.saveAndFlush(state);
        return newState;
    }

    public State update(State state) {
        state.setUpdateDate(new Date());
        State updateState = stateRepository.saveAndFlush(state);
        return updateState;
    }

    public void remove(Long id) {
        State state = stateRepository.findById(id).get();
        stateRepository.delete(state);

    }
}
