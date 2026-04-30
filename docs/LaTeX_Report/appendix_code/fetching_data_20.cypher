// Department PART_OF University
LOAD CSV WITH HEADERS FROM 'file:///departments.csv' AS row
CALL (row) {
  MATCH (d:Department {dept_id: row.dept_id})
  MATCH (u:University {university_id: row.university})
  MERGE (d)-[:PART_OF]->(u)
} IN TRANSACTIONS OF 500 ROWS;
