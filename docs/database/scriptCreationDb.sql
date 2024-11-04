-- Reference tables
CREATE TABLE COUNTRY (
    country_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE CURRENCY (
    currency_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    currency_name VARCHAR(50) NOT NULL,
    currency_symbol CHAR(3) NOT NULL,
    iso_code CHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE LANGUAGE (
    language_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    language_name VARCHAR(50) NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE GENRE (
    genre_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE TYPE (
    type_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE EDITION (
    edition_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    edition_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

CREATE TABLE STATUS (
    status_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

);

-- Main tables
CREATE TABLE USER (
    user_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    birth_date DATE,
    gender_id TINYINT UNSIGNED,
    country_id TINYINT UNSIGNED NOT NULL,
    last_login DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE AUTHOR (
    author_id MEDIUMINT UNSIGNED UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    pen_name VARCHAR(100) NOT NULL,
    country_id TINYINT UNSIGNED NOT NULL,
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE PUBLISHER (
    publisher_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    publisher_name VARCHAR(100) NOT NULL UNIQUE,
    website VARCHAR(255),
    country_id TINYINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE SERIE (
    serie_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    serie_name VARCHAR(255) NOT NULL,
    author_id MEDIUMINT UNSIGNED NOT NULL,
    status_id TINYINT UNSIGNED NOT NULL,
    genre_id TINYINT UNSIGNED NOT NULL,
    publisher_id SMALLINT UNSIGNED NOT NULL,
    original_volumes_count TINYINT UNSIGNED,
    translated_volumes_count TINYINT UNSIGNED,
    publication_start_date DATE NOT NULL,
    publication_end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES AUTHOR(author_id),
    FOREIGN KEY (status_id) REFERENCES STATUS(status_id),
    FOREIGN KEY (genre_id) REFERENCES GENRE(genre_id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(publisher_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

-- LIVRE, permet de gérer un livre dans plusieurs langue, différentes édition ...
-- It contains the general informations on a book
CREATE TABLE BOOK (
    book_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    original_title VARCHAR(255) NOT NULL,
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
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (serie_id) REFERENCES SERIE(serie_id),
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id),
    FOREIGN KEY (author_id) REFERENCES AUTHOR(author_id),
    FOREIGN KEY (publisher_id) REFERENCES PUBLISHER(publisher_id),
    FOREIGN KEY (edition_id) REFERENCES EDITION(edition_id),
    FOREIGN KEY (artist_id) REFERENCES ARTIST(artist_id),
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

-- TOME
CREATE TABLE VOLUME (
    volume_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    book_id BIGINT UNSIGNED NOT NULL,
    language_id TINYINT UNSIGNED NOT NULL,
    translated_title VARCHAR(255) NOT NULL,
    acquisition_price DECIMAL(10,2),
    currency_id TINYINT UNSIGNED NOT NULL,
    acquisition_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES BOOK(book_id),
    FOREIGN KEY (language_id) REFERENCES LANGUAGE(language_id),
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE BOX_SET (
    box_set_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES CURRENCY(currency_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE BOX_SET_BOOK (
    box_set_id SMALLINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,

    PRIMARY KEY (box_set_id, book_id),
    FOREIGN KEY (box_set_id) REFERENCES BOX_SET(box_set_id),
    FOREIGN KEY (book_id) REFERENCES BOOK(book_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

CREATE TABLE COLLECTION (
    collection_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    volume_id BIGINT UNSIGNED NOT NULL,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    acquisition_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by MEDIUMINT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_by MEDIUMINT NOT NULL,
    UNIQUE KEY unique_volume_user (volume_id, user_id),
    FOREIGN KEY (volume_id) REFERENCES VOLUME(volume_id),
    FOREIGN KEY (user_id) REFERENCES USER(user_id),
    FOREIGN KEY (created_by) REFERENCES USER(user_id),
    FOREIGN KEY (updated_by) REFERENCES USER(user_id)
);

--  
-- CREATE TABLE DUPLICATE (
--     duplicate_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     volume_id BIGINT UNSIGNED NOT NULL,
--     user_id MEDIUMINT UNSIGNED NOT NULL,
--     acquisition_date DATETIME NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     created_by MEDIUMINT UNSIGNED NOT NULL,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
--     updated_by MEDIUMINT NOT NULL,
--     FOREIGN KEY (volume_id) REFERENCES VOLUME(volume_id),
--     FOREIGN KEY (user_id) REFERENCES USER(user_id),
--     FOREIGN KEY (created_by) REFERENCES USER(user_id),
--     FOREIGN KEY (updated_by) REFERENCES USER(user_id)
-- );

-- Indexes
CREATE INDEX idx_book_isbn ON BOOK(isbn);
CREATE INDEX idx_book_title ON BOOK(title);
CREATE INDEX idx_serie_name ON SERIE(serie_name);
CREATE INDEX idx_user_username ON USER(username);
CREATE INDEX idx_user_email ON USER(email);
CREATE INDEX idx_book_author ON BOOK(author_id);
CREATE INDEX idx_book_publisher ON BOOK(publisher_id);
CREATE INDEX idx_collection_user ON COLLECTION(user_id);
CREATE INDEX idx_volume_book ON VOLUME(book_id);

-- View for the books and serie details
CREATE VIEW v_book_details AS
SELECT 
    b.book_id,
    b.isbn,
    b.title,
    b.description,
    s.serie_name,
    t.type_name,
    CONCAT(COALESCE(a.pen_name, CONCAT(a.first_name, ' ', a.last_name))) as author_name,
    CONCAT(COALESCE(art.pen_name, CONCAT(art.first_name, ' ', art.last_name))) as artist_name,
    p.publisher_name,
    g.genre_name,
    b.release_date,
    e.edition_name,
    b.release_price,
    c.currency_symbol,
    b.page_count,
    b.image_url
FROM BOOK b
    JOIN SERIE s ON b.serie_id = s.serie_id
    JOIN TYPE t ON b.type_id = t.type_id
    JOIN AUTHOR a ON b.author_id = a.author_id
    JOIN ARTIST art ON b.artist_id = art.artist_id
    JOIN PUBLISHER p ON b.publisher_id = p.publisher_id
    JOIN GENRE g ON b.genre_id = g.genre_id
    JOIN EDITION e ON b.edition_id = e.edition_id
    JOIN CURRENCY c ON b.currency_id = c.currency_id;

CREATE VIEW v_serie_details AS
SELECT 
    s.serie_id,
    s.serie_name,
    s.description,
    CONCAT(COALESCE(a.pen_name, CONCAT(a.first_name, ' ', a.last_name))) as author_name,
    st.status_name,
    p.publisher_name,
    s.original_volumes_count,
    s.translated_volumes_count,
    s.publication_start_date,
    s.publication_end_date,
    COUNT(b.book_id) as published_books_count
FROM SERIE s
    LEFT JOIN AUTHOR a ON s.author_id = a.author_id
    LEFT JOIN STATUS st ON s.status_id = st.status_id
    LEFT JOIN PUBLISHER p ON s.publisher_id = p.publisher_id
    LEFT JOIN BOOK b ON s.serie_id = b.serie_id
GROUP BY s.serie_id;

-- See the collection statistics
CREATE VIEW v_collection_statistics AS
SELECT 
    u.user_id,
    u.username,
    COUNT(DISTINCT c.volume_id) as total_volumes,
    COUNT(DISTINCT b.serie_id) as unique_serie,
    SUM(v.acquisition_price) as total_spent,
    MAX(v.acquisition_date) as last_acquisition
FROM USER u
    LEFT JOIN COLLECTION c ON u.user_id = c.user_id
    LEFT JOIN VOLUME v ON c.volume_id = v.volume_id
    LEFT JOIN BOOK b ON v.book_id = b.book_id
GROUP BY u.user_id;

-- Box set details
CREATE VIEW v_box_set_details AS
SELECT 
    bs.box_set_id,
    bs.box_set_name,
    bs.description,
    bs.release_date,
    bs.release_price,
    c.currency_symbol,
    COUNT(bsv.volume_id) as volume_count,
    GROUP_CONCAT(b.title ORDER BY b.title SEPARATOR ', ') as contained_books
FROM BOX_SET bs
    LEFT JOIN CURRENCY c ON bs.currency_id = c.currency_id
    LEFT JOIN BOX_SET_VOLUME bsv ON bs.box_set_id = bsv.box_set_id
    LEFT JOIN VOLUME v ON bsv.volume_id = v.volume_id
    LEFT JOIN BOOK b ON v.book_id = b.book_id
GROUP BY bs.box_set_id;

-- Genre statistics
CREATE VIEW v_genre_statistics AS
SELECT 
    g.genre_name,
    COUNT(b.book_id) as total_books,
    COUNT(DISTINCT b.serie_id) as unique_serie,
    COUNT(DISTINCT b.author_id) as unique_authors,
    AVG(b.release_price) as avg_price
FROM GENRE g
    LEFT JOIN BOOK b ON g.genre_id = b.genre_id
GROUP BY g.genre_id;

-- Publisher statistics
CREATE VIEW v_publisher_statistics AS
SELECT 
    p.publisher_name,
    COUNT(DISTINCT b.book_id) as total_books,
    COUNT(DISTINCT b.serie_id) as total_serie,
    COUNT(DISTINCT b.author_id) as total_authors,
    AVG(b.release_price) as avg_book_price,
    MAX(b.release_date) as latest_publication
FROM PUBLISHER p
    LEFT JOIN BOOK b ON p.publisher_id = b.publisher_id
GROUP BY p.publisher_id;

-- View to search for books dupe
CREATE VIEW v_user_duplicates AS
SELECT 
    u.username,
    b.title,
    s.serie_name,
    COUNT(*) as duplicate_count,
    GROUP_CONCAT(d.acquisition_date ORDER BY d.acquisition_date) as acquisition_dates
FROM DUPLICATE d
    JOIN USER u ON d.user_id = u.user_id
    JOIN VOLUME v ON d.volume_id = v.volume_id
    JOIN BOOK b ON v.book_id = b.book_id
    JOIN SERIE s ON b.serie_id = s.serie_id
GROUP BY u.user_id, v.volume_id
HAVING COUNT(*) > 1;

-- View for the recent acquisition
CREATE VIEW v_recent_acquisitions AS
SELECT 
    u.username,
    b.title,
    s.serie_name,
    v.acquisition_date,
    v.acquisition_price,
    cur.currency_symbol,
    'Collection' as acquisition_type
FROM COLLECTION c
    JOIN USER u ON c.user_id = u.user_id
    JOIN VOLUME v ON c.volume_id = v.volume_id
    JOIN BOOK b ON v.book_id = b.book_id
    JOIN SERIE s ON b.serie_id = s.serie_id
    LEFT JOIN CURRENCY cur ON v.currency_id = cur.currency_id
UNION ALL
SELECT 
    u.username,
    b.title,
    s.serie_name,
    v.acquisition_date,
    v.acquisition_price,
    cur.currency_symbol,
    'Duplicate' as acquisition_type
FROM DUPLICATE d
    JOIN USER u ON d.user_id = u.user_id
    JOIN VOLUME v ON d.volume_id = v.volume_id
    JOIN BOOK b ON v.book_id = b.book_id
    JOIN SERIE s ON b.serie_id = s.serie_id
    LEFT JOIN CURRENCY cur ON v.currency_id = cur.currency_id
ORDER BY acquisition_date DESC;

-- See the user progression in his collection
CREATE VIEW v_collection_progress AS
WITH user_volumes AS (
    -- Compte le nombre de volumes par série pour chaque utilisateur
    SELECT 
        c.user_id,
        b.serie_id,
        COUNT(DISTINCT v.volume_id) as owned_volumes_count
    FROM COLLECTION c
    JOIN VOLUME v ON c.volume_id = v.volume_id
    JOIN BOOK b ON v.book_id = b.book_id
    GROUP BY c.user_id, b.serie_id
),
volumes_by_language AS (
    -- Compte le nombre de volumes disponibles par série et langue
    SELECT 
        b.serie_id,
        v.language_id,
        COUNT(DISTINCT v.volume_id) as available_volumes_count
    FROM VOLUME v
    JOIN BOOK b ON v.book_id = b.book_id
    GROUP BY b.serie_id, v.language_id
)
SELECT 
    -- Informations utilisateur
    u.user_id,
    u.username,
    
    -- Informations série
    s.serie_id,
    s.serie_name,
    s.original_volumes_count as total_volumes_original,
    
    CONCAT(COALESCE(a.pen_name, CONCAT(a.first_name, ' ', a.last_name))) as author_name,
    ac.country_name as origin_country,
    
    -- Statistiques de collection
    COALESCE(uv.owned_volumes_count, 0) as owned_volumes,
    COALESCE(vbl.available_volumes_count, 0) as available_volumes_in_user_language,
    
    -- Calcul des pourcentages
    ROUND(COALESCE(uv.owned_volumes_count * 100.0 / NULLIF(s.original_volumes_count, 0), 0), 2) as completion_percentage,
    ROUND(COALESCE(vbl.available_volumes_count * 100.0 / NULLIF(s.original_volumes_count, 0), 0), 2) as translation_percentage,
    
    -- Statut de la série
    st.status_name,
    
    -- Dernière acquisition
    MAX(c.acquisition_date) as last_acquisition_date,
    
    -- Informations supplémentaires
    p.publisher_name,
    
    -- Prix et valeur
    -- SUM(v.acquisition_price) as total_spent_on_serie,
    AVG(v.acquisition_price) as average_volume_price
FROM USER u
CROSS JOIN SERIE s  -- Pour voir toutes les séries, même celles non possédées
LEFT JOIN user_volumes uv ON u.user_id = uv.user_id AND s.serie_id = uv.serie_id
LEFT JOIN AUTHOR a ON s.author_id = a.author_id
LEFT JOIN COUNTRY ac ON a.country_id = ac.country_id
LEFT JOIN STATUS st ON s.status_id = st.status_id
LEFT JOIN PUBLISHER p ON s.publisher_id = p.publisher_id
LEFT JOIN volumes_by_language vbl ON s.serie_id = vbl.serie_id 
    AND vbl.language_id = (
        SELECT l.language_id 
        FROM LANGUAGE l 
        JOIN COUNTRY c ON l.iso_code = c.iso_code 
        WHERE c.country_id = u.country_id
    )
LEFT JOIN LANGUAGE l ON vbl.language_id = l.language_id
LEFT JOIN COLLECTION c ON u.user_id = c.user_id
LEFT JOIN VOLUME v ON c.volume_id = v.volume_id
LEFT JOIN BOOK b ON v.book_id = b.book_id AND b.serie_id = s.serie_id
GROUP BY 
    u.user_id, u.username, s.serie_id, s.serie_name, 
    s.original_volumes_count, author_name, ac.country_name,
    uv.owned_volumes_count, vbl.available_volumes_count,
    st.status_name, l.language_name, p.publisher_name;
