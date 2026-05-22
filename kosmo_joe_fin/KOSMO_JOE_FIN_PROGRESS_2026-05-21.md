# KOSMO_JOE_FIN Progress

created: 2026-05-21

## Today Result

`FREE / PREMIUM` access policy is now connected to the actual stock and ETF detail pages.

Run URL:

```text
http://localhost:18085
```

## Completed

### 1. Stock Detail Access Policy

URL examples:

```text
/stocks/search?ticker=NVDA&plan=FREE
/stocks/search?ticker=NVDA&plan=PREMIUM
```

Files:

```text
src/main/java/com/joe/fin/stock/StockController.java
src/main/java/com/joe/fin/news/NewsService.java
src/main/webapp/WEB-INF/views/stock/detail.jsp
```

Behavior:

```text
FREE    -> shows 3 news memo cards and a locked notice
PREMIUM -> shows 5 news memo cards and no locked notice
```

### 2. ETF Detail Access Policy

URL examples:

```text
/etfs/search?ticker=QQQ&plan=FREE
/etfs/search?ticker=QQQ&plan=PREMIUM
```

Files:

```text
src/main/java/com/joe/fin/etf/ETFController.java
src/main/java/com/joe/fin/etf/ETFService.java
src/main/webapp/WEB-INF/views/etf/detail.jsp
```

Behavior:

```text
FREE    -> shows 5 ETF holdings and a locked notice
PREMIUM -> shows 8 ETF holdings and no locked notice
```

### 3. Running Server

The app was launched with:

```text
gradlew bootRun --args=--server.port=18085
```

Current verified PID:

```text
34592
```

Logs:

```text
codex-run-logs/bootrun-18085.out.log
codex-run-logs/bootrun-18085.err.log
```

### 4. Watchlist Save Redirect

Stock and ETF detail pages now send a safe `redirectTo` value when saving to the watchlist.

Files:

```text
src/main/java/com/joe/fin/watchlist/WatchlistController.java
src/main/webapp/WEB-INF/views/stock/detail.jsp
src/main/webapp/WEB-INF/views/etf/detail.jsp
```

Behavior:

```text
Save from stock detail -> returns to /stocks/search?ticker=...&plan=...
Save from ETF detail   -> returns to /etfs/search?ticker=...&plan=...
External redirect URL  -> blocked and falls back to /watchlist
```

## Verified

Compile/resource check:

```text
gradlew compileJava processResources --no-daemon
BUILD SUCCESSFUL
```

HTTP checks:

```text
http://localhost:18085/ => 200
http://localhost:18085/stocks/search?ticker=NVDA&plan=FREE => 200
http://localhost:18085/stocks/search?ticker=NVDA&plan=PREMIUM => 200
http://localhost:18085/etfs/search?ticker=QQQ&plan=FREE => 200
http://localhost:18085/etfs/search?ticker=QQQ&plan=PREMIUM => 200
http://localhost:18085/members/plans => 200
http://localhost:18085/watchlist => 200
http://localhost:18085/api/stocks/NVDA => 200
```

Access policy checks:

```text
stock FREE news cards = 3
stock PREMIUM news cards = 5
ETF FREE holdings = 5
ETF PREMIUM holdings = 8
```

Redirect checks:

```text
POST /watchlist redirectTo=/stocks/search?ticker=MSFT&plan=PREMIUM => 302 stock detail
POST /watchlist redirectTo=/etfs/search?ticker=SPY&plan=FREE => 302 ETF detail
POST /watchlist redirectTo=https://example.com => 302 /watchlist
```

### 5. Free-First Shadow Risk MVP

Added a first `Shadow Risk Index` screen using a free/public-data-first strategy.

Files:

```text
src/main/java/com/joe/fin/shadow/ShadowRiskDTO.java
src/main/java/com/joe/fin/shadow/ShadowRiskService.java
src/main/java/com/joe/fin/shadow/ShadowRiskController.java
src/main/webapp/WEB-INF/views/shadow/detail.jsp
```

URL:

```text
http://localhost:18085/shadow-risk
http://localhost:18085/shadow-risk?keyword=crypto
```

Current behavior:

```text
Primary free API target: GDELT DOC public API
Fallback: demo risk data when the free API is slow or rate-limited
```

The screen calculates a portfolio-style score from:

```text
article count
sanctions keywords
cyber/ransomware/breach keywords
laundering/illicit/fraud keywords
```

Important:

```text
This is defensive/public-risk analysis, not direct dark-web crawling.
```

## Next Work

### Priority 1

Make the selected plan visible on search pages too, not only detail pages.

### Priority 2

Connect the current local H2 behavior to Supabase profile verification when the user is ready.
