package com.joe.fin.member;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberDTO {
    private Integer memberId;
    private String email;
    private String displayName;
    private String membershipType;
}
