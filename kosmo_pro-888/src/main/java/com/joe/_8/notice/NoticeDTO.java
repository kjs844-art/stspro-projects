package com.joe._8.notice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private int notice_id;
    private String title;
    private String content;
    private String created_at;
}
