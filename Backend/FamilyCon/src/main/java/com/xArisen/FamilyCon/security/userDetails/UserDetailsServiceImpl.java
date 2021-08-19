package com.xArisen.FamilyCon.security.userDetails;

import com.xArisen.FamilyCon.models.User;
import com.xArisen.FamilyCon.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserService userService;

    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException, DataAccessException {
        User domainUser = userService.getUserByName(name);
        if (domainUser == null) {
            throw new UsernameNotFoundException("Could not find user with name '" + name + "'");
        }
        return new UserDetailsImpl(domainUser, null);
    }
}
