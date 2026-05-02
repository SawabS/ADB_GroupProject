/*
CRUD Operation: CREATE

Run this after the main CSV import and relationship creation steps.
The script creates a small demo education subgraph without changing the
imported dataset records.
*/

MERGE (city:City {name: 'Erbil'})

MERGE (university:University {university_id: 'UKH'})
ON CREATE SET
  university.name = 'University of Kurdistan Hewler',
  university.city = 'Erbil',
  university.founded = 2006,
  university.students = 3200,
  university.departments = 8,
  university.contact_email = 'info@ukh.edu.iq'

MERGE (department:Department {dept_id: 'D01'})
ON CREATE SET
  department.department_name = 'Computer Science',
  department.university = 'UKH',
  department.head_professor = 'Dr. Khalid Aziz',
  department.students = 320,
  department.budget_usd = 480000

MERGE (student:Student {student_id: 'CRUD_DEMO_STUDENT_001'})
SET
  student.full_name = 'CRUD Demo Student',
  student.age = 23,
  student.city = 'Erbil',
  student.major = 'Advanced Database Systems',
  student.gpa = 3.75,
  student.enroll_year = 2026,
  student.phone = '+964-750-000-0000'

MERGE (course:Course {course_id: 'CRUD_DEMO_COURSE_001'})
SET
  course.course_name = 'Graph Database CRUD Lab',
  course.credits = 3,
  course.department = 'D01',
  course.professor = 'Dr. CRUD Demo',
  course.max_cap = 30,
  course.mode = 'Hybrid'

MERGE (enrollment:Enrollment {enroll_id: 'CRUD_DEMO_ENROLL_001'})
SET
  enrollment.student_id = student.student_id,
  enrollment.course_id = course.course_id,
  enrollment.semester = 'Spring 2026',
  enrollment.status = 'active',
  enrollment.grade = 'A',
  enrollment.enrolled_date = '2026-05-02'

MERGE (student)-[:LIVES_IN]->(city)
MERGE (student)-[:STUDIES_AT]->(university)
MERGE (student)-[enrolledRel:ENROLLED_IN]->(course)
MERGE (course)-[:BELONGS_TO]->(department)
MERGE (department)-[:PART_OF]->(university)
SET
  enrolledRel.semester = enrollment.semester,
  enrolledRel.status = enrollment.status,
  enrolledRel.grade = enrollment.grade

RETURN
  student,
  city,
  university,
  department,
  course,
  enrollment,
  enrolledRel;
