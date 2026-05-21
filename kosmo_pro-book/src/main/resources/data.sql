-- data.sql
-- schema.sql 실행 이후 자동으로 이 파일 실행됨
-- 테이블이 만들어진 직후 샘플 데이터를 넣어줌
-- 앱 시작할 때마다 실행되므로, H2 인메모리 DB에서는 항상 이 데이터로 시작

-- 샘플 도서 데이터 3건
-- id는 AUTO_INCREMENT 라서 안 써도 됨 (DB가 자동으로 1, 2, 3 부여)
-- Step4_BookMapper.xml의 INSERT SQL과 컬럼명 일치해야 함!

INSERT INTO book (title, author, publisher) VALUES ('자바의 정석', '남궁성', '도우출판');
INSERT INTO book (title, author, publisher) VALUES ('스프링 부트 입문', '김영한', '인프런');
INSERT INTO book (title, author, publisher) VALUES ('클린 코드', '로버트 마틴', '인사이트');

INSERT INTO member (username, password, name) VALUES ('user1', '1234', '홍길동');
