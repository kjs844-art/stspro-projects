package com.joe.fin.member;

import lombok.Data;

@Data
public class AccessPolicyDTO {

    private boolean premium;
    private int newsLimit;
    private int etfHoldingLimit;
    private boolean showFullFundamental;
    private boolean showTechnicalAnalysis;
    private boolean allowBacktest;
    private int maxBacktestYears;
    private boolean showEarningsTranscript;
    private boolean showShadowImpactPath;
    private boolean showAiReport;

    public static AccessPolicyDTO freePlan() {
        AccessPolicyDTO policy = new AccessPolicyDTO();
        policy.setPremium(false);
        policy.setNewsLimit(3);
        policy.setEtfHoldingLimit(5);
        policy.setShowFullFundamental(false);
        policy.setShowTechnicalAnalysis(false);
        policy.setAllowBacktest(false);
        policy.setMaxBacktestYears(0);
        policy.setShowEarningsTranscript(false);
        policy.setShowShadowImpactPath(false);
        policy.setShowAiReport(false);
        return policy;
    }

    public static AccessPolicyDTO premiumPlan() {
        AccessPolicyDTO policy = new AccessPolicyDTO();
        policy.setPremium(true);
        policy.setNewsLimit(Integer.MAX_VALUE);
        policy.setEtfHoldingLimit(Integer.MAX_VALUE);
        policy.setShowFullFundamental(true);
        policy.setShowTechnicalAnalysis(true);
        policy.setAllowBacktest(true);
        policy.setMaxBacktestYears(3);
        policy.setShowEarningsTranscript(true);
        policy.setShowShadowImpactPath(true);
        policy.setShowAiReport(true);
        return policy;
    }
}

