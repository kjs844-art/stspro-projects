package com.kosmo.pro888.notice;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NoticeDTO {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
}
