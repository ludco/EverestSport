CREATE DATABASE everest;

USE everest;

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(125),
    description MEDIUMTEXT ,
    priceTTC DECIMAL(5,2),
    photo VARCHAR(255),
    promo INT,
    type VARCHAR(45),
    PRIMARY KEY(id)
    );

CREATE TABLE cmdLine(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity INT,
  amountTTC DECIMAL(5,2),
  productId INT,
  cmd_id INT,
  FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE user(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60),
  lastname VARCHAR(60),
  email VARCHAR(60),
  address VARCHAR(200),
  zip VARCHAR(6),
  city VARCHAR(60),
  phone VARCHAR(20)
  
);


INSERT INTO product(name,description,priceTTC,photo,promo,type) VALUES
('Ski alpin Salomon Shortmax 125','Avec son Shortmax long de seulement 125 cm, Salomon nous invite à nous amuser comme des enfants sur toutes les pistes de la station. D’un caractère joueur et facétieux, il permet de retrouver des sensations proches du patin à glace ou du roller pour dévaler comme des fous toutes les pentes enneigées.',329.90,'https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/5bc75963ffe4173e368244f6654f4192d123e2e7_VH19SALOKSK012_0.jpeg',0,'homme'),
('Ski Alpin React R6 Compact F Xpress','Le ski Rossignol React R6 Compact F Xpress ravira les skieurs de niveau intermédiaire qui recherchent un ski très joueur capable d’accélérer sur demande.',459.90,'https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/76880190ad29dba09ec1189fbb3f649267282dba_VH20ROSSSKI035_DESSUS.jpeg',0,'homme'),
('Ski alpin Roxy Kaya 72','Le ski femme Roxy Kaya 72 L10 Plate permet de débuter tranquillement le ski sans se faire peur et en prenant beaucoup de plaisir. Modèle très maniable et tolérant pour bien progresser',359.90, 'https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/bcf3c73f1c785e21771c1aabed54477bef2d55c8_VH20ROXYKSK001_0.jpeg',0,'femme'),
('Ski Alpin Famous 6 Xpress ',"Le ski piste Rossignol Famous 6 Xpress est idéal pour engranger de la technique et de l'expérience sur piste. Ski tonique qui permet de skier en douceur ou d’attaquer.",459.90,'https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/af1322bbf596ecb9f4ef21207f2e7095e716ee2c_VH19ROSSSKI057_DESSUS.jpeg',35,'femme')
