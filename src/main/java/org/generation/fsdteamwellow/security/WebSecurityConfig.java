package org.generation.fsdteamwellow.security;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.thymeleaf.extras.springsecurity6.dialect.SpringSecurityDialect;


import javax.sql.*;

// this is for login and logout
@Configuration // this is to tell spring boot that this is a configuration class
@EnableWebSecurity  // this is to tell spring boot that this is a security class
public class WebSecurityConfig {

    // to use the dependency injection method to inject the datasource interface to the class so that we can use the properties or methods from the DataSource interface
    // purpose is to make use of the details we put in the application-dev.properties file to be able to make connection to our MySQL server and access our schema
    @Autowired
    private DataSource dataSource;

    // make a connection to the database and authenticate the user
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        // when a user is authenticated, Spring Security object will create a user session
        // Spring Security object will also be responsible to manage the user session(eg. timeout, error handling)
        // Spring Security object will need to end the user session when the user logout or timeout

        // In an sql query, we can get the information from the front-end through the ? symbol
        //Sending of the information from the front-end is through the thymeleaf

        //AuthenticationManagerBuilder provides a usersByUsernameQuery method
        //1) query to get the username, password and enabled status from the database that matches the username that the user key in
        //2)  usersByUsernameQuery method will check the if the password matches and check enabled status = 1 if the user is enabled, 0 if the user is disabled
        // 3) authoritiesByUsernameQuery method will check the role of the user
        auth.jdbcAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .dataSource(dataSource)
                .usersByUsernameQuery("select username, password, enabled from user where username=?")
                .authoritiesByUsernameQuery("select username, role from user where username=?");
    }
    /*
    https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/jdbc.html
    */


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // after the user is authenticated, and user has logged in and session is active, we need to setup the security policy for the http pages that we are able to access
        http
                .csrf().disable();  // @CrossOrigin will not work if csrf is not disabled


        http.formLogin().loginPage("/login");


        http.formLogin()
                .successHandler((request, response, authentication) -> {
                    for (GrantedAuthority authority : authentication.getAuthorities()) {
                        if (authority.getAuthority().equals("ROLE_ADMIN")) {
                            response.sendRedirect("/admin_product");
                            return;
                        }
                    }
                    response.sendRedirect("/product");
                });




        http.logout()
                .logoutSuccessUrl("/index");

        // which are the pages that we can access without login
        // which are the page(s) that needs to have an Admin role to access
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/product", "/index","/product/**","/img/**","/js/**","/css/**", "/productImages/**","/login", "/aboutUs", "/project", "/vert_farm").permitAll()
                .requestMatchers("/admin_product/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/product/**").hasRole("ADMIN") // Add this line for delete ability
                .requestMatchers(HttpMethod.PUT, "/product/**").hasRole("ADMIN") // Add this line for update ability

        );
        return http.build();
    }
}
