/*
 * [학습용 주석 - 1단계: 정적 리소스 설정]
 * 이 파일은 오징어 포차(Oopo) 사이트의 화면 애니메이션 및 사이드 드로어 제어를 담당합니다.
 */

// 네비게이션 드로어 열기/닫기 제어
function openDrawer() {
    document.body.classList.add('drawer-open');
}

function closeDrawer() {
    document.body.classList.remove('drawer-open');
    const menuList = document.getElementById('drawer-menu-list');
    if (menuList) menuList.classList.remove('open');
    const menuToggle = document.getElementById('drawer-menu-toggle');
    if (menuToggle) menuToggle.classList.remove('is-open');
}

function toggleDrawerMenu() {
    const list = document.getElementById('drawer-menu-list');
    const toggle = document.getElementById('drawer-menu-toggle');
    if (list) list.classList.toggle('open');
    if (toggle) toggle.classList.toggle('is-open');
}

// 부드러운 스크롤 애니메이션 옵저버 (스크롤 시 요소 등장)
function initObs() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.07 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// DOM이 완전히 로드된 후 옵저버 초기화
document.addEventListener('DOMContentLoaded', function () {
    initObs();
});
