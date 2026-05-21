package com.joe.book.service;

import org.springframework.stereotype.Service;
import com.joe.book.mapper.M_D2P5_MemberMapper;
import com.joe.book.model.M_D1P2_MemberDTO;

import lombok.RequiredArgsConstructor;

// 이 클래스는 Step3_MemberService(목차)를 실제로 구현(Implementation)하는 곳입니다.
// "비즈니스 로직(실제 기능 처리)"을 담당합니다.
@Service // 스프링에게 "이건 핵심 작업을 처리하는 서비스 로직이야!"라고 알려줍니다.
@RequiredArgsConstructor // final 변수를 위한 생성자를 자동 생성합니다.
public class M_D4P4_MemberServiceImpl implements M_D3P3_MemberService {

    // 서비스는 혼자서 DB에 접근할 수 없으므로, 매퍼(Step4_MemberMapper)에게 DB 접근을 부탁합니다.
    private final M_D2P5_MemberMapper memberMapper;

    // 1. 회원가입 실제 처리 로직
    @Override
    public int join(M_D1P2_MemberDTO memberDTO) throws Exception {
        // 매퍼의 join 메서드를 호출해서 DB에 회원 데이터를 INSERT 하라고 지시합니다.
        return memberMapper.join(memberDTO);
    }

    // 2. 로그인 실제 처리 로직
    @Override
    public M_D1P2_MemberDTO login(M_D1P2_MemberDTO memberDTO) throws Exception {
        // 매퍼의 login 메서드를 호출해서 DB에서 해당 회원이 있는지 SELECT 해오라고 지시합니다.
        return memberMapper.login(memberDTO);
    }

}

