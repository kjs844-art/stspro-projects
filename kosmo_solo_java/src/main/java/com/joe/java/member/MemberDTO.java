package com.joe.java.member;

import lombok.Data;
import java.time.LocalDateTime;

/*
 * ============================================================
 * MemberDTO - Data Transfer Object for member table
 * 
 * Each private field maps to a column in the "member" table.
 * @Data generates: getters, setters, toString, equals, hashCode
 * 
 * UNIQUE on userId means no two members can have the same id.
 * ============================================================
 */
@Data
public class MemberDTO {
    private Long memberId;       // BIGINT AUTO_INCREMENT PRIMARY KEY
    private String userId;       // VARCHAR(50) NOT NULL UNIQUE
    private String password;     // VARCHAR(200) NOT NULL
    private String name;         // VARCHAR(50) NOT NULL
    private String email;        // VARCHAR(100)
    private String phone;        // VARCHAR(20)
    private String role;         // VARCHAR(20) DEFAULT 'USER'
    private LocalDateTime regDate;  // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}
