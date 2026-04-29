// Enrollments
LOAD CSV WITH HEADERS FROM 'file:///enrollments_1000.csv' AS row
MERGE (n:Enrollment {enroll_id: row.enroll_id})
SET n.student_id = row.student_id,
    n.course_id = row.course_id,
    n.semester = row.semester,
    n.status = row.status,
    n.grade = row.grade,
    n.enrolled_date = row.enrolled_date;
