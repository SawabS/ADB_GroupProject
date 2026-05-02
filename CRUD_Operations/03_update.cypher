/*
CRUD Operation: UPDATE

You can run this after 01_create.cypher. It updates both node properties and the
ENROLLED_IN relationship properties.
*/

MATCH (student:Student {student_id: 'CRUD_DEMO_STUDENT_001'})
SET
  student.major = 'Graph Data Management',
  student.gpa = 3.95,
  student.phone = '+964-750-000-0999',
  student.updated_at = date('2026-05-02')

WITH student
MATCH (course:Course {course_id: 'CRUD_DEMO_COURSE_001'})
SET
  course.mode = 'In-person',
  course.max_cap = 35,
  course.updated_at = date('2026-05-02')

WITH student, course
MATCH (student)-[enrolledRel:ENROLLED_IN]->(course)
SET
  enrolledRel.status = 'completed',
  enrolledRel.grade = 'A+',
  enrolledRel.updated_at = date('2026-05-02')

WITH student, course, enrolledRel
MATCH (enrollment:Enrollment {enroll_id: 'CRUD_DEMO_ENROLL_001'})
SET
  enrollment.status = enrolledRel.status,
  enrollment.grade = enrolledRel.grade,
  enrollment.updated_at = date('2026-05-02')

RETURN
  student.student_id AS StudentID,
  student.major AS UpdatedMajor,
  student.gpa AS UpdatedGPA,
  course.course_name AS Course,
  course.mode AS UpdatedCourseMode,
  course.max_cap AS UpdatedCourseCapacity,
  enrollment.status AS UpdatedEnrollmentStatus,
  enrollment.grade AS UpdatedEnrollmentGrade,
  enrolledRel.status AS UpdatedRelationshipStatus,
  enrolledRel.grade AS UpdatedRelationshipGrade;
