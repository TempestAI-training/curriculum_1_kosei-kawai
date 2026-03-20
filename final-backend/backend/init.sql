CREATE TABLE chat_table (
    id INTEGER PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    model VARCHAR(50) NOT NULL,
    created_at TIMESTAMP
);