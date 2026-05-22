package com.joe.fin.shadow;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShadowRiskDTO {
    private String keyword;
    private int score;
    private String riskLevel;
    private int articleCount;
    private int sanctionMentions;
    private int cyberMentions;
    private int launderingMentions;
    private String dataSource;
    private String message;
    private List<ShadowRiskNewsDTO> news;

    @Getter
    @Setter
    public static class ShadowRiskNewsDTO {
        private String title;
        private String sourceCountry;
        private String domain;
        private String url;
        private String seenDate;
    }
}
