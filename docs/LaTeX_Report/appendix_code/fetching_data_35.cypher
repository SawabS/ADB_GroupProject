// See a student, their courses, and their university
MATCH path = (s:Student)-[:STUDIES_AT]->(u:University),
             (s)-[:ENROLLED_IN]->(c:Course)
RETURN path LIMIT 25;
