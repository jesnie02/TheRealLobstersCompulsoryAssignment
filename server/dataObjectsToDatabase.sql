-- Insert test data into the customers table
INSERT INTO customers (name, address, phone, email)
VALUES
    ('John Doe', '123 Maple Street', '555-1234', 'john.doe@example.com'),
    ('Jane Smith', '456 Oak Avenue', '555-5678', 'jane.smith@example.com'),
    ('Alice Johnson', '789 Pine Road', '555-8765', 'alice.johnson@example.com'),
    ('Bob Lee', '321 Birch Drive', '555-4321', 'bob.lee@example.com'),
    ('Chris Martin', '987 Cedar Street', '555-6543', 'chris.martin@example.com'),
    ('Sophie Brown', '111 Walnut Lane', '555-7890', 'sophie.brown@example.com'),
    ('David Green', '222 Elm Boulevard', '555-9876', 'david.green@example.com'),
    ('Emma White', '333 Spruce Circle', '555-5432', 'emma.white@example.com'),
    ('Liam Thompson', '444 Redwood Avenue', '555-1111', 'liam.thompson@example.com'),
    ('Emily Davis', '555 Magnolia Place', '555-2222', 'emily.davis@example.com'),
    ('Olivia Williams', '666 Sequoia Terrace', '555-3333', 'olivia.williams@example.com'),
    ('Ethan Clark', '777 Cypress Court', '555-4444', 'ethan.clark@example.com'),
    ('Lucas Wright', '888 Alder Lane', '555-5555', 'lucas.wright@example.com'),
    ('Mia Baker', '999 Ash Grove', '555-6666', 'mia.baker@example.com'),
    ('Sophia Carter', '123 Fir Way', '555-7777', 'sophia.carter@example.com'),
    ('Noah Young', '234 Cherry Hill', '555-8888', 'noah.young@example.com');

-- Insert test data into the paper table
INSERT INTO paper (name, discontinued, stock, price)
VALUES
    ('Glossy Paper', false, 100, 15.99),
    ('Matte Paper', false, 50, 12.49),
    ('Recycled Paper', false, 200, 10.00),
    ('Specialty Paper', true, 0, 25.00),
    ('High-Gloss Paper', false, 150, 17.99),
    ('Vellum Paper', false, 300, 20.49),
    ('Bond Paper', false, 400, 8.75),
    ('Parchment Paper', true, 0, 27.99),
    ('Laser Paper', false, 500, 13.59),
    ('Inkjet Paper', false, 250, 11.49),
    ('Photo Paper', false, 75, 29.99),
    ('Carbonless Paper', true, 0, 22.50),
    ('Tissue Paper', false, 600, 3.99),
    ('Thermal Paper', false, 350, 18.75),
    ('Construction Paper', false, 800, 7.49),
    ('Graph Paper', true, 0, 5.00);

-- Insert test data into the traits table
INSERT INTO traits (trait_name)
VALUES
    ('Heavyweight'),
    ('Lightweight'),
    ('Mediumweight'),
    ('Acid-Free'),
    ('Waterproof'),
    ('Textured'),
    ('Eco-Friendly'),
    ('Bleed-Resistant'),
    ('High Brightness'),
    ('Smooth Finish'),
    ('Matte Finish'),
    ('Glossy Finish'),
    ('Recycled'),
    ('Archival Quality'),
    ('Opaque'),
    ('Transparent'),
    ('Cream Color'),
    ('White Color'),
    ('Off-White Color'),
    ('Ivory Color'),
    ('Bright White Color'),
    ('Gray Color'),
    ('Natural Color'),
    ('FSC Certified'),
    ('Chlorine-Free'),
    ('Uncoated'),
    ('Gloss Coated'),
    ('Satin Finish'),
    ('Linen Texture'),
    ('Wove Texture'),
    ('Laid Texture'),
    ('Cotton Content'),
    ('Watermark'),
    ('High Opacity'),
    ('Low Opacity'),
    ('Smooth Grain'),
    ('Rough Grain'),
    ('Embossed'),
    ('Metallic Finish'),
    ('Pearlescent Finish'),
    ('Soft Touch'),
    ('Fast Drying'),
    ('UV Resistant'),
    ('Parchment'),
    ('Vellum'),
    ('Canvas Texture'),
    ('Double-Sided Coating'),
    ('Laser Printer Friendly'),
    ('Inkjet Printer Friendly'),
    ('Tear-Resistant'),
    ('Heat Resistant'),
    ('Fire Resistant'),
    ('Dust Resistant');

