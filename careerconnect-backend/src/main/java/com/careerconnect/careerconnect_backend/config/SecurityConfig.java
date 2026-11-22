package com.careerconnect.careerconnect_backend.config;

import com.careerconnect.careerconnect_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;
import java.util.List;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtFilter;
    private final String allowedOrigin;
    public SecurityConfig(JwtAuthenticationFilter jwtFilter,
                          @Value("${app.cors.allowed-origin}") String allowedOrigin) {
        this.jwtFilter = jwtFilter;
        this.allowedOrigin = allowedOrigin;
    }

    @Bean PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}

    @Bean SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
        http.cors(c->c.configurationSource(corsConfigurationSource())).csrf(c->c.disable())
            .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a->a
                .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .requestMatchers("/api/auth/register","/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/jobs/recruiter/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.GET,"/api/jobs","/api/jobs/*").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/jobs/recruiter/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.PUT,"/api/jobs/**").hasRole("RECRUITER")
                .requestMatchers(HttpMethod.DELETE,"/api/jobs/**").hasRole("RECRUITER")
                .requestMatchers("/api/applications/apply","/api/applications/my").hasRole("JOB_SEEKER")
                .requestMatchers("/api/applications/recruiter/**","/api/applications/*/status").hasRole("RECRUITER")
                .requestMatchers("/api/users/**").authenticated()
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration c=new CorsConfiguration();
        c.setAllowedOrigins(List.of(allowedOrigin));
        c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        c.setAllowedHeaders(List.of("Authorization","Content-Type"));
        c.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource s=new UrlBasedCorsConfigurationSource();
        s.registerCorsConfiguration("/**",c); return s;
    }
}
