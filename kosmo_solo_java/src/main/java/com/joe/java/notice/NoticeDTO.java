package com.joe.java.notice;

import lombok.Data;
import java.time.LocalDateTime;

/*
 * ============================================================
 * NoticeDTO - Data Transfer Object
 * Maps to the 'notice' table in the database.
 * 
 * @Data = @Getter + @Setter + @ToString + @EqualsAndHashCode
 * Lombok generates all the boilerplate code automatically.
 * 
 * The field names use camelCase (noticeId) but the DB columns
 * use snake_case (notice_id). MyBatis maps them automatically
 * because we set map-underscore-to-camel-case=true.
 * ============================================================
 */
@Data
public class NoticeDTO {
    private Long noticeId;       // BIGINT AUTO_INCREMENT PRIMARY KEY
    private String title;        // VARCHAR(200) NOT NULL
    private String content;      // TEXT
    private String writer;       // VARCHAR(50) NOT NULL
    private int hit;             // INT DEFAULT 0
    private LocalDateTime regDate;  // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    private LocalDateTime modDate;  // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}
