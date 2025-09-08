DELETE FROM donations;
DELETE FROM users;

INSERT INTO users (name, email, password, enabled, created_at, role) VALUES
('Caio Pereira', 'caiope@email.com', '123456', TRUE, NOW(), 'DONOR'),
('Lúcia Ferreira', 'luciafe@email.com', '123456', TRUE, NOW(), 'REQUESTER'),
('Carla Martins', 'carlamar@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Dona Lúcia Ferreira', 'luciaferrra@email.com', '123456',TRUE, NOW(), 'REQUESTER'),
('ONG Esperança', 'ongesper@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Pedro Pertruci', 'pedraoptc@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Rafael Yuiti', 'ryuitipkm@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Daniela Lima', 'danielaela@email.com', '123456',TRUE, NOW(), 'DONOR'),
('João Fernando Lopez', 'jfernandoL@email.com', '123456',TRUE, NOW(), 'REQUESTER'),
('Maya Luna Silva', 'mayaluna@email.com', '123456',TRUE, NOW(), 'REQUESTER'),
('Reinaldo Dino Paiva', 'reinaldodpaiva@email.com', '123456',TRUE, NOW(), 'REQUESTER'),
('Organização Alimente todos', 'orgalimentodos@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Movimento da Educação Universal', 'moveduniversal@email.com', '123456',TRUE, NOW(), 'DONOR'),
('Tecnologia Acessivel', 'ecnologiaacessive@email.com', '123456',TRUE, NOW(), 'DONOR'),
('ONG ESP', 'ongESP@email.com', '123456', TRUE, NOW(), 'REQUESTER');

INSERT INTO donations (title, description, category, location, city, state, zip_code, item_condition, status, image_urls, pickup_instructions, expires_at, created_at, donor_id, quantity)
VALUES
('Roupas de Inverno', 'Casacos e blusas em bom estado, tamanhos M e G', 'Roupas', 'Bairro Centro', 'Belo Horizonte', 'MG', '30140-000', 'BOM', 'AVAILABLE', NULL, 'Retirar após as 18h', DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), 1, 10),
('Cesta Básica', 'Alimentos não perecíveis para uma família', 'Alimentos', 'Próximo à praça', 'São Paulo', 'SP', '01000-000', 'NOVA', 'AVAILABLE', NULL, 'Entrega combinada via WhatsApp', DATE_ADD(NOW(), INTERVAL 14 DAY), NOW(), 3, 1);

INSERT INTO matches (message, status, requested_at, created_at, donation_id, requester_id)
VALUES
('Olá, preciso muito de roupas de frio para este mês.', 'PENDING', NOW(), NOW(), 1, 2);

