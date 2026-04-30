// Government Projects
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
MERGE (n:GovernmentProject {project_id: row.project_id})
SET n.project_name = row.project_name,
    n.city = row.city,
    n.budget_usd = toFloat(row.budget_usd),
    n.start_date = row.start_date,
    n.end_date = row.end_date,
    n.status = row.status,
    n.lead_official = row.lead_official;
