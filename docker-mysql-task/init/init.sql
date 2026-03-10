DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  customer   VARCHAR(50)  NOT NULL,  -- 顧客名
  product    VARCHAR(50)  NOT NULL,  -- 商品名
  amount     INT          NOT NULL,  -- 金額（円）
  ordered_at DATETIME     NOT NULL,  -- 注文日時
  status     VARCHAR(20)  NOT NULL   -- 状態 (paid / pending / cancelled)
);

-- サンプルデータ
INSERT INTO orders (customer, product, amount, ordered_at, status) VALUES
('Alice',   'Keyboard',    5000, '2024-02-25 09:10:00', 'paid'),
('Bob',     'Mouse',       2000, '2024-02-25 09:30:00', 'pending'),
('Charlie', 'Monitor',    15000, '2024-02-24 18:20:00', 'paid'),
('Alice',   'Headphone',   8000, '2024-02-25 10:05:00', 'cancelled'),
('Diana',   'Keyboard',    5000, '2024-02-23 15:00:00', 'paid'),
('Eve',     'Desk',       20000, '2024-02-26 11:45:00', 'paid'),
('Bob',     'Chair',      12000, '2024-02-26 12:10:00', 'paid'),
('Charlie', 'Mouse',       2000, '2024-02-23 13:40:00', 'pending'),
('Alice',   'Desk',       20000, '2024-02-27 08:55:00', 'paid'),
('Diana',   'Monitor',    15000, '2024-02-27 09:05:00', 'pending');
