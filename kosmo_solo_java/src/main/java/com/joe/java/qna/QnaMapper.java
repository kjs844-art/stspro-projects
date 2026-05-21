package com.joe.java.qna;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/*
 * ============================================================
 * QnaMapper - MyBatis Mapper Interface for QnA
 * 
 * Full CRUD + hit counter. Same pattern as NoticeMapper.
 * ============================================================
 */
@Mapper
public interface QnaMapper {
    int insertQna(QnaDTO qna);
    List<QnaDTO> selectQnaList();
    QnaDTO selectQnaById(Long qnaId);
    int updateQna(QnaDTO qna);
    int deleteQna(Long qnaId);
    int updateHit(Long qnaId);
}
