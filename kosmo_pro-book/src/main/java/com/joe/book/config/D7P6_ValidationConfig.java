package com.joe.book.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

// 이 클래스는 사용자가 입력한 데이터가 올바른지 검사(유효성 검사)하는 설정을 담당합니다.
// 예를 들어, 책 제목을 비워두거나, 가격에 문자를 입력하는 등의 실수를 막기 위해 사용됩니다.
@Configuration // 스프링에게 "이 클래스는 프로젝트의 환경 설정 파일이야!"라고 알려줍니다.
public class D7P6_ValidationConfig {

    // @Bean은 스프링이 관리하는 객체(부품)를 생성해서 등록하라는 의미입니다.
    // 여기서는 LocalValidatorFactoryBean을 등록하여, 어노테이션(@NotNull, @Size 등)을 통한 검증을 활성화합니다.
    @Bean
    public LocalValidatorFactoryBean validator() {
        // 검증기(Validator) 객체를 새로 만듭니다.
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        // 다 만들어진 검증기를 스프링에게 넘겨줍니다. 이후 컨트롤러에서 @Valid 등으로 자동으로 사용됩니다.
        return bean;
    }
}

