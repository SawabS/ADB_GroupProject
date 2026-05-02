/*
CRUD Operation: READ

Run this after 01_create.cypher to display the demo records and relationships.
The first query is good for graph view. The second query is good for table view.
*/

MATCH path1 = (student:Student {student_id: 'CRUD_DEMO_STUDENT_001'})-[:LIVES_IN]->(city:City)
MATCH path2 = (student)-[:STUDIES_AT]->(university:University)
MATCH path3 = (student)-[enrolledRel:ENROLLED_IN]->(course:Course {course_id: 'CRUD_DEMO_COURSE_001'})
MATCH path4 = (course)-[:BELONGS_TO]->(department:Department)-[:PART_OF]->(university)
MATCH (enrollment:Enrollment {enroll_id: 'CRUD_DEMO_ENROLL_001'})
RETURN
  path1,
  path2,
  path3,
  path4,
  enrollment,
  enrolledRel.status AS RelationshipStatus,
  enrolledRel.grade AS RelationshipGrade;

MATCH (student:Student {student_id: 'CRUD_DEMO_STUDENT_001'})
OPTIONAL MATCH (student)-[:LIVES_IN]->(city:City)
OPTIONAL MATCH (student)-[:STUDIES_AT]->(university:University)
OPTIONAL MATCH (student)-[enrolledRel:ENROLLED_IN]->(course:Course)
OPTIONAL MATCH (course)-[:BELONGS_TO]->(department:Department)
OPTIONAL MATCH (enrollment:Enrollment {enroll_id: 'CRUD_DEMO_ENROLL_001'})
RETURN
  student.student_id AS StudentID,
  student.full_name AS StudentName,
  student.major AS Major,
  student.gpa AS GPA,
  city.name AS City,
  university.name AS University,
  course.course_name AS Course,
  department.department_name AS Department,
  enrollment.status AS EnrollmentNodeStatus,
  enrollment.grade AS EnrollmentNodeGrade,
  enrolledRel.status AS EnrollmentRelationshipStatus,
  enrolledRel.grade AS EnrollmentRelationshipGrade;
