<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- JSTL(반복문 등을 쓰기 위한 도구)을 사용하겠다고 선언합니다. --%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Chicken V - 메뉴판</title>
    <style>
        /* 웹 페이지를 예쁘게 꾸미는 CSS 공간입니다. */
        body { font-family: 'Malgun Gothic', sans-serif; background-color: #f8f9fa; padding: 20px; }
        h1 { color: #e67e22; text-align: center; margin-bottom: 40px; }
        
        /* 치킨 카드를 담는 큰 바구니 (그리드 레이아웃) */
        .menu-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        
        /* 개별 치킨 상자(div) 디자인 */
        .chicken-card {
            background: white; border-radius: 15px; padding: 15px; width: 280px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center;
            transition: transform 0.3s;
        }
        .chicken-card:hover { transform: translateY(-10px); } /* 마우스 올리면 살짝 올라감 */
        .chicken-card img { border-radius: 10px; width: 100%; height: 200px; object-fit: cover; }
        .price { font-weight: bold; color: #c0392b; font-size: 1.2em; }
        .badge { background: #27ae60; color: white; padding: 3px 8px; border-radius: 5px; font-size: 0.8em; margin: 0 2px; }
    </style>
</head>
<body>

    <h1>🍗 Chicken V 전체 메뉴판</h1>

    <div class="menu-container">
        <%-- [반복문] 컨트롤러에서 보낸 'menus' 보따리를 하나씩 풀어서 'item'에 담습니다. --%>
        <c:forEach var="item" items="${menus}">
            
            <%-- <div>는 구역을 나누는 '상자'예요. 치킨 한 마리당 상자 하나씩! --%>
            <div class="chicken-card">
                <%-- 치킨 사진 --%>
                <img src="${item.imageUrl}" alt="${item.menuName}" />
                
                <%-- 치킨 이름 --%>
                <h3>${item.menuName}</h3>
                
                <%-- 카테고리 (후라이드, 양념 등) --%>
                <p><small>[${item.category}]</small></p>
                
                <%-- 가격 --%>
                <p class="price">${item.price}원</p>
                
                <%-- 메뉴 설명 --%>
                <p>${item.description}</p>
                
                <%-- 식단 정보 (조건문: 글루텐 프리나 비건일 때만 표시) --%>
                <div style="margin: 10px 0;">
                    <c:if test="${item.glutenFree}"><span class="badge">Gluten-Free</span></c:if>
                    <c:if test="${item.vegan}"><span class="badge">Vegan</span></c:if>
                </div>
                
                <%-- 알레르기 정보 --%>
                <p style="font-size: 0.8em; color: #7f8c8d;">알레르기: ${item.allergyInfo}</p>
            </div>
            <%-- 개별 메뉴 상자 끝 --%>
            
        </c:forEach>
    </div>

</body>
</html>