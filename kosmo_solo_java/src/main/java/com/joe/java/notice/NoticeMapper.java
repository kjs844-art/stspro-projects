package com.joe.java.notice;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/*
 * ============================================================
 * NoticeMapper - MyBatis Mapper Interface
 * 
 * This is the "bridge" between Java code and SQL queries.
 * - @Mapper tells Spring to create an object that implements
 *   these methods automatically.
 * - Each method name matches an <select>/<insert>/<update>/<delete>
 *   tag in NoticeMapper.xml by its "id" attribute.
 * - Return type determines what MyBatis builds from the result.
 * ============================================================
 */
@Mapper
public interface NoticeMapper {
    // C: Create
    int insertNotice(NoticeDTO notice);
    
    // R: Read (list)
    List<NoticeDTO> selectNoticeList();
    
    // R: Read (one by id)
    NoticeDTO selectNoticeById(Long noticeId);
    
    // U: Update
    int updateNotice(NoticeDTO notice);
    
    // D: Delete
    int deleteNotice(Long noticeId);
    
    // Extra: increment hit count when someone views an article
    int updateHit(Long noticeId);
}
