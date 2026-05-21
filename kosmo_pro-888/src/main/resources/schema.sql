CREATE TABLE IF NOT EXISTS menu (
    menu_id VARCHAR(50) PRIMARY KEY,
    store_id VARCHAR(50),
    menu_name VARCHAR(100),
    price INT
);

INSERT INTO menu (menu_id, store_id, menu_name, price) VALUES ('M001', 'S001', 'Original Fried Chicken', 18000);
INSERT INTO menu (menu_id, store_id, menu_name, price) VALUES ('M002', 'S001', 'Spicy Chicken', 19000);
