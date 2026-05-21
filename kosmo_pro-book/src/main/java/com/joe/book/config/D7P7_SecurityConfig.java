package com.joe.book.config;

import org.springframework.context.annotation.Configuration;

// 이 클래스는 스프링 시큐리티(Security)와 관련된 권한, 로그인 등의 설정을 담당하는 곳입니다.
// 현재 프로젝트에서는 시큐리티 라이브러리 대신 직접 만든 인터셉터(D7P8_LoginInterceptor)를 통해 
// 로그인 및 접근 제어를 하고 있으므로, 이곳은 향후 시큐리티 도입을 대비해 만들어둔 자리(Placeholder)입니다.
@Configuration // 설정 파일임을 스프링에 알립니다.
public class D7P7_SecurityConfig {
    // 만약 나중에 Spring Security를 추가한다면, 이 곳에 어떤 주소는 누구나 접근 가능하고,
    // 어떤 주소는 로그인한 사람만 접근 가능한지 등의 규칙(SecurityFilterChain)을 작성하게 됩니다.
    // 또한, 비밀번호를 안전하게 보관하기 위해 암호화하는 PasswordEncoder 설정도 이곳에서 관리하게 됩니다.
}

