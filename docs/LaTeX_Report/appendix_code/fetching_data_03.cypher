// Students
LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
MERGE (n:Student {student_id: row.student_id})
SET n.full_name = row.full_name,
    n.age = toInteger(row.age),
    n.city = row.city,
    n.major = row.major,
    n.gpa = toFloat(row.gpa),
    n.enroll_year = toInteger(row.enroll_year),
    n.phone = row.phone;
