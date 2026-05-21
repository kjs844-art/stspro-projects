-- schema.sql
-- Spring Boot가 앱 시작할 때 이 파일을 자동으로 실행함
-- H2 DB에 테이블이 없으면 여기서 만들어줌
-- "IF NOT EXISTS" → 이미 테이블이 있으면 무시, 없으면 생성 (오류 방지)

CREATE TABLE IF NOT EXISTS book (
  -- ↑ book 이라는 이름의 테이블 생성
  -- Step4_BookMapper.xml의 SQL에서 "FROM book", "INTO book" 과 이름 일치해야 함!

  id        BIGINT AUTO_INCREMENT PRIMARY KEY,
  -- id = 책 고유번호 (자동으로 1, 2, 3... 증가)
  -- AUTO_INCREMENT = INSERT 할 때 id는 안 써도 DB가 알아서 넣어줌
  -- PRIMARY KEY = 이 컬럼이 식별자 (중복 불가, NULL 불가)
  -- Step2_BookDTO.java의 "Long id" 와 타입 연결됨

  title     VARCHAR(200) NOT NULL,
  -- 책 제목, 최대 200자, 비어있으면 안 됨 (NOT NULL)
  -- Step2_BookDTO.java의 "String title" 과 연결됨

  author    VARCHAR(100),
  -- 저자명, 최대 100자
  -- Step2_BookDTO.java의 "String author" 와 연결됨

  publisher VARCHAR(100)
  -- 출판사명, 최대 100자
  -- Step2_BookDTO.java의 "String publisher" 와 연결됨
);

CREATE TABLE IF NOT EXISTS member (
  username  VARCHAR(50) PRIMARY KEY,
  password  VARCHAR(100) NOT NULL,
  name      VARCHAR(50) NOT NULL,
  role      VARCHAR(20) DEFAULT 'USER'
);
