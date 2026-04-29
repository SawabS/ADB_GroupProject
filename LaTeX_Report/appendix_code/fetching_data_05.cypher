// Courses
LOAD CSV WITH HEADERS FROM 'file:///courses.csv' AS row
MERGE (n:Course {course_id: row.course_id})
SET n.course_name = row.course_name,
    n.credits = toInteger(row.credits),
    n.department = row.department,
    n.professor = row.professor,
    n.max_cap = toInteger(row.max_cap),
    n.mode = row.mode;
