-- ============================================================
-- schema.sql: Creates tables when the app starts
-- H2 runs in "mem:testdb" mode, so tables are created fresh
-- every time the server starts (data resets on restart)
-- ============================================================

-- ============================================================
-- NOTICE table: stores notice board articles
-- AUTO_INCREMENT: H2 automatically assigns the next number
-- PRIMARY KEY: uniquely identifies each row
-- DEFAULT: values automatically filled if not provided
-- ============================================================
CREATE TABLE IF NOT EXISTS notice (
    notice_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    writer VARCHAR(50) NOT NULL,
    hit INT DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- MEMBER table: stores user accounts
-- ============================================================
CREATE TABLE IF NOT EXISTS member (
    member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'USER',
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- QNA / QnA table: stores questions and answers
-- ============================================================
CREATE TABLE IF NOT EXISTS qna (
    qna_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    writer VARCHAR(50) NOT NULL,
    hit INT DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mod_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
