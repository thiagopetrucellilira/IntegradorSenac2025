-- Script para configurar o banco de dados donations_db
-- Execute este script no MySQL Workbench ou cliente MySQL

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS donations_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco criado
USE donations_db;

-- Criar usuário específico para a aplicação (opcional)
-- CREATE USER 'donations_user'@'localhost' IDENTIFIED BY 'donations_password';
-- GRANT ALL PRIVILEGES ON donations_db.* TO 'donations_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Verificar se o banco foi criado
SHOW DATABASES;

-- Verificar se estamos usando o banco correto
SELECT DATABASE();
