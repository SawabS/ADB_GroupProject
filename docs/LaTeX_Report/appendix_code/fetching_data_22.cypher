// GovernmentProject MANAGED_BY Ministry
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
CALL (row) {
  MATCH (p:GovernmentProject {project_id: row.project_id})
  MATCH (m:Ministry {ministry_id: row.ministry})
  MERGE (p)-[:MANAGED_BY]->(m)
} IN TRANSACTIONS OF 500 ROWS;
