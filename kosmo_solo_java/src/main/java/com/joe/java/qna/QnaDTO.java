package com.joe.java.qna;

import lombok.Data;
import java.time.LocalDateTime;

/*
 * ============================================================
 * QnaDTO - Data Transfer Object for qna table
 * 
 * Same structure as NoticeDTO but in a separate package
 * to show that similar features can be organized independently.
 * ============================================================
 */
@Data
public class QnaDTO {
    private Long qnaId;          // BIGINT AUTO_INCREMENT PRIMARY KEY
    private String title;        // VARCHAR(200) NOT NULL
    private String content;      // TEXT
    private String writer;       // VARCHAR(50) NOT NULL
    private int hit;             // INT DEFAULT 0
    private LocalDateTime regDate;   // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    private LocalDateTime modDate;   // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}
