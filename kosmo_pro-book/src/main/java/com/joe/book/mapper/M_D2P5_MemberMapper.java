package com.joe.book.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.joe.book.model.M_D1P2_MemberDTO;

// 이 인터페이스는 MyBatis 프레임워크를 이용해 직접 DB(데이터베이스)와 소통하는 역할을 합니다.
// 이 자바 파일 안의 메서드 이름과, XML 파일 안의 쿼리 id가 정확히 일치해야 합니다!
@Mapper // 스프링과 MyBatis에게 "이건 DB 쿼리를 연결해주는 매퍼야!"라고 알려줍니다.
public interface M_D2P5_MemberMapper {
    
    // 회원가입 쿼리 실행
    // 이 메서드가 호출되면 Step4_MemberMapper.xml의 id="join" 인 SQL 문이 실행됩니다.
    public int join(M_D1P2_MemberDTO memberDTO) throws Exception;
    
    // 로그인 쿼리 실행
    // 이 메서드가 호출되면 Step4_MemberMapper.xml의 id="login" 인 SQL 문이 실행되어,
    // 그 결과가 Step2_MemberDTO 객체에 담겨 돌아옵니다.
    public M_D1P2_MemberDTO login(M_D1P2_MemberDTO memberDTO) throws Exception;
    
}

