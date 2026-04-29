MATCH path = (s:Student)-[:ENROLLED_IN]->(c:Course)-[:BELONGS_TO]->(d:Department)-[:PART_OF]->(u:University)-[:LOCATED_IN]->(city:City)
RETURN path,
       s.full_name AS Student,
       c.course_name AS Course,
       d.department_name AS Department,
       u.name AS University,
       city.name AS City
LIMIT 50;
