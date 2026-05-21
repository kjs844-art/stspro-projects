-- [미션 2] 치킨 메뉴 테이블 생성 스크립트
-- H2 데이터베이스 문법 기준 (앱 시작 시 자동 실행)

DROP TABLE IF EXISTS menu_table;

CREATE TABLE menu_table (
    menuId       BIGINT AUTO_INCREMENT PRIMARY KEY,
    menuName     VARCHAR(100) NOT NULL,
    price        INT NOT NULL,
    description  VARCHAR(255),
    category     VARCHAR(50),
    isGlutenFree BOOLEAN DEFAULT FALSE,
    isVegan      BOOLEAN DEFAULT FALSE,
    allergyInfo  VARCHAR(255),
    imageUrl     VARCHAR(500)
);

-- 테스트용 초기 데이터 1개 슬쩍 넣어두기
INSERT INTO menu_table (menuName, price, description, category, isGlutenFree, isVegan, allergyInfo, imageUrl)
VALUES ('황금올리브 치킨', 20000, '바삭함의 대명사, 치킨 브이의 시그니처 메뉴!', '후라이드', FALSE, FALSE, '대두, 밀 함유', 'https://example.com/chicken1.jpg');
