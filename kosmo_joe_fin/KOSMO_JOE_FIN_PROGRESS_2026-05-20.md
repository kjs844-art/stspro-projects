# KOSMO_JOE_FIN Progress

created: 2026-05-20

## Today Result

`kosmo_joe_fin` now has a runnable MVP landing page plus stock and ETF search demo pages.

Run URL:

```text
http://localhost:18085
```

## Completed

### 1. Encoding And Config Cleanup

- Added UTF-8 servlet encoding settings.
- Added SQL init UTF-8 setting.
- Fixed MyBatis type alias package from `com.java.fin` to `com.joe.fin`.
- Moved API keys to environment variable placeholders.

Important:

```text
Do not commit real API keys into application.properties.
```

### 2. Home Page

File:

```text
src/main/webapp/WEB-INF/views/index.jsp
```

Added:

- project title
- short service description
- stock search link
- ETF search link
- H2 console link

### 3. Stock Search MVP

URLs:

```text
/stocks
/stocks/search?ticker=NVDA
```

Files:

```text
src/main/java/com/joe/fin/stock/StockController.java
src/main/java/com/joe/fin/stock/StockService.java
src/main/webapp/WEB-INF/views/stock/search.jsp
src/main/webapp/WEB-INF/views/stock/detail.jsp
```

Notes:

- Yahoo Finance API is used when possible.
- If external API fails, fallback demo data is shown for:
  - NVDA
  - AAPL
  - MSFT

This keeps the portfolio demo from breaking during network/API issues.

### 4. ETF Search MVP

URLs:

```text
/etfs
/etfs/search?ticker=QQQ
```

Files:

```text
src/main/java/com/joe/fin/etf/ETFController.java
src/main/java/com/joe/fin/etf/ETFDTO.java
src/main/java/com/joe/fin/etf/ETFService.java
src/main/webapp/WEB-INF/views/etf/search.jsp
src/main/webapp/WEB-INF/views/etf/detail.jsp
```

Demo ETF data:

- QQQ
- SPY
- VOO

### 5. Membership Plan Page

URL:

```text
/members/plans
```

Files:

```text
src/main/java/com/joe/fin/member/MemberController.java
src/main/java/com/joe/fin/member/AccessPolicyDTO.java
src/main/webapp/WEB-INF/views/member/plans.jsp
```

This page shows the difference between FREE and PREMIUM access.

### 6. Watchlist MVP

URL:

```text
/watchlist
```

Files:

```text
src/main/resources/schema.sql
src/main/resources/data.sql
src/main/java/com/joe/fin/watchlist/WatchlistDTO.java
src/main/java/com/joe/fin/watchlist/WatchlistMapper.java
src/main/java/com/joe/fin/watchlist/WatchlistMapper.xml
src/main/java/com/joe/fin/watchlist/WatchlistService.java
src/main/java/com/joe/fin/watchlist/WatchlistController.java
src/main/webapp/WEB-INF/views/watchlist/list.jsp
```

The watchlist can:

- show saved symbols
- save STOCK or ETF symbols
- delete saved items

Seed examples:

- NVDA
- QQQ

### 7. MyBatis XML Fix

Because mapper XML files under `src/main/java` are now included as resources, old empty mapper XML files had to be fixed.

Fixed minimal mapper XML files:

- DrugMapper.xml
- FundamentalMapper.xml
- HomeMapper.xml
- NewsMapper.xml
- StockMapper.xml
- TechnicalMapper.xml

### 8. News Memo MVP

URLs:

```text
/news?symbol=NVDA
```

Files:

```text
src/main/java/com/joe/fin/news/NewsController.java
src/main/java/com/joe/fin/news/NewsDTO.java
src/main/java/com/joe/fin/news/NewsService.java
src/main/webapp/WEB-INF/views/news/list.jsp
```

Stock detail now also shows related news memo cards.

Current news data is demo data.
Later, this can be replaced with a real news API.

### 9. Live Stock JSON API

URL:

```text
/api/stocks/NVDA
```

File:

```text
src/main/java/com/joe/fin/stock/StockApiController.java
```

Stock detail page now calls this API from JavaScript every 30 seconds.

Flow:

```text
Browser
-> fetch("/api/stocks/NVDA")
-> StockApiController
-> StockService
-> Yahoo Finance or fallback data
-> JSON
-> browser updates price area
```

This is the first real-time style integration.

## Verified

```text
gradlew compileJava processResources
```

Result:

```text
BUILD SUCCESSFUL
```

HTTP checks:

```text
http://localhost:18085/ => 200
http://localhost:18085/stocks => 200
http://localhost:18085/stocks/search?ticker=NVDA => 200
http://localhost:18085/etfs => 200
http://localhost:18085/etfs/search?ticker=QQQ => 200
http://localhost:18085/members/plans => 200
http://localhost:18085/watchlist => 200
http://localhost:18085/news?symbol=NVDA => 200
http://localhost:18085/api/stocks/NVDA => 200
```

Watchlist save/delete:

```text
WATCHLIST_CREATE=OK
WATCHLIST_DELETE=OK
STOCK_NEWS=OK
NEWS_PAGE=OK
LIVE_PAGE=OK
```

## Next Work

### Priority 1

Connect FREE/PREMIUM policy to actual stock and ETF detail page limits.

### Priority 2

Connect stock/ETF detail save buttons back to the previous page instead of redirecting only to `/watchlist`.

### Priority 3

Connect real DB tables from Supabase or H2 local schema.

### Priority 4

Add news cards under stock detail.
