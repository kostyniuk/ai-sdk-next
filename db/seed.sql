-- Seed Materials
INSERT INTO material (name, description) VALUES
('Steel', 'High quality steel'),
('Aluminum', 'Lightweight aluminum'),
('Copper', 'Conductive copper'),
('Plastic', 'Durable plastic'),
('Wood', 'Oak wood');

-- Seed Machine Groups
INSERT INTO machine_group (name) VALUES
('Cutting'),
('Welding'),
('Assembly'),
('Painting'),
('Packaging');

-- Seed Quotation Forms
INSERT INTO quotation_form (name) VALUES
('Standard Quote'),
('Express Quote'),
('Bulk Order'),
('Custom Project'),
('Prototype');

-- Seed Quotation Form Options
-- Note: This assumes IDs 1-5 are generated for the above insertions. 
-- In a real scenario, you might need to look up IDs or use RETURNING.
INSERT INTO quotation_form_option (quotation_form_id, material_id, machine_group_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- Seed Quotation Form Formulas
INSERT INTO quotation_form_formula (quotation_form_option_id, formula) VALUES
(1, '{{quantity}} * 10 + 100'),
(2, '{{quantity}} * 15 + 200'),
(3, '{{quantity}} * 8 + 50'),
(4, '({{quantity}} * 20) + ({{quantity}} > 100 ? 0 : 500)'),
(5, '{{quantity}} * 50 + 1000');
