package com.joe.fin.automation;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/automation")
public class AutomationWebhookController {
    private final String webhookSecret;

    public AutomationWebhookController(@Value("${app.automation.webhook-secret:}") String webhookSecret) {
        this.webhookSecret = webhookSecret;
    }

    @GetMapping("/status")
    public Map<String, Object> status() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "ready");
        response.put("app", "kosmo_joe_fin");
        response.put("zapierWebhookPath", "/api/automation/zapier/events");
        response.put("updatedAt", LocalDateTime.now().toString());
        return response;
    }

    @PostMapping("/zapier/events")
    public ResponseEntity<Map<String, Object>> receiveZapierEvent(
            @RequestHeader(value = "X-Kosmo-Automation-Secret", required = false) String requestSecret,
            @RequestBody AutomationEventDTO event) {
        if (isSecretConfigured() && !webhookSecret.equals(requestSecret)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "rejected",
                    "reason", "invalid automation secret"));
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "accepted");
        response.put("receivedAt", LocalDateTime.now().toString());
        response.put("source", valueOrDefault(event.getSource(), "zapier"));
        response.put("eventType", valueOrDefault(event.getEventType(), "manual_test"));
        response.put("keyword", valueOrDefault(event.getKeyword(), ""));
        response.put("ticker", valueOrDefault(event.getTicker(), ""));
        response.put("nextStep", "Later this can trigger DB save, news refresh, risk analysis, or notification.");
        return ResponseEntity.ok(response);
    }

    private boolean isSecretConfigured() {
        return webhookSecret != null && !webhookSecret.isBlank();
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }
}
