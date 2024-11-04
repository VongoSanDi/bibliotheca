-- Search a book
SELECT * FROM BOOK
WHERE REPLACE(title, ' ', '') like '%onepiece%';

-- Check the user progression in his collection
SELECT 
    series_name,
    owned_volumes,
    available_volumes_in_user_language,
    total_volumes_original,
    completion_percentage,
    translation_percentage,
    status_name,
    last_acquisition_date,
    total_spent_on_series
FROM v_collection_progress
WHERE user_id = 1
AND (owned_volumes > 0 OR available_volumes_in_user_language > 0)
ORDER BY completion_percentage DESC;

-- Global statistics for an user
SELECT * FROM v_collection_statistics
WHERE user_id = 1;

-- Check the books bought in the last 6 months
SELECT * FROM VW_ANALYSE_MENSUELLE
WHERE user_id = 1
  AND Month >= DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH), '%Y-%m');

-- Check series to be completed
SELECT 
    series_name,
    owned_volumes,
    available_volumes_in_user_language,
    (available_volumes_in_user_language - owned_volumes) as volumes_missing,
    ROUND(average_volume_price * (available_volumes_in_user_language - owned_volumes), 2) as estimated_cost_to_complete
FROM v_collection_progress
WHERE user_id = 1 
AND owned_volumes < available_volumes_in_user_language
ORDER BY (available_volumes_in_user_language - owned_volumes) DESC;

-- Checkc completed series
SELECT 
    series_name,
    owned_volumes,
    total_volumes_original,
    total_spent_on_series,
    last_acquisition_date
FROM v_collection_progress
WHERE user_id = 1 
AND owned_volumes = total_volumes_original;

-- Get all the books from the genre 1 for example
SELECT *
FROM COLLECTION c
JOIN VOLUME v on c.volume_id = v.volume_id
JOIN BOOK b on b.book_id = v.book_id
JOIN GENRE g on g.genre_id = b.genre_id
WHERE b.genre_id = 1;
