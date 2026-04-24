# CSV Tables Summary

This table provides a descriptive overview of the structure of all CSV files found in the `csv_tables_1000` directory.

| Table Name | Number of Records | Number of Features | Feature Names |
| :--- | :--- | :--- | :--- |
| companies.csv | 1,000 | 8 | `company_id`, `company_name`, `city`, `sector`, `founded`, `employees`, `annual_revenue_usd`, `ceo` |
| courses.csv | 1,000 | 7 | `course_id`, `course_name`, `credits`, `department`, `professor`, `max_cap`, `mode` |
| departments.csv | 1,000 | 6 | `dept_id`, `department_name`, `university`, `head_professor`, `students`, `budget_usd` |
| enrollments_1000.csv | 1,000 | 7 | `enroll_id`, `student_id`, `course_id`, `semester`, `status`, `grade`, `enrolled_date` |
| events.csv | 1,000 | 9 | `event_id`, `event_name`, `type`, `city`, `venue`, `date`, `tickets`, `price_usd`, `organiser` |
| event_registrations_1000.csv | 1,000 | 7 | `registration_id`, `event_id`, `registrant_name`, `city`, `ticket_type`, `paid_usd`, `registration_date` |
| government_projects.csv | 1,000 | 9 | `project_id`, `project_name`, `ministry`, `city`, `budget_usd`, `start_date`, `end_date`, `status`, `lead_official` |
| hospitals.csv | 1,000 | 7 | `hospital_id`, `name`, `city`, `type`, `beds`, `specialities`, `director` |
| ministries.csv | 1,000 | 7 | `ministry_id`, `ministry_name`, `city`, `minister`, `employees`, `annual_budget_usd`, `website` |
| patients_1000.csv | 1,000 | 9 | `patient_id`, `full_name`, `age`, `city`, `hospital`, `diagnosis`, `admission`, `status`, `doctor` |
| properties.csv | 1,000 | 9 | `property_id`, `type`, `city`, `district`, `area_m2`, `bedrooms`, `listed_price_usd`, `status`, `listed_date` |
| students.csv | 1,000 | 9 | `student_id`, `full_name`, `age`, `city`, `university`, `major`, `gpa`, `enroll_year`, `phone` |
| universities.csv | 1,000 | 7 | `university_id`, `name`, `city`, `founded`, `students`, `departments`, `contact_email` |

## Overall Structure Summary
- **Total Tables**: 13
- **Uniformity**: All tables consistently contain 1,000 records.
- **Feature Range**: The number of features across tables ranges from 6 to 9.
