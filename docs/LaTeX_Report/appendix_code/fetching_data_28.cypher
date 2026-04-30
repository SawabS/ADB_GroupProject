// Event LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///events.csv' AS row
CALL (row) {
  MATCH (e:Event {event_id: row.event_id})
  MATCH (c:City {name: row.city})
  MERGE (e)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
