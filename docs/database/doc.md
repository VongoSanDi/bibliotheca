# Sommaire

1. [Introduction](#introduction)
1.1 [Purpose](#purpose)
1.2. [Context](#context)
1.3. [Architecture](#architecture)
2. [Conventions & standards](#conventions_standards)
2.1 [Naming conventions](#naming_conventions)
2.2 [Standard Data Types](#standard_data_type)
3. [Tables structure](#tables_structure)

---

<a id="introduction"></a>
# Introduction
## Purpose
This database is used to store the datas for the application bibliotheca.io, it allows the user to create a collection of books(whatever the format or type).

<a id="context"></a>
# Context

<a id="architecture"></a>
# Architecture
DBMS: MariaDB
Encoding: UTF-8
Timezone: UTC

# Conventions and Standards
## Naming Conventions

Tables: UPPERCASE, singular name
Columns: snake_case
Primary keys: id
Foreign keys: [table_name]_id
Indexes: idx_[table_name]_[column]

## Standard Data Types

Identifiers: TINYINT - SMALLINT - MEDIUMINT - BIGINT, all UNSIGNED
String: VARCHAR(n)
Dates: DATE
Booleans: BOOLEAN
Amounts: DECIMAL(precision, scale)

# Tables structure
## Reference tables
### COUNTRY
#### Description
Store country reference data used across the application

#### Columns
| name         | type             | NULL | Default        |Description                    |
|--------------|------------------|------|----------------|------------------------------ |
| id           | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| country_name | VARCHAR(50)      | No   | None           | Full name of the country      |
| iso_code     | CHAR(2)          | No   | None           | ISO 3166 alpha-2 country code |

#### Contraints
- Primary Key: id
- Unique: country_name, iso_code

#### Example

### CURRENCY
#### Description
Store currency reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| curency_name    | VARCHAR(50)      | No   | None           | Full name of the currency     |
| currency_symbol | CHAR(3)          | No   | None           | The symbol of the currency    |
| iso_code        | CHAR(3)          | No   | None           | ISO 4217 currency code        |

#### Contraints
- Primary Key: id
- Unique: currency_name, currency_symbol, iso_code

#### Example

### LANGUAGE
#### Description
Store language reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| language_name   | VARCHAR(50)      | No   | None           | Full name of the language     |
| iso_code        | CHAR(2)          | No   | None           | ISO 639-1 language code       |

#### Contraints
- Primary Key: id
- Unique: language_name, iso_code

#### Example

### GENRE
#### Description
Store genre reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| genre_name      | VARCHAR(50)      | No   | None           | Full name of the genre        |

#### Contraints
- Primary Key: id
- Unique: genre_name

#### Example

### TYPE
#### Description
Store type reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| type_name       | VARCHAR(50)      | No   | None           | Full name of the genre        |

#### Contraints
- Primary Key: id
- Unique: type_name

#### Example

### EDITION
#### Description
Store edition reference data used across the application

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| edition_name    | VARCHAR(50)      | No   | None           | Full name of the edition        |

#### Contraints
- Primary Key: id
- Unique: edition_name

#### Example

### STATUS
#### Description
Store status reference data used across the application, we only store the status code and will use convert it in text in the client with i18n

#### Columns
| name            | type             | NULL | Default        |Description                    |
|-----------------|------------------|------|----------------|------------------------------ |
| id              | TINYINT UNSIGNED | No   | AUTO_INCREMENT | Primary key                   |
| status_code     | VARCHAR(50)      | No   | None           | Code of the status            |

#### Contraints
- Primary Key: id
- Unique: status_code

#### Example

## Main tables
### USER
#### Description
Stores user account informations

#### Columns
| Name            | Type               | NULL | Default            |Description                  |
|-----------------|--------------------|------|--------------------|-----------------------------|
| id              | MEDIUMINT UNSIGNED | No   | AUTO_INCREMENT     | Primary key                 |
| username        | VARCHAR(50)        | No   | No                 | Username of the user        |
| email           | VARCHAR(255)       | No   | No                 | Email of the user           |
| password_hash   | CHAR(60)           | No   | No                 | Hashed password of the user |
| birth_date      | DATE               | Yes  | No                 | Birth date of the user      |
| gender_id       | TINYINT UNSIGNED   | Yes  | No                 | Gender of the user          |
| country_id      | TINYINT UNSIGNED   | No   | No                 | Country of the user         |
| last_login      | DATE               | No   | No                 | Last time user logged in    |
| created_at      | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Record creation timestamp   |
| created_by      | MEDIUMINT UNSIGNED | No   | 0                  | User who create the record  |
| updated_at      | TIMESTAMP          | No   | CURRENCT_TIMESTAMP | Last update timestamp       |
| updated_by      | MEDIUMINT UNSIGNED | No   | 0                  | User who updatd the record  |

#### Contraints
- Primary Key: id
- Unique: username, email
- Foreign Key! country_id -> COUNTRY.id

#### Triggers
- user_before_insert: Sets creation/update metadata before insert

#### Example



1. [Schema](#schema)
2. [Configuration](#configuration)
3. [Tables](#tables)
   1. [Country](#country)
   2. [Currency](#currency)
   3. [Language](#language)
   4. [Genre](#genre)
   5. [Type](#type)
   6. [Edition](#edition)
   7. [Status](#status)
   8. [User](user)
   9. [Author](#author)
   10. [Publisher](#publisher)
   11. [Serie](#serie)
   12. [Book](#book)
   13. [Volume](#volume)
   14. [Box Set](#book_set)
   15. [Box Set Book](#book_set_book)
   16. [Collection](#collection)
   17. [Collection Volume](#collection_volume)
   12. [Favoris A DEFINIR](#favoris)
   13. [Commentaire A DEFINIR](#commentaire)
   14. [Auteur](#auteur)
   15. [Genre](#genre)
   16. [Statut](#statut)
   17. [Edition](#edition)
   18. [Editeur](#editeur)
   19. [Dessinateur](#dessinateur)
   20. [Pays](#pays)
   21. [Statistique A DEFINIR](#statistique)

---



<a id="schema"></a>
# Diagram

https://dbdiagram.io/d/Libraria-64d8109a02bd1c4a5eaec316

<a id="configuration"></a>
# Configurations

Use UTF-8 across the database
Use UTC for the DATETIME the database

<a id="tables"></a>

# Tables

<a id="country"></a>

## Country

This table allow us to have the informations of the country internally, no need to query a public API
| Country
|--------
| id
| country_name
| code_iso CHAR(2)

### Details

id_pays -> Identifiant unique du pays(numero opérateur)
libelle_pays -> Libelle du pays
code_iso -> Code ISO (ISO 3166)

### Example

| id_pays | libelle_pays | code_iso |
| ------- | ------------ | -------- |
| 1       | Japon        | JP       |
| 2       | France       | FR       |

<a id="user"></a>

## User

This table contains all the users informations

| User        |
| ------------------- |
| user_id |
| username  |
| email    |
| password_hash      |
| registration_date      |
| birth_date      |
| gender_id      |
| country_id      |
| last_login      |


### Details
user_id
username  |
email    |
password_hash      |
registration_date      |
birth_date      |
gender_id      |
country_id      |
last_login      |

### Example

| id_utilisateur | pseudo_utilisateur | date_inscription | date_naissance | sexe | id_pays | avatar_url            |
| -------------- | ------------------ | ---------------- | -------------- | ---- | ------- | --------------------- |
| 1              | A                  | 29/08/2023       | 01/01/1970     | H    | 33      | https://google.fr     |
| 2              | B                  | 01/01/2019       | 01/01/1970     | F    | 1       | https//google.com     |
| 3              | C                  | 19/05/2015       | 03/09/2000     | F    | 12      | https://readmanga.com |

<a id="serie"></a>

# Série

Cete table a pour but de stocker des informations détaillées sur les séries de livres présentes dans l'application. Cette table permet de consolider et d'organiser les données relatives à chaque série, ce qui facilite la recherche, la visualisation et la gestion des informations liées aux séries.
| Série |
|-----------------|
| id_serie (PK, index) |
| libelle_serie |
| id_auteur |
| id_statut |
| id_editeur |
| nombre_tome_vo_serie |
| nombre_tome_vf_serie |
| date_debut_parution_vo_serie |
| date_fin_parution_vo_serie |

### Details

id_serie -> Id unique de la série
libelle_serie -> Libelle de la série
description -> Description de la série
id_auteur -> Id vers l'auteur de la série
id_statut -> Id du statut de la série
id_editeur -> Id de l'éditeur
nombre_tome_vo_serie -> Nombre de tome actuelle dans le pays d'origine de l'oeuvre
nombre_tome_vf_serie -> Nombre de tome actuelle dans le pays de l'utilisateur
date_debut_parution_vo_serie -> Date de début de la parution de la série
date_fin_parution_vo_serie -> Date de fin de la parution de la série

### Example

| id_serie | libelle_serie | id_auteur | id_statut | id_editeur | nombre_tome_vo_serie | nombre_tome_vf_serie | date_debut_parution_serie | date_fin_parution_serie |
| -------- | ------------- | --------- | --------- | ---------- | -------------------- | -------------------- | ------------------------- | ----------------------- |
| 1        | One Piece     | 1         | 1         | 1          | 106                  | 104                  | 1998                      | -1                      |
| 2        | Naruto        | 2         | 2         | 2          | 72                   | 72                   | 2995                      | 2009                    |
| 3        | Bleach        | 3         | 2         | 1          | 74                   | 74                   | 2001                      | 2007                    |
| 4        | Fairy Tail    | 4         | 2         | 2          | 56                   | 56                   | 2002                      | 2010                    |

<a id="type"></a>

## Type

Cette table a pour objectif de stocker des informations sur les différents types de tomes.
| Type |
|-----------------|
| id_type (PK, index) |
| libelle_type |

### Details

id_type -> Id unique du type du livre
libelle_type -> Libelle du type

### Example

| id_type | libelle_type |
| ------- | ------------ |
| 1       | Manga        |
| 2       | Roman        |

<a id="langue"></a>

## Langue

Cette table permet de normaliser la gestion des langues.
| Langue |
|-----------------|
| id_langue (PK, index) |
| libelle_langue |
| code_iso |

### Details

id_langue -> Id unique de la langue
libelle_langue -> Libelle de la langue
code_iso -> Code ISO de la langue(ISO 639)

### Example

| id_type | libelle_type | code_iso |
| ------- | ------------ | -------- |
| 1       | Français     | fr       |
| 2       | Anglais      | en       |

<a id="livre"></a>

## Livre

Cette table a pour objectif de stocker des informations détaillées sur les livres individuels présents dans l'application. Cette table permet de consolider et d'organiser les données relatives à chaque livre, ce qui facilite la recherche, la visualisation et la gestion des informations.
| Livre
| -------
| id_livre (PK)
| isbn_livre |
| titre_livre|
| id_serie |
| id_type |
| id_auteur |
| id_editeur |
| id_genre |
| date_parution_livre |
| id_edition |
| id_dessinateur |
| prix_sortie_livre |
| id_devise |
| nombre_page_livre |
| image_url |

### Details

id_livre -> Id unique du livre
isbn_livre -> ISBN du livre
titre_livre -> Titre du livre
description -> Description du contenu du livre
id_serie -> Id de la série
id_type -> Id du type d'oeuvre
id_auteur -> id de l'auteur
id_editeur -> id editeur
id_genre -> Id du genre
date_parution_livre -> Date de parution du livre
id_edition -> Id de l'édition
id_dessinateur -> id du dessinateur
prix_sortie_livre -> Prix du livre à sa sortie
id_devise -> Id de la devise du prix
nombre_page_livre -> Nombre de page du livre
image_url -> Url vers la première de couverture du livre

### Example

| id_livre | isbn_livre    | titre_livre                    | id_serie | id_type | id_auteur | id_editeur | id_genre | date_parution_livre | id_edition | id_dessinateur | prix_sortie_livre | id_devise | nombre_page_livre | image_url |
| -------- | ------------- | ------------------------------ | -------- | ------- | --------- | ---------- | -------- | ------------------- | ---------- | -------------- | ----------------- | --------- | ----------------- | --------- |
| 1        | 1234567891234 | Saigneur des agneaux           | 1        | 1       | 1         | 1          | 1        | 1954                | 1          | 1              | 50                | 1         | 150               | dqdqd     |
| 2        | 4321987654321 | Dragon Blueouge                | 2        | 1       | 2         | 2          | 2        | 1980                | 1          | -1             | 20                | 2         | 80                | qdqdq     |
| 3        | 9876453234221 | A l'aube d'une petite aventure | 3        | 2       | 3         | 3          | 3        | 1998                | 1          | 2              | 7                 | 3         | 80                | dfsfs     |

<a id="tome"></a>

## Tome

Cette table a pour objectif de stocker des informations détaillées sur les tomes individuels qui font partie des séries de livres.Elle permet de consolider et d'organiser les données relatives à chaque tome, facilitant ainsi la recherche, la visualisation et la gestion des informations.
| Tome |
|-----------------|
| id_tome (PK, index) |
| id_livre (FK)
| id_langue (FK)

### Details

id_tome -> Id unique du tome
prix_date_ajout -> Prix du tome lors de l'ajout
id_devise -> Id de la devise du prix
id_livre -> Id du livre, c'est dans le livre que sont enregistré les informations "génériques"
id_langue -> Id de la langue du tome

### Example

| id_tome | prix_date_ajout | id_devise | date_ajout | id_livre | id_langue |
| ------- | --------------- | --------- | ---------- | -------- | --------- |
| 1       | 10              | 1         | 15/09/2012 | 1        | 1         |
| 2       | 30              | 1         | 01/01/2000 | 2        | 2         |
| 3       | 90              | 2         | 25/12/1970 | 3        | 1         |

<a id="coffret"></a>

## Coffret

Cette table a pour objectif de stocker des informations détaillées sur les coffrets ou ensembles de tomes vendus ensemble. Un coffret peut contenir plusieurs tomes.
| Coffret |
|-----------------|
| id_coffret (PK)|
| libelle_coffret |
| isbn |
| description_coffret |
| prix_coffret_sortie_coffret |
| id_devise |
| date_sortie_coffret |

### Détails

id_coffret (Clé primaire) : Identifiant unique du coffret.
libelle_coffret : Libelle du coffret.
description : Description du contenu du coffret.
prix_sortie_coffret : Prix du coffret.
id_devise: Devise du prix
date_sortie_coffret : Date de sortie du coffret.

### Example

| id_coffret | libelle_coffret | description | prix_sortie_coffret | id_devise | date_sortie_coffret |
| ---------- | --------------- | ----------- | ------------------- | --------- | ------------------- |
| 1          | dfsf            | dqdq        | 12                  | 1         | 25/09/2012          |
| 2          | dsfsf           | sdfsf       | 23                  | 2         | 348/034/34          |
| 3          | sfsf            | sfsf        | 34                  | 2         | 384/394/221         |

<a id="achat-coffret"></a>

## Achat coffret

Cette table a pour objectif de stocker des informations sur les achats spécifiques de coffrets effectués par les utilisateurs.Elle permet de conserver une trace des transactions d'achat de coffrets, des dates d'achat, etc.
Cela permet conserver un historique complet des transactions et générer d'éventuels rapports d'achat pour les utilisateurs. Cela peut également être utile pour le suivi des ventes, la gestion des paiements et l'analyse des tendances d'achat.
| Achat_Coffret |
|-----------------|
| id_achat_coffret (PK)
| id_utilisateur (FK, index) |
| id_coffret (FK, index) |
| date_achat_coffret |
| id_devise |
| prix_achat_coffret |

### Details

id_achat_coffret -> Id unique
id_utilisateur -> Id de l'utilisateur a lié
id_coffret -> Id du coffret à lié
date_achat_coffret -> Date d'achat du coffret
id_devise -> Devise du prix
prix_achat_coffret -> prix d'achat

### Example

| id_achat_coffret | id_utilisateur | id_coffret | date_achat |
| ---------------- | -------------- | ---------- | ---------- |
| 1                | 123            | 1          | 2023-04-01 |
| 2                | 456            | 2          | 2023-04-02 |
| 3                | 456            | 1          | 2023-04-03 |

<a id="coffret-tome"></a>

## Coffret tome

Cette table a pour objectif de créer une relation entre les coffrets et les tomes individuels qui les composent dans votre application.Elle permet de représenter les tomes individuels contenus dans chaque coffret. Cette table joue un rôle essentiel dans la modélisation des achats de coffrets qui contiennent plusieurs tomes. Grâce à cette table, on peut établir une association entre chaque coffret et les tomes qui le composent. Cela vous permet de suivre précisément la composition de chaque coffret et d'afficher les tomes inclus dans un coffret particulier.
| Coffret_Tome |
|-----------------|
| id_coffret_tome (PK, index) |
| id_coffret |
| id_tome (FK, index) |

### Details

id_coffret_tome -> Id unique
id_coffret -> Id du coffet à lié
id_tome -> Id du tome à lié

### Example

| id_coffret_tome | id_coffret | id_tome |
| --------------- | ---------- | ------- |
| 1               | 1          | 3       |
| 1               | 1          | 7       |
| 3               | 2          | 12      |

<a id="achat-tome"></a>

## Achat tome

Cette table est utilisée pour suivre les relations entre les utilisateurs et les tomes qu'ils possèdent. Elle enregistre les informations sur la possession d'un tome spécifique par un utilisateur spécifique, y compris la date de possession.
En d'autres termes,elle permet de garder une trace des tomes de livres que chaque utilisateur a en sa possession.
| Collection |
|-----------------|
| id_achat_tome (PK)
| id_utilisateur (FK, index) |
| id_tome (FK, index) |
| date_achat_tome |
| id_devise |
| prix_achat_tome |

### Details

id_utilisateur (Clé étrangère) : Identifiant de l'utilisateur possédant le tome.
id_tome (Clé étrangère) : Identifiant du tome possédé.
date_acquisition : Date à laquelle le tome a été acquis.

### Example

| id_possession | id_utilisateur | id_tome | date_acquisition |
| ------------- | -------------- | ------- | ---------------- |
| 1             | 123            | 3       | 2023-04-01       |
| 2             | 456            | 7       | 2023-04-02       |
| 3             | 123            | 12      | 2023-04-03       |

<a id="doublon"></a>

## Doublon

Cette table permet de gérer les doublons d'un tome qu'un utilisateur peut avoir. Cette table permet déviter de polluer la table collection avec des tomes dont l'utilisateur à de grandes chances de se séparer.
| Doublon |
|-----------------|
| id_doublon (PK) |
| id_utilisateur (FK, index) |
| id_tome (FK, index) |
| date_acquisition |

### Details

id_doublon -> Id unique du doublon
id_utilisateur (Clé étrangère) : Identifiant de l'utilisateur possédant le tome.
id_tome (Clé étrangère) : Identifiant du tome possédé.
date_acquisition : Date à laquelle le tome a été acquis.

### Example

| id_doublon | id_utilisateur | id_tome |
| ---------- | -------------- | ------- |
| 1          | 1              | 1       |
| 2          | 1              | 2       |
| 3          | 2              | 1       |

<a id="favoris"></a>

## Favoris A DEFINIR

Cette table permet aux utilisateurs de marquer leurs tomes préférés.
| Favoris |
|-----------------|
| id_utilisateur (FK, index) |
| id_tome (FK, index) |
| PRIMARY KEY (id_utilisateur, id_tome) |

<a id="commentaire"></a>

## Commentaire A DEFINIR

Cette table permet aux utilisateurs de laisser des commentaires sur les livres. Chaque enregistrement représente un commentaire laissé par un utilisateur pour un livre spécifique.
| Commentaire |
|-----------------|
| id_commentaire (PK, index) |
| id_utilisateur (FK, index) |
| id_livre (FK, index) |
| texte_commentaire |
| date_commentaire |

<a id="auteur"></a>

## Auteur

Cette table permet de normaliser la gestion des auteurs.
| Auteur
|--------
| id_auteur
| nom_auteur
| prenom_auteur
| pseudo_auteur
| id_pays

### Details

id_auteur -> Identifiant unique de l'auteur
nom_auteur -> Nom de l'auteur
prenom_auteur -> Prenom de l'auteur
pseudo_auteur -> Pseudo de l'auteur s'il prefere se faire appeler comme ça, nom d'artiste quoi
id_pays -> Identifiant pays d'origine de l'auteur

### Example

| id_auteur | nom_auteur | prenom_auteur | id_pays |
| --------- | ---------- | ------------- | ------- |
| 1         | Mashima    | Hiro          | 1       |
| 2         | Oda        | Eichiro       | 1       |
| 3         | Kube       | Tite          | 1       |
| 4         | Lemaire    | Reno          | 2       |

<a id="genre"></a>

## Genre

Cette table permet de normaliser la gestion des genres.
| Genre
|-------
| id_genre (PK)
| libelle_genre

### Details

id_genre -> Identifiant unique du genre
libelle_genre -> Libelle du genre

### Example

| id_genre | libelle_genre |
| -------- | ------------- |
| 1        | Action        |
| 2        | Romance       |

<a id="statut"></a>

## Statut

Cette table permet de normaliser la gestion des statuts.
| Statut
|--------
| id_statut (PK)
| libelle_statut

### Details

id_statut -> Identifiant unique du statut
libelle_statut -> Libelle du statut

### Example

| id_statut | libelle_statut |
| --------- | -------------- |
| 1         | Terminé        |
| 2         | En Cours       |

<a id="editions"></a>

## Edition

Cette table permet de normaliser la gestion des editions.
| Edition
|-------
| id_edition (PK)
| libelle_edition

### Details

id_edition -> Identifiant unique de l'édition
libelle_edition -> Libelle de l'édition

### Example

| id_edition | libelle_edition |
| ---------- | --------------- |
| 1          | Standard        |
| 2          | Black Edition   |

<a id="editeur"></a>

## Editeur

Cette table permet de normaliser la gestion des editeurs.
| Editeur
|--------
| id_editeur
| libelle_editeur
| site_web_editeur

### Details

id_editeur -> Identifiant unique de l'éditeur
libelle_editeur -> Libelle de l'éditeur
site_web_editeur -> Site web de l'éditeur

### Example

| id_editeur | libelle_editeur | site_web_editeur |
| ---------- | --------------- | ---------------- |
| 1          | Pika            | sfsgdgdgdg       |
| 2          | Kana            | ffgdgg           |

<a id="dessinateur"></a>

## Dessinateur

Cette table permet de normaliser la gestion des dessinateurs.
| Dessinateur
|--------
| id_dessinateur
| nom_dessinateur
| prenom_dessinateur
| pseudo_dessinateur
| id_pays

### Details

id_dessinateur -> Identifiant unique du dessinateur
nom_dessinateur -> Nom du dessinateur
prenom_dessinateur -> Prenom du dessinateur
pseudo_dessinateur -> Pseudo du dessinateur s'il prefere se faire appeler comme ça, nom d'artiste quoi
id_pays -> Id du pays du dessinateur

### Example

| id_dessinateur | nom_dessinateur | prenom_dessinateur | id_pays |
| -------------- | --------------- | ------------------ | ------- |
| 1              | b               | a                  | 1       |
| 2              | c               | d                  | 2       |

<a id="devise"></a>

## Devise

Cette table permet de normaliser la gestion des devises.
| Devise
|--------
| id_devise
| libelle_devise
| symbole_devise
| code_iso

### Details

id_devise -> Identifiant unique de la devise
libelle_devise -> Libelle de la devise
symbole_devise -> Symbole internationale de la devise
coe_iso -> Code iso de la devise (ISO 4217)

### Example

| id_devise | libelle_devise | symbole_devise | code_iso |
| --------- | -------------- | -------------- | -------- |
| 1         | Euro           | €              | EUR      |
| 2         | Yen            | $              | JPY      |

<a id="statistique"></a>

## Statisique A DEFINIR

Créer des stats
| Statistiques |
|-----------------|
| id_statistique (PK, index) |
| type_statistique |
| valeur_statistique |
| date_enregistrement |

## A définir pour les statistique

id_utilisateur (FK) : Si vous souhaitez associer les statistiques à des utilisateurs spécifiques.
id_livre (FK) : Si vous souhaitez associer les statistiques à des livres spécifiques.
id_serie (FK) : Si vous souhaitez associer les statistiques à des séries spécifiques.
id_type_tome (FK) : Si vous souhaitez associer les statistiques à des types de tomes spécifiques.
id_langue (FK) : Si vous souhaitez associer les statistiques à des langues spécifiques.
id_coffret (FK) : Si vous souhaitez associer les statistiques à des coffrets spécifiques.
periode : Pour enregistrer la période à laquelle les statistiques se rapportent (mois, trimestre, année, etc.).
categorie : Pour catégoriser les statistiques en fonction de critères spécifiques.
valeur_max : Pour enregistrer la valeur maximale dans une plage de statistiques.
valeur_min : Pour enregistrer la valeur minimale dans une plage de statistiques.
commentaire : Pour ajouter des commentaires ou des notes supplémentaires sur la statistique.
