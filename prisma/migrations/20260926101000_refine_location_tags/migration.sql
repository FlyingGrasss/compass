UPDATE "activities"
SET "locationTags" = array_append("locationTags", 'TURKEY')
WHERE ("location" ILIKE '%Türkiye%'
    OR "location" ILIKE '%Turkey%'
    OR "location" ILIKE '%İstanbul%'
    OR "location" ILIKE '%Istanbul%'
    OR "location" ILIKE '%Ankara%'
    OR "location" ILIKE '%Eskişehir%')
  AND NOT ('TURKEY' = ANY("locationTags"));