-- Insert test data into the orders table
INSERT INTO orders (delivery_date, status, total_amount, customer_id)
VALUES
    (CURRENT_DATE + INTERVAL '7 days', 'pending', 159.90, 1),
    (CURRENT_DATE + INTERVAL '5 days', 'shipped', 99.95, 2),
    (CURRENT_DATE + INTERVAL '10 days', 'delivered', 49.98, 3),
    (CURRENT_DATE + INTERVAL '3 days', 'pending', 74.97, 4),
    (CURRENT_DATE + INTERVAL '9 days', 'shipped', 210.89, 5),
    (CURRENT_DATE + INTERVAL '8 days', 'pending', 89.75, 6),
    (CURRENT_DATE + INTERVAL '6 days', 'delivered', 134.50, 7),
    (CURRENT_DATE + INTERVAL '4 days', 'pending', 58.45, 8),
    (CURRENT_DATE + INTERVAL '11 days', 'pending', 229.70, 9),
    (CURRENT_DATE + INTERVAL '2 days', 'shipped', 99.90, 10),
    (CURRENT_DATE + INTERVAL '13 days', 'delivered', 299.95, 11),
    (CURRENT_DATE + INTERVAL '1 day', 'pending', 112.30, 12),
    (CURRENT_DATE + INTERVAL '7 days', 'shipped', 89.99, 13),
    (CURRENT_DATE + INTERVAL '3 days', 'pending', 180.67, 14),
    (CURRENT_DATE + INTERVAL '12 days', 'shipped', 77.44, 15),
    (CURRENT_DATE + INTERVAL '5 days', 'delivered', 101.19, 16);

-- Insert test data into the paper_traits table
INSERT INTO paper_traits (paper_id, trait_id)
VALUES
    (1, 1), -- Glossy Paper is Heavyweight
    (1, 2), -- Glossy Paper is Acid-Free
    (2, 2), -- Matte Paper is Acid-Free
    (3, 3), -- Recycled Paper is Waterproof
    (4, 4), -- Specialty Paper is Textured
    (5, 1), -- High-Gloss Paper is Heavyweight
    (5, 7), -- High-Gloss Paper has High Brightness
    (6, 2), -- Vellum Paper is Acid-Free
    (6, 4), -- Vellum Paper is Textured
    (7, 5), -- Bond Paper is Eco-Friendly
    (8, 2), -- Parchment Paper is Acid-Free
    (9, 6), -- Laser Paper is Bleed-Resistant
    (9, 7), -- Laser Paper has High Brightness
    (10, 6), -- Inkjet Paper is Bleed-Resistant
    (11, 1), -- Photo Paper is Heavyweight
    (11, 7), -- Photo Paper has High Brightness
    (12, 5), -- Carbonless Paper is Eco-Friendly
    (13, 4), -- Tissue Paper is Textured
    (14, 6), -- Thermal Paper is Bleed-Resistant
    (15, 8), -- Construction Paper has Smooth Finish
    (16, 2); -- Graph Paper is Acid-Free

-- Insert test data into the order_entries table
INSERT INTO order_entries (quantity, product_id, order_id)
VALUES
    (5, 1, 1), -- 5 units of Glossy Paper for order 1
    (3, 2, 1), -- 3 units of Matte Paper for order 1
    (4, 3, 2), -- 4 units of Recycled Paper for order 2
    (1, 4, 3), -- 1 unit of Specialty Paper for order 3
    (2, 2, 4), -- 2 units of Matte Paper for order 4
    (6, 5, 5), -- 6 units of High-Gloss Paper for order 5
    (8, 6, 6), -- 8 units of Vellum Paper for order 6
    (7, 7, 7), -- 7 units of Bond Paper for order 7
    (3, 8, 8), -- 3 units of Parchment Paper for order 8
    (10, 9, 9), -- 10 units of Laser Paper for order 9
    (5, 10, 10), -- 5 units of Inkjet Paper for order 10
    (9, 11, 11), -- 9 units of Photo Paper for order 11
    (4, 12, 12), -- 4 units of Carbonless Paper for order 12
    (12, 13, 13), -- 12 units of Tissue Paper for order 13
    (7, 14, 14), -- 7 units of Thermal Paper for order 14
    (15, 15, 15), -- 15 units of Construction Paper for order 15
    (20, 16, 16); -- 20 units of Graph Paper for order 16
