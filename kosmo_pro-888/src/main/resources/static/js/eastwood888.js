/*
 * [EXPLAIN-CODE 010] JSP에서 <script src="/js/eastwood888.js"></script>로 불러오는 정적 JS입니다.
 */
document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.querySelector('input[name="bookDate"]');

    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().slice(0, 10);
    }
});
