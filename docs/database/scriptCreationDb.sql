-- AUTHOR, BOOK, BOOK_SET, BOOK_SET_VOLUME, COLLECTION, COLLECTION_VOLUME, COUNTRY, CURRENCY, EDITION, GENRE, LANGUAGE, PUBLISHER, SERIE, STATUS, USER, VOLUME, TYPE
-- Reference tables
CREATE TABLE COUNTRY (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE,
    INDEX idx_country_iso (iso_code)
);

CREATE TABLE CURRENCY (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    currency_name VARCHAR(50) NOT NULL UNIQUE,
    currency_symbol CHAR(3) NOT NULL,
    iso_code CHAR(3) NOT NULL UNIQUE,
    INDEX idx_currency_iso (iso_code)
);

CREATE TABLE LANGUAGE (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    language_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE,
    INDEX idx_language_iso (iso_code)
);

CREATE TABLE GENRE (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE TYPE (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE EDITION (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    edition_name VARCHAR(50) NOT NULL
);

CREATE TABLE STATUS (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status_code VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique code for client-side translations'
);

-- Main tables
CREATE TABLE USER (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    birth_date DATE,
    gender_id TINYINT UNSIGNED,
    country_id TINYINT UNSIGNED NOT NULL,
    last_login DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(id)
);

CREATE TABLE AUTHOR (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    pen_name VARCHAR(100) NOT NULL,
    country_id TINYINT UNSIGNED NOT NULL,
    biography TEXT COMPRESSED,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(id)
);

CREATE TABLE PUBLISHER (
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    publisher_name VARCHAR(100) NOT NULL UNIQUE,
    website VARCHAR(255),
    country_id TINYINT UNSIGNED,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(id)
);

CREATE TABLE SERIE (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    serie_name VARCHAR(255) NOT NULL COMMENT 'Original title of the serie',
    author_id MEDIUMINT UNSIGNED NOT NULL,
    status_id TINYINT UNSIGNED NOT NULL,
    genre_id TINYINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    original_language_id TINYINT UNSIGNED NOT NULL COMMENT 'Original language of the serie',
    original_volumes_count TINYINT UNSIGNED,
    translated_volumes_count TINYINT UNSIGNED,
    publication_start_date DATE NOT NULL,
    publication_end_date DATE,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (author_id) REFERENCES AUTHOR(id),
    FOREIGN KEY (status_id) REFERENCES STATUS(id),
    FOREIGN KEY (genre_id) REFERENCES GENRE(id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(id),
    FOREIGN KEY (created_by) REFERENCES USER(id),
    FOREIGN KEY (updated_by) REFERENCES USER(id),
    FOREIGN KEY (original_language_id) REFERENCES LANGUAGE(id)
);

-- LIVRE, permet de gérer un livre dans plusieurs langue, différentes édition ...
-- It contains the general informations on a book
CREATE TABLE BOOK (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    original_title VARCHAR(255) NOT NULL COMMENT 'Original title of the book',
    original_language_id TINYINT UNSIGNED NOT NULL COMMENT 'Original language of the book',
    book_number TINYINT UNSIGNED NOT NULL,
    serie_id BIGINT UNSIGNED NOT NULL,
    type_id TINYINT UNSIGNED NOT NULL,
    author_id MEDIUMINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    edition_id TINYINT UNSIGNED NOT NULL,
    release_date DATE NOT NULL,
    release_price DECIMAL(10,2) NOT NULL,
    currency_id TINYINT UNSIGNED NOT NULL,
    page_count SMALLINT UNSIGNED NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (serie_id) REFERENCES SERIE(id),
    FOREIGN KEY (type_id) REFERENCES TYPE(id),
    FOREIGN KEY (author_id) REFERENCES AUTHOR(id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(id),
    FOREIGN KEY (edition_id) REFERENCES EDITION(id),
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(id),
    FOREIGN KEY (created_by) REFERENCES USER(id),
    FOREIGN KEY (updated_by) REFERENCES USER(id),
    FOREIGN KEY (original_language_id) REFERENCES LANGUAGE(id)
);

-- TOME
CREATE TABLE VOLUME (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    book_id BIGINT UNSIGNED NOT NULL,
    language_id TINYINT UNSIGNED NOT NULL,
    translated_title VARCHAR(255) NOT NULL,
    acquisition_price DECIMAL(10,2),
    currency_id TINYINT UNSIGNED,
    acquisition_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (book_id) REFERENCES BOOK(id) ON DELETE RESTRICT,
    FOREIGN KEY (language_id) REFERENCES LANGUAGE(id) ON DELETE RESTRICT,
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES USER(id),
    FOREIGN KEY (updated_by) REFERENCES USER(id)
);

CREATE TABLE BOX_SET (
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    original_box_set_title VARCHAR(255) NOT NULL,
    language_id TINYINT UNSIGNED NOT NuLL,
    serie_id BIGINT UNSIGNED NOT NULL,
    author_id MEDIUMINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    release_date DATE NOT NULL,
    release_price DECIMAL(10,2),
    currency_id TINYINT UNSIGNED,
    image_url VARCHAR(255) NOT NULL,
    description TEXT COMPRESSED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(id),
    FOREIGN KEY (created_by) REFERENCES USER(id),
    FOREIGN KEY (updated_by) REFERENCES USER(id)
);

CREATE TABLE BOX_SET_BOOK (
    box_set_id SMALLINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (box_set_id, book_id),
    FOREIGN KEY (box_set_id) REFERENCES BOX_SET(id),
    FOREIGN KEY (book_id) REFERENCES BOOK(id)
);

CREATE TABLE COLLECTION (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES USER(id),
    FOREIGN KEY (updated_by) REFERENCES USER(id)
);

-- Joint table for the volumes of the collection
CREATE TABLE COLLECTION_VOLUME (
    collection_id MEDIUMINT UNSIGNED NOT NULL,
    volume_id BIGINT UNSIGNED NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (collection_id, volume_id),
    FOREIGN KEY (collection_id) REFERENCES COLLECTION(id) ON DELETE CASCADE,
    FOREIGN KEY (volume_id) REFERENCES VOLUME(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_book_isbn ON BOOK(isbn);
CREATE INDEX idx_serie_name ON SERIE(serie_name);
CREATE INDEX idx_user_username ON USER(username);
CREATE INDEX idx_book_author ON BOOK(author_id);
CREATE INDEX idx_book_publisher ON BOOK(publisher_id);
CREATE INDEX idx_collection_user ON COLLECTION(user_id);
CREATE INDEX idx_volume_book ON VOLUME(book_id);
CREATE INDEX idx_collection_volume_collection ON COLLECTION_VOLUME(collection_id);
CREATE INDEX idx_collection_volume_volume ON COLLECTION_VOLUME(volume_id);

-- I just need 1 trigger for the user table, since when creating the user, i don't have an user_id yet
-- For the other tables, since the users will always be logged in, i will always provide the user_id
DROP TRIGGER IF EXISTS user_after_insert;

DELIMITER //

CREATE TRIGGER user_before_insert 
BEFORE INSERT ON `USER`
FOR EACH ROW
BEGIN
    SET NEW.created_at = CURRENT_TIMESTAMP;
    SET NEW.updated_at = CURRENT_TIMESTAMP;
    -- We use the next auto incremented value the same used for the user_id
    SET @next_id = (SELECT AUTO_INCREMENT 
                    FROM information_schema.TABLES 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'USER');
    SET NEW.created_by = @next_id;
    SET NEW.updated_by = @next_id;
END;
//

DELIMITER ;

-- Since getting an user collection need a lot of join, i think the best way is to create a VIEW doing the join for me, so i just need to request if from the collection module
CREATE OR REPLACE VIEW user_collection AS
SELECT 
    U.id,
    U.username,
    S.serie_name,
    B.book_number,
    B.ORIGINAL_TITLE,
    V.TRANSLATED_TITLE,
    A.PEN_NAME AS AUTHOR,
    V.ACQUISITION_DATE,
    V.ACQUISITION_PRICE,
    C.CURRENCY_SYMBOL
FROM USER U
JOIN COLLECTION COL ON COL.USER_ID = U.ID
JOIN COLLECTION_VOLUME CV ON CV.COLLECTION_ID = COL.ID
JOIN VOLUME V ON V.ID = CV.VOLUME_ID
JOIN BOOK B ON B.ID = V.BOOK_ID
JOIN SERIE S ON S.ID = B.SERIE_ID
JOIN AUTHOR A ON A.ID = S.AUTHOR_ID
JOIN CURRENCY C ON C.ID = V.CURRENCY_ID;
