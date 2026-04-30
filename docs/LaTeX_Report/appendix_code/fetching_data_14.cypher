// Event Registrations
LOAD CSV WITH HEADERS FROM 'file:///event_registrations_1000.csv' AS row
MERGE (n:EventRegistration {registration_id: row.registration_id})
SET n.event_id = row.event_id,
    n.registrant_name = row.registrant_name,
    n.city = row.city,
    n.ticket_type = row.ticket_type,
    n.paid_usd = toFloat(row.paid_usd),
    n.registration_date = row.registration_date;

