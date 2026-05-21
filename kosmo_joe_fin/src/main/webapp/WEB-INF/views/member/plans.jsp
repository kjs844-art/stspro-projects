<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Membership Plans</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; }
a { color: #0b5cad; text-decoration: none; }
.plans { display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 16px; margin-top: 20px; }
.plan { border: 1px solid #ddd; border-radius: 6px; padding: 20px; background: #fff; }
.plan h2 { margin-top: 0; }
.badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #edf2ff; font-size: 13px; }
li { margin: 8px 0; }
.notice { margin-top: 20px; color: #666; font-size: 14px; }
</style>
</head>
<body>
	<p><a href="/">← 홈으로</a></p>
	<h1>회원 권한 정책</h1>

	<div class="plans">
		<section class="plan">
			<h2>FREE <span class="badge">학습/체험</span></h2>
			<ul>
				<li>뉴스 표시 개수: ${freePlan.newsLimit}</li>
				<li>ETF 구성 종목 표시 개수: ${freePlan.etfHoldingLimit}</li>
				<li>기술적 분석: ${freePlan.showTechnicalAnalysis}</li>
				<li>백테스트 가능: ${freePlan.allowBacktest}</li>
				<li>AI 리포트: ${freePlan.showAiReport}</li>
			</ul>
		</section>

		<section class="plan">
			<h2>PREMIUM <span class="badge">확장 분석</span></h2>
			<ul>
				<li>뉴스 표시 개수: 무제한</li>
				<li>ETF 구성 종목 표시 개수: 무제한</li>
				<li>기술적 분석: ${premiumPlan.showTechnicalAnalysis}</li>
				<li>백테스트 가능: ${premiumPlan.allowBacktest}</li>
				<li>백테스트 최대 연도: ${premiumPlan.maxBacktestYears}년</li>
				<li>AI 리포트: ${premiumPlan.showAiReport}</li>
			</ul>
		</section>
	</div>

	<p class="notice">현재는 포트폴리오용 권한 정책 화면이며, 실제 결제 기능은 이후 단계에서 연결합니다.</p>
</body>
</html>
