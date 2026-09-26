ALTER TABLE "users"
ADD COLUMN "preferredLocations" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "activities"
ADD COLUMN "locationTags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "activities"
SET "location" = regexp_replace(
  regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            COALESCE(NULLIF(trim("location"), ''), 'Belirtilmemiş'),
            'Amerika Birleşik Devletleri', 'ABD', 'gi'
          ),
          'U\\.S\\.', 'ABD', 'gi'
        ),
        'USA', 'ABD', 'gi'
      ),
      'Abd', 'ABD', 'gi'
    ),
    'Global', 'Küresel', 'gi'
  ),
  'Online', 'Çevrimiçi', 'gi'
);

UPDATE "activities"
SET "location" = regexp_replace(
  regexp_replace(
    regexp_replace("location", 'international', 'Uluslararası', 'gi'),
    'Küresel\\s*\\(\\s*Küresel\\s*\\)', 'Küresel', 'gi'
  ),
  'Çevrimiçi\\s*\\(\\s*Çevrimiçi\\s*\\)', 'Çevrimiçi', 'gi'
);

UPDATE "activities" AS activity
SET "locationTags" = CASE
  WHEN activity."location" IS NULL
    OR trim(activity."location") = ''
    OR activity."location" ILIKE 'Belirtilmemiş'
    THEN ARRAY['UNSPECIFIED']::TEXT[]
  ELSE COALESCE(
    (
      SELECT array_agg(candidate.tag ORDER BY candidate.rank)
      FROM (
        VALUES
          ('TURKEY', 1, activity."location" ILIKE '%Türkiye%' OR activity."location" ILIKE '%Turkey%'),
          ('ONLINE', 2, activity."location" ILIKE '%Çevrimiçi%' OR activity."location" ILIKE '%online%'),
          ('USA', 3, activity."location" ILIKE '%ABD%' OR activity."location" ILIKE '%USA%' OR activity."location" ILIKE '%U.S.%' OR activity."location" ILIKE '%Amerika Birleşik Devletleri%'),
          ('EUROPE', 4, activity."location" ILIKE '%Avrupa%' OR activity."location" ILIKE '%İtalya%' OR activity."location" ILIKE '%İngiltere%' OR activity."location" ILIKE '%Birleşik Krallık%' OR activity."location" ILIKE '%Oxford%' OR activity."location" ILIKE '%Roma%'),
          ('GLOBAL', 5, activity."location" ILIKE '%Küresel%' OR activity."location" ILIKE '%Uluslararası%' OR activity."location" ILIKE '%global%' OR activity."location" ILIKE '%international%'),
          ('CANADA', 6, activity."location" ILIKE '%Kanada%' OR activity."location" ILIKE '%Canada%' OR activity."location" ILIKE '%Montreal%' OR activity."location" ILIKE '%McGill%'),
          ('UK', 7, activity."location" ILIKE '%Birleşik Krallık%' OR activity."location" ILIKE '%İngiltere%' OR activity."location" ILIKE '%Oxford%'),
          ('AUSTRALIA', 8, activity."location" ILIKE '%Avustralya%' OR activity."location" ILIKE '%Australia%')
      ) AS candidate(tag, rank, matches)
      WHERE candidate.matches
    ),
    ARRAY['OTHER']::TEXT[]
  )
END;
