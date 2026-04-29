// Ministries
LOAD CSV WITH HEADERS FROM 'file:///ministries.csv' AS row
MERGE (n:Ministry {ministry_id: row.ministry_id})
SET n.ministry_name = row.ministry_name,
    n.city = row.city,
    n.minister = row.minister,
    n.employees = toInteger(row.employees),
    n.annual_budget_usd = toFloat(row.annual_budget_usd),
    n.website = row.website;
