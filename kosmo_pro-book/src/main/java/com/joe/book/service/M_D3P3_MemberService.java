package com.joe.book.service;

import com.joe.book.model.M_D1P2_MemberDTO;

// 이 인터페이스는 서비스가 해야 할 일(메서드)들의 "목차(메뉴판)" 역할을 합니다.
// Controller는 이 목차만 보고 명령을 내립니다. 실제 구현은 Impl 클래스에서 합니다.
public interface M_D3P3_MemberService {
    
    // 회원가입: 회원 정보를 받아서 처리 (성공 시 1 반환)
    public int join(M_D1P2_MemberDTO memberDTO) throws Exception;
    
    // 로그인: 아이디/비밀번호를 받아서, 일치하는 회원 정보를 가져옴
    public M_D1P2_MemberDTO login(M_D1P2_MemberDTO memberDTO) throws Exception;
    
}

