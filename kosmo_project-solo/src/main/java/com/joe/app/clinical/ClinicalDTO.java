package com.joe.app.clinical;

import lombok.Data;

/*
 * ================================================================
 * [Phase 3] - 파일 (10)번 : ClinicalDTO.java
 * ================================================================
 *
 * [왜 이 파일이 10번째로 만들어지나?]
 *
 * Phase 2에서 DTO → Service → Controller → JSP 순서를 배웠다.
 * Phase 3도 완전히 동일한 순서로 진행된다.
 * 임상시험 API 데이터를 담을 상자(DTO)를 먼저 설계한다.
 *
 * 이 패턴(DTO → Service → Controller → JSP)은
 * Spring Boot 개발의 핵심 패턴이다. 반복 학습이 중요하다.
 *
 * ----------------------------------------------------------------
 * [ClinicalTrials.gov API 소개]
 *
 * 미국 국립보건원(NIH)에서 운영하는 임상시험 데이터베이스
 * 전 세계 임상시험 데이터를 무료로 제공 (API 키 불필요!)
 *
 * 호출 URL 예시:
 * https://clinicaltrials.gov/api/v2/studies?query.term=cancer&pageSize=5
 *
 * 반환 데이터 구조 (JSON):
 * {
 *   "studies": [
 *     {
 *       "protocolSection": {
 *         "identificationModule": { "briefTitle": "..." },
 *         "statusModule": { "overallStatus": "..." },
 *         "designModule": { "phases": ["PHASE3"] }
 *       }
 *     }
 *   ]
 * }
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Data (Lombok)
 *
 * ② private String nctId;
 *    → 임상시험 고유번호 (예: "NCT05391074")
 *
 * ③ private String briefTitle;
 *    → 임상시험 제목 (예: "A Study of Drug X in Cancer Patients")
 *
 * ④ private String overallStatus;
 *    → 진행 상태 (예: "RECRUITING", "COMPLETED", "TERMINATED")
 *
 * ⑤ private String phase;
 *    → 임상시험 단계 (예: "PHASE1", "PHASE2", "PHASE3")
 *
 * ⑥ private String condition;
 *    → 연구 대상 질환 (예: "Cancer", "Diabetes")
 *
 * ----------------------------------------------------------------
 * [왜 임상시험 데이터가 주식과 연관되나?]
 *
 * 제약/바이오 회사의 임상시험 결과는 주가에 직접 영향을 미친다.
 * - PHASE3 성공 → 주가 급등
 * - 임상시험 실패 → 주가 급락
 * 이것이 BioPulse 프로젝트의 핵심 아이디어!
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (11)번 ClinicalService.java
 *    이유: DTO 구조가 정해졌으니, API를 호출해서
 *    그 결과를 DTO에 담는 Service를 만든다.
 *
 * ================================================================
 */

@Data

public class ClinicalDTO {

    private String nctId;
    private String briefTitle;
    private String overallStatus;
    private String phase;
    private String condition;

}
