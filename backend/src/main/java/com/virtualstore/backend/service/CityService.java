package com.virtualstore.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualstore.backend.entity.City;
import com.virtualstore.backend.entity.State;
import com.virtualstore.backend.repository.CityRepository;
import com.virtualstore.backend.repository.StateRepository;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateRepository stateRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City create(City city) {
        Long stateId = city.getState().getId();

        Optional<State> stateOpt = stateRepository.findById(stateId);

        city.setCreationDate(new Date());

        City newCity = cityRepository.saveAndFlush(city);

        City returnCity = newCity;
        returnCity.setState(stateOpt.get());

        return returnCity;
    }

    public City update(City city) {
        city.setUpdateDate(new Date());

        City updateCity = cityRepository.saveAndFlush(city);

        return updateCity;
    }

    public void remove(Long id) {
        City city = cityRepository.findById(id).get();

        cityRepository.delete(city);
    }
}
