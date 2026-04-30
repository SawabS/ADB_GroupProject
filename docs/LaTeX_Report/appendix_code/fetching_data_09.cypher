// Events
LOAD CSV WITH HEADERS FROM 'file:///events.csv' AS row
MERGE (n:Event {event_id: row.event_id})
SET n.event_name = row.event_name,
    n.type = row.type,
    n.city = row.city,
    n.venue = row.venue,
    n.date = row.date,
    n.tickets = toInteger(row.tickets),
    n.price_usd = toFloat(row.price_usd),
    n.organiser = row.organiser;
