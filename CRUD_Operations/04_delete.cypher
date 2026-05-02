/*
CRUD Operation: DELETE

This removes only the demo nodes created by 01_create.cypher. DETACH DELETE
also removes their relationships. Shared production/import nodes such as City
and University are not deleted.
*/

MATCH (node)
WHERE
  (node:Student AND node.student_id STARTS WITH 'CRUD_DEMO_')
  OR (node:Course AND node.course_id STARTS WITH 'CRUD_DEMO_')
  OR (node:Enrollment AND node.enroll_id STARTS WITH 'CRUD_DEMO_')
DETACH DELETE node
RETURN count(*) AS DeletedDemoNodes;

MATCH (node)
WHERE
  (node:Student AND node.student_id STARTS WITH 'CRUD_DEMO_')
  OR (node:Course AND node.course_id STARTS WITH 'CRUD_DEMO_')
  OR (node:Enrollment AND node.enroll_id STARTS WITH 'CRUD_DEMO_')
RETURN count(node) AS RemainingDemoNodes;
