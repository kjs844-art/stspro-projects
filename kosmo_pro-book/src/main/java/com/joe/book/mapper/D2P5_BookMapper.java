package com.joe.book.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.joe.book.model.D1P2_BookDTO;

// 🗺️ MyBatis와 자바를 연결해주는 인터페이스(Mapper)입니다.
// 이 인터페이스의 메서드 이름과 D2P6_BookMapper.xml의 id가 똑같아야 연결됩니다!
@Mapper // "이건 MyBatis 매퍼야!"라고 스프링에게 알려줍니다.
public interface D2P5_BookMapper {

    // 📋 전체 도서 목록 가져오기
    // 흐름: Service에서 호출 -> 여기서 DB로 SQL 날림 -> 결과를 List<BookDTO>에 담아서 반환
    List<D1P2_BookDTO> selectAll() throws Exception;

    // 🔍 특정 도서 1권 가져오기 (id로 찾기)
    // 흐름: 수정 폼이나 상세보기 페이지 만들 때 사용됨
    D1P2_BookDTO selectOne(int id) throws Exception;

    // ➕ 새로운 도서 저장하기
    // 흐름: Controller(DTO) -> Service -> 여기서 XML의 <insert id="insert"> 실행
    int insert(D1P2_BookDTO bookDTO) throws Exception;

    // ✏️ 기존 도서 정보 수정하기
    // 흐름: XML의 <update id="update"> 실행
    int update(D1P2_BookDTO bookDTO) throws Exception;

    // 🗑️ 도서 삭제하기
    // 흐름: XML의 <delete id="delete"> 실행 (WHERE id = #{id})
    int delete(int id) throws Exception;
}

