MATCH path = (r:EventRegistration)-[:REGISTERED_FOR]->(e:Event)-[:LOCATED_IN]->(city:City)
RETURN path,
       e.event_name AS Event,
       e.type AS EventType,
       city.name AS City,
       r.ticket_type AS TicketType,
       r.paid_usd AS PaidUSD
LIMIT 50;
