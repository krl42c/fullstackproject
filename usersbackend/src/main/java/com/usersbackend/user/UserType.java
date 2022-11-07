package com.usersbackend.user;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.TypeAlias;

import javax.persistence.*;

@Entity
@Table(name = "User_Types")
public class UserType {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String type;

    public UserType(int id, String type) {
        this.id = id;
        this.type = type;
    }

    public UserType() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
