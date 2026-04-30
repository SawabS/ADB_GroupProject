// Course BELONGS_TO Department
LOAD CSV WITH HEADERS FROM 'file:///courses.csv' AS row
CALL (row) {
  MATCH (c:Course {course_id: row.course_id})
  MATCH (d:Department {dept_id: row.department})
  MERGE (c)-[:BELONGS_TO]->(d)
} IN TRANSACTIONS OF 500 ROWS;
