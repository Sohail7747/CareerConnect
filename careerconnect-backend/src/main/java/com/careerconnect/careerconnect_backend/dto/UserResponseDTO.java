package com.careerconnect.careerconnect_backend.dto;

import com.careerconnect.careerconnect_backend.entity.Role;

public class UserResponseDTO {
    private Long id; private String fullName,email,phone,location,headline,about,skills; private Role role;
    public UserResponseDTO(){}
    public UserResponseDTO(Long id,String fullName,String email,Role role,String phone,String location,String headline,String about,String skills){
        this.id=id;this.fullName=fullName;this.email=email;this.role=role;this.phone=phone;this.location=location;this.headline=headline;this.about=about;this.skills=skills;
    }
    public Long getId(){return id;} public void setId(Long v){id=v;}
    public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;}
    public Role getRole(){return role;} public void setRole(Role v){role=v;}
    public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
    public String getLocation(){return location;} public void setLocation(String v){location=v;}
    public String getHeadline(){return headline;} public void setHeadline(String v){headline=v;}
    public String getAbout(){return about;} public void setAbout(String v){about=v;}
    public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
}
