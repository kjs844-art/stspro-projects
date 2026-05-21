insert into members (email, display_name, membership_type)
values ('demo@kosmo.local', '데모 사용자', 'FREE');

insert into watchlist (member_id, symbol, asset_type, memo)
values
(1, 'NVDA', 'STOCK', 'AI 인프라 대표 종목'),
(1, 'QQQ', 'ETF', '나스닥 100 대표 ETF');
