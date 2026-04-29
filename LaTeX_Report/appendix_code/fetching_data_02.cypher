// Companies
LOAD CSV WITH HEADERS FROM 'file:///companies.csv' AS row
MERGE (n:Company {company_id: row.company_id})
SET n.company_name = row.company_name,
    n.city = row.city,
    n.sector = row.sector,
    n.founded = toInteger(row.founded),
    n.employees = toInteger(row.employees),
    n.annual_revenue_usd = toFloat(row.annual_revenue_usd),
    n.ceo = row.ceo;
