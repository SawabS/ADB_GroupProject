MATCH path1 = (s:Student)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (s)-[:STUDIES_AT]->(u:University)-[:LOCATED_IN]->(uniCity:City)
WHERE homeCity.name <> uniCity.name
RETURN path1, path2,
       s.full_name AS Student,
       homeCity.name AS HomeCity,
       uniCity.name AS UniversityCity
LIMIT 30;
