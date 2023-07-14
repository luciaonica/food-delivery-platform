package com.genspark.clientprojectmanagement.security;


import com.genspark.clientprojectmanagement.service.UserInfoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserInfoService userInfoService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userInfoService); //set user service
        auth.setPasswordEncoder(passwordEncoder()); //set password encoder
        return auth;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/users/{username}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/users/{username}").hasRole("RESTAURANT")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/{username}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/dev").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/admin/restaurants/dishes/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/admin/restaurants/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/admin/restaurants/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/admin/restaurants/**").hasRole("RESTAURANT")
                        .requestMatchers(HttpMethod.POST, "/admin/activation-requests").hasRole("RESTAURANT")
                        .requestMatchers(HttpMethod.GET, "/admin/activation-requests").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/admin/approve").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/admin/dishes").permitAll()
                        .requestMatchers(HttpMethod.GET, "/admin/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/admin/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/admin/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/admin/**").permitAll()

        );
        // use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

        // disable Cross Site Request Forgery (CSRF)
        // in general, not required for stateless REST APIs that use POST, PUT, DELETE, and/or PATCH
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    //https://docs.spring.io/spring-security/reference/reactive/integrations/cors.html
    // and
    // https://reflectoring.io/spring-cors/
    // and
    // https://www.youtube.com/watch?v=HRwlT_etr60
    //were used for help
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "DELETE", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
