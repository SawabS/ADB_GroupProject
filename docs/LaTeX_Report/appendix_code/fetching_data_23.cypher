// GovernmentProject LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
CALL (row) {
  MATCH (p:GovernmentProject {project_id: row.project_id})
  MATCH (c:City {name: row.city})
  MERGE (p)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
