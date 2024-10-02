-- Insert test data into the customers table
INSERT INTO customers (name, address, phone, email)
VALUES
    ('John Doe', '123 Maple Street', '555-1234', 'john.doe@example.com'),
    ('Jane Smith', '456 Oak Avenue', '555-5678', 'jane.smith@example.com'),
    ('Alice Johnson', '789 Pine Road', '555-8765', 'alice.johnson@example.com'),
    ('Bob Lee', '321 Birch Drive', '555-4321', 'bob.lee@example.com');

-- Insert test data into the paper table
INSERT INTO paper (name, discontinued, stock, price)
VALUES
    ('Glossy Paper', false, 100, 15.99),
    ('Matte Paper', false, 50, 12.49),
    ('Recycled Paper', false, 200, 10.00),
    ('Specialty Paper', true, 0, 25.00);

-- Insert test data into the traits table
INSERT INTO traits (trait_name)
VALUES
    ('Heavyweight'),
    ('Acid-Free'),
    ('Waterproof'),
    ('Textured');

-- Insert test data into the orders table
INSERT INTO orders (delivery_date, status, total_amount, customer_id)
VALUES
    (CURRENT_DATE + INTERVAL '7 days', 'pending', 159.90, 1),
    (CURRENT_DATE + INTERVAL '5 days', 'shipped', 99.95, 2),
    (CURRENT_DATE + INTERVAL '10 days', 'delivered', 49.98, 3),
    (CURRENT_DATE + INTERVAL '3 days', 'pending', 74.97, 4);

-- Insert test data into the paper_traits table
INSERT INTO paper_traits (paper_id, trait_id)
VALUES
    (1, 1), -- Glossy Paper is Heavyweight
    (1, 2), -- Glossy Paper is Acid-Free
    (2, 2), -- Matte Paper is Acid-Free
    (3, 3), -- Recycled Paper is Waterproof
    (4, 4); -- Specialty Paper is Textured

-- Insert test data into the order_entries table
INSERT INTO order_entries (quantity, product_id, order_id)
VALUES
    (5, 1, 1), -- 5 units of Glossy Paper for order 1
    (3, 2, 1), -- 3 units of Matte Paper for order 1
    (4, 3, 2), -- 4 units of Recycled Paper for order 2
    (1, 4, 3), -- 1 unit of Specialty Paper for order 3
    (2, 2, 4); -- 2 units of Matte Paper for order 4
