package com.joe.book.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

// 이 클래스는 '다국어 처리'나 '공통 메세지 관리'를 담당하는 설정 파일입니다.
// 예를 들어, 화면에 나오는 "환영합니다"라는 글자를 한글, 영어, 일본어 등 사용자의 설정에 맞춰 
// 다르게 보여주거나, 오류 메세지를 한 곳에서 모아서 관리할 때 사용합니다.
@Configuration // 스프링에게 설정 파일임을 알립니다.
public class D7P11_MessageConfig {

    // MessageSource는 메세지를 읽어오는 핵심 부품(객체)입니다.
    @Bean
    public MessageSource messageSource() {
        // 메세지 파일들(properties)을 묶어서 관리해주는 객체를 만듭니다.
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        
        // src/main/resources 폴더 아래에 있는 'messages'라는 이름의 파일들을 기본으로 읽어오라고 설정합니다.
        // (예: messages_ko.properties, messages_en.properties 등)
        source.setBasename("messages");
        
        // 메세지 파일에 적힌 글자들이 한글일 경우 깨지지 않도록 인코딩을 UTF-8로 맞춰줍니다.
        source.setDefaultEncoding("UTF-8");
        
        // 설정이 완료된 메세지 소스 객체를 스프링에게 넘겨서 프로그램 전반에서 사용할 수 있게 합니다.
        return source;
    }
}

