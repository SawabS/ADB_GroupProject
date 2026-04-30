MATCH (s:Student) RETURN DISTINCT s.city LIMIT 10;
// Compare with:
MATCH (u:University) RETURN DISTINCT u.name LIMIT 10;
