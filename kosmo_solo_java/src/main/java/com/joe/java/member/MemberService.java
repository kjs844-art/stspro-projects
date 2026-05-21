package com.joe.java.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/*
 * ============================================================
 * MemberService - Business Logic for Member operations
 * 
 * Service layer sits between Controller and Mapper.
 * It could add validation, encryption, or other logic later.
 * ============================================================
 */
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    // Register a new member
    public int insertMember(MemberDTO member) {
        return memberMapper.insertMember(member);
    }

    // Get all members
    public List<MemberDTO> selectMemberList() {
        return memberMapper.selectMemberList();
    }

    // Get one member by their PK
    public MemberDTO selectMemberById(Long memberId) {
        return memberMapper.selectMemberById(memberId);
    }

    // Find a member by their login ID (used in login check)
    public MemberDTO selectMemberByUserId(String userId) {
        return memberMapper.selectMemberByUserId(userId);
    }

    // Update member info
    public int updateMember(MemberDTO member) {
        return memberMapper.updateMember(member);
    }

    // Delete a member
    public int deleteMember(Long memberId) {
        return memberMapper.deleteMember(memberId);
    }
}
