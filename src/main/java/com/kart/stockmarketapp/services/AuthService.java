package com.kart.stockmarketapp.services;

import com.kart.stockmarketapp.dto.SignupRequest;

public interface AuthService {
    boolean createCustomer(SignupRequest signupRequest);
}
