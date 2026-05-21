package com.joe.java.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/*
 * ============================================================
 * NoticeService - Business Logic Layer
 * 
 * @Service: marks this as a Spring-managed bean
 * @RequiredArgsConstructor: Lombok generates a constructor that
 *   accepts all "final" fields. Spring uses this constructor
 *   to inject the NoticeMapper dependency.
 * 
 * The Controller calls these methods. Each method just
 * delegates to the Mapper (which runs the actual SQL).
 * ============================================================
 */
@Service
@RequiredArgsConstructor  // Creates constructor for final fields
public class NoticeService {

    // final means: must be set once in constructor, never reassigned
    private final NoticeMapper noticeMapper;

    // R: Return all notices as a List
    public List<NoticeDTO> selectNoticeList() {
        return noticeMapper.selectNoticeList();
    }

    // R: Return one notice by its ID
    public NoticeDTO selectNoticeById(Long noticeId) {
        return noticeMapper.selectNoticeById(noticeId);
    }

    // C: Insert a new notice, return number of rows affected
    public int insertNotice(NoticeDTO notice) {
        return noticeMapper.insertNotice(notice);
    }

    // U: Update an existing notice
    public int updateNotice(NoticeDTO notice) {
        return noticeMapper.updateNotice(notice);
    }

    // D: Delete a notice by ID
    public int deleteNotice(Long noticeId) {
        return noticeMapper.deleteNotice(noticeId);
    }

    // Extra: Increase the hit (view count) by 1
    public int updateHit(Long noticeId) {
        return noticeMapper.updateHit(noticeId);
    }
}
