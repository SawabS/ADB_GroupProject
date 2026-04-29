// Student ENROLLED_IN Course (via enrollments)
LOAD CSV WITH HEADERS FROM 'file:///enrollments_1000.csv' AS row
CALL (row) {
  MATCH (s:Student {student_id: row.student_id})
  MATCH (c:Course {course_id: row.course_id})
  MERGE (s)-[r:ENROLLED_IN]->(c)
  SET r.semester = row.semester,
      r.grade = row.grade,
      r.status = row.status
} IN TRANSACTIONS OF 500 ROWS;
