-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `6866` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `6866`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Tabla USERS
CREATE TABLE `users` (
  `id_user` int(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `type` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert USERS
INSERT INTO `users` (`id_user`, `name`, `lastname`, `email`, `phone`, `address`, `type`, `password`) VALUES
(2, 'Lucas', 'Pereyra', 'lucas.pereyra@example.com', NULL, NULL, 0, 'hashed123'),
(3, 'Mariana', 'Gómez', 'mariana.gomez@example.com', NULL, NULL, 0, 'hashed456'),
(4, 'Diego', 'Santos', 'diego.santos@example.com', NULL, NULL, 0, 'hashed789'),
(6, 'Julián', 'Morales', 'julian.morales@example.com', NULL, NULL, 0, 'hashedxyz'),
(7, 'pepe', 'lopez', 'tumama@gmail.com', NULL, NULL, 1, '$2b$10$7G9XYZu1933XxauefBHLkeb424de74QoTW1lUYrSywhX86YY4tfHC'),
(8, 'juan', 'perez', 'juanperez@gmail.com', NULL, NULL, 1, '$2b$10$2JneFun2108199H49ftJ5utLH8d2uZeat95R1mV7WC35pFwWbiaH2'),
(9, 'Leandro', 'Loza', 'lozaleandro54@gmail.com', '11 2733-4694', 'Naciones unidas 494', 1, '$2b$10$8vGoKTNOfI31209xbW.TeuiMEcbp7ToKG19M8scyxNLBR9.Hx3UJK'),
(10, 'pan', 'chito', 'pan@chito.com', NULL, NULL, 0, '$2b$10$NWaXXyr05zBjAPVjCCyXf.HI3g4bCtDzfJ9clDjRy0pPe5FpU7J8C'),
(16, 'Gabriel', 'Rosales', 'gabriel.rosales@example.com', NULL, NULL, 0, 'hash016'),
(17, 'Micaela', 'Arce', 'micaela.arce@example.com', NULL, NULL, 1, 'hash017'),
(18, 'Ezequiel', 'Márquez', 'ezequiel.marquez@example.com', NULL, NULL, 0, 'hash018'),
(19, 'Daniela', 'Correa', 'daniela.correa@example.com', NULL, NULL, 0, 'hash019'),
(20, 'Joaquín', 'Sierra', 'joaquin.sierra@example.com', NULL, NULL, 1, 'hash020'),
(21, 'Paula', 'Toledo', 'paula.toledo@example.com', NULL, NULL, 0, 'hash021'),
(22, 'Alejandro', 'Roldán', 'alejandro.roldan@example.com', NULL, NULL, 1, 'hash022'),
(23, 'Florencia', 'Medina', 'florencia.medina@example.com', NULL, NULL, 0, 'hash023'),
(24, 'Hernán', 'Velázquez', 'hernan.velazquez@example.com', NULL, NULL, 1, 'hash024'),
(25, 'Carla', 'Cáceres', 'carla.caceres@example.com', NULL, NULL, 0, 'hash025'),
(26, 'Luciano', 'Peralta', 'luciano.peralta@example.com', NULL, NULL, 1, 'hash026'),
(27, 'Bianca', 'Silva', 'bianca.silva@example.com', NULL, NULL, 0, 'hash027'),
(28, 'Federico', 'Montenegro', 'federico.montenegro@example.com', NULL, NULL, 0, 'hash028'),
(29, 'Julieta', 'Sánchez', 'julieta.sanchez@example.com', NULL, NULL, 1, 'hash029'),
(30, 'Maximiliano', 'Lara', 'maximiliano.lara@example.com', NULL, NULL, 0, 'hash030'),
(31, 'Sol', 'Acosta', 'sol.acosta@example.com', NULL, NULL, 0, 'hash031'),
(32, 'Iván', 'Pereyra', 'ivan.pereyra@example.com', NULL, NULL, 1, 'hash032'),
(33, 'Rocío', 'Sandoval', 'rocio.sandoval@example.com', NULL, NULL, 0, 'hash033'),
(34, 'Santiago', 'Caballero', 'santiago.caballero@example.com', NULL, NULL, 0, 'hash034'),
(35, 'Milagros', 'Fuentes', 'milagros.fuentes@example.com', NULL, NULL, 1, 'hash035'),
(36, 'Axel', 'Quiroga', 'axel.quiroga@example.com', NULL, NULL, 0, 'hash036'),
(37, 'Martina', 'Godoy', 'martina.godoy@example.com', NULL, NULL, 0, 'hash037'),
(38, 'Elías', 'Bravo', 'elias.bravo@example.com', NULL, NULL, 1, 'hash038'),
(39, 'Marina', 'Almada', 'marina.almada@example.com', NULL, NULL, 0, 'hash039'),
(40, 'Ignacio', 'Tevez', 'ignacio.tevez@example.com', NULL, NULL, 0, 'hash040'),
(41, 'Pilar', 'Domínguez', 'pilar.dominguez@example.com', NULL, NULL, 1, 'hash041'),
(42, 'Agustín', 'Luna', 'agustin.luna@example.com', NULL, NULL, 0, 'hash042'),
(43, 'Cintia', 'Rey', 'cintia.rey@example.com', NULL, NULL, 0, 'hash043'),
(44, 'Renzo', 'Varela', 'renzo.varela@example.com', NULL, NULL, 1, 'hash044'),
(45, 'Tamara', 'Leiva', 'tamara.leiva@example.com', NULL, NULL, 0, 'hash045'),
(90, 'Leandro', 'Loza', 'lozaleandro14@gmail.com', NULL, NULL, 0, '$2b$10$Gvrea44v29b1B5txNGJ1Q.uNTHUKj8Tyo9rp/WNaPwELZZ9C8sKsW'),
(91, 'leonardo', 'moza', 'mozaleonardo45@gmail.com', '11 72326449', NULL, 1, '$2b$10$DkQwJqJyp9/.rabEuIy8h.qUUlxFJWRDeSfyYVpWT6SHrKeBHDX62');

-- Tabla TICKETS
CREATE TABLE `tickets` (
  `id_ticket` int(100) NOT NULL,
  `id_user` int(100) NOT NULL,
  `dateCreated` datetime(6) NOT NULL,
  `deliveryTime` datetime(6) NOT NULL,
  `status` varchar(400) NOT NULL,
  `description` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert TICKETS
INSERT INTO `tickets` VALUES
(1, 9, '2025-12-08 08:10:00.000000', '2025-12-08 09:00:00.000000', 'en_proceso', 'Error al registrar un producto'),
(2, 9, '2025-12-08 08:20:00.000000', '2025-12-08 09:10:00.000000', 'en_proceso', 'Revisión de combo mal cargado'),
(3, 9, '2025-12-08 08:30:00.000000', '2025-12-08 09:20:00.000000', 'finalizado', 'Corrección aplicada con éxito'),
...
(120, 91, '2025-12-08 22:54:44.912000', '2025-12-19 15:00:00.000000', 'finalizado', 'impresoras: se me rompio la impresora padree');

-- Índices
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id_ticket`),
  ADD KEY `id_users` (`id_user`);

-- AUTO_INCREMENT
ALTER TABLE `users`
  MODIFY `id_user` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

ALTER TABLE `tickets`
  MODIFY `id_ticket` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

-- Clave foránea
ALTER TABLE `tickets`
  ADD CONSTRAINT `id_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

COMMIT;
