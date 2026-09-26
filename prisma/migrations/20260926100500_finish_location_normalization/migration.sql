UPDATE "activities"
SET "location" = replace(
  replace("location", 'Küresel (Küresel)', 'Küresel'),
  'Çevrimiçi (Çevrimiçi)',
  'Çevrimiçi'
);

UPDATE "activities"
SET "location" = 'Belirtilmemiş'
WHERE "location" IS NULL OR trim("location") = '';
