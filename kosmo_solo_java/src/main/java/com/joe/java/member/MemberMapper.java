package com.joe.java.member;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/*
 * ============================================================
 * MemberMapper - MyBatis Mapper Interface for Member
 * 
 * Each method corresponds to an <select>/<insert>/<update>/<delete>
 * in MemberMapper.xml.
 * ============================================================
 */
@Mapper
public interface MemberMapper {
    // C: Create (register a new member)
    int insertMember(MemberDTO member);
    
    // R: Read all members
    List<MemberDTO> selectMemberList();
    
    // R: Read one by memberId
    MemberDTO selectMemberById(Long memberId);
    
    // R: Read one by userId (for login check)
    MemberDTO selectMemberByUserId(String userId);
    
    // U: Update member info
    int updateMember(MemberDTO member);
    
    // D: Delete a member
    int deleteMember(Long memberId);
}
