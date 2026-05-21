package com.joe.book.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.joe.book.mapper.D2P5_BookMapper;
import com.joe.book.model.D1P2_BookDTO;
import lombok.RequiredArgsConstructor;

// 🛠️ D3P3_BookService 명세서의 내용을 실제로 구현하는 클래스입니다.
// 실제 DB와 통신하는 매퍼(Mapper)를 호출하여 데이터를 가져오거나 넘깁니다.
@Service // "이 클래스는 비즈니스 로직을 처리하는 서비스야!"라고 스프링에게 알려줍니다.
@RequiredArgsConstructor // final 필드(bookMapper)를 위한 생성자를 자동으로 만들어줍니다.
public class D4P4_BookServiceImpl implements D3P3_BookService {

    // 실제 DB 작업을 수행할 매퍼 객체를 주입받습니다.
    private final D2P5_BookMapper bookMapper;

    @Override
    public List<D1P2_BookDTO> selectAll() throws Exception {
        // 흐름: Controller -> [여기] -> Mapper -> XML -> DB
        // 모든 책 데이터를 리스트로 받아와서 다시 컨트롤러에게 전달합니다.
        return bookMapper.selectAll();
    }

    @Override
    public D1P2_BookDTO selectOne(int id) throws Exception {
        // 특정 아이디(id)에 해당하는 책 1권의 정보를 가져옵니다.
        return bookMapper.selectOne(id);
    }

    @Override
    public int insert(D1P2_BookDTO bookDTO) throws Exception {
        // 사용자가 입력한 책 정보를 DB에 저장합니다.
        return bookMapper.insert(bookDTO);
    }

    @Override
    public int update(D1P2_BookDTO bookDTO) throws Exception {
        // 기존 책 정보를 수정합니다.
        return bookMapper.update(bookDTO);
    }

    @Override
    public int delete(int id) throws Exception {
        // 특정 아이디(id)의 책을 삭제합니다.
        return bookMapper.delete(id);
    }
}

