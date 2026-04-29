// Departments
LOAD CSV WITH HEADERS FROM 'file:///departments.csv' AS row
MERGE (n:Department {dept_id: row.dept_id})
SET n.department_name = row.department_name,
    n.university = row.university,
    n.head_professor = row.head_professor,
    n.students = toInteger(row.students),
    n.budget_usd = toFloat(row.budget_usd);
