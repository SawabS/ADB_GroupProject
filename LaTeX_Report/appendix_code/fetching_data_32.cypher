// EventRegistration REGISTERED_FOR Event
LOAD CSV WITH HEADERS FROM 'file:///event_registrations_1000.csv' AS row
CALL (row) {
  MATCH (r:EventRegistration {registration_id: row.registration_id})
  MATCH (e:Event {event_id: row.event_id})
  MERGE (r)-[:REGISTERED_FOR]->(e)
} IN TRANSACTIONS OF 500 ROWS;
