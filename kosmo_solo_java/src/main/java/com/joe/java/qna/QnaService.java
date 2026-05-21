package com.joe.java.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/*
 * ============================================================
 * QnaService - Business Logic for QnA operations
 * 
 * Delegates all DB calls to QnaMapper.
 * ============================================================
 */
@Service
@RequiredArgsConstructor
public class QnaService {

    private final QnaMapper qnaMapper;

    public List<QnaDTO> selectQnaList() {
        return qnaMapper.selectQnaList();
    }

    public QnaDTO selectQnaById(Long qnaId) {
        return qnaMapper.selectQnaById(qnaId);
    }

    public int insertQna(QnaDTO qna) {
        return qnaMapper.insertQna(qna);
    }

    public int updateQna(QnaDTO qna) {
        return qnaMapper.updateQna(qna);
    }

    public int deleteQna(Long qnaId) {
        return qnaMapper.deleteQna(qnaId);
    }

    public int updateHit(Long qnaId) {
        return qnaMapper.updateHit(qnaId);
    }
}
