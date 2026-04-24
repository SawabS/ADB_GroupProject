# 🗄️ Advanced Database Systems — Group Project

> **Neo4j Graph Database Implementation on Kurdistan Region Open Data**

---

## 📌 Project Overview

This project is a graduate-level group assignment that demonstrates the design, implementation, and querying of a **NoSQL Graph Database** using **Neo4j**, built on top of a rich, multi-domain dataset representing the **Kurdistan Region of Iraq (KRG)**.

The project covers the full pipeline:
- 📦 Dataset design and generation (13 interrelated CSV tables, 1,000 records each)
- 🧱 Node and relationship creation in Neo4j using Cypher
- 🔍 Complex querying, data fetching, and analytical insights
- 📊 Graph visualization and relationship traversal

---

## 🏛️ Academic Information

| Field | Details |
|---|---|
| **Program** | Master of Science in Artificial Intelligence |
| **Institution** | [The American University of Kurdistan — Duhok](https://www.auk.edu.krd/) |
| **Course** | Advanced Database Systems — 101 |
| **Instructor** | [Dr. Shamal AL-Dohuki](https://shamal-dohuki.github.io/) |
| **Academic Year** | 2025 – 2026 |

---

## 👨‍💻 Team Members

| # | Name |
|---|---|
| 1 | Sawab Hussein |
| 2 | Mohammed Salah |
| 3 | Asmaa Salih |

---

## 🗂️ Repository Structure

```
ADB_GroupProject/
│
├── csv_tables_1000/          # 13 CSV datasets (1,000 records each)
│   ├── companies.csv
│   ├── courses.csv
│   ├── students.csv
│   ├── universities.csv
│   ├── departments.csv
│   ├── enrollments_1000.csv
│   ├── hospitals.csv
│   ├── patients_1000.csv
│   ├── properties.csv
│   ├── ministries.csv
│   ├── government_projects.csv
│   ├── events.csv
│   └── event_registrations_1000.csv
│
├── making_nodes.md           # Phase 2: Cypher scripts to create Neo4j nodes
├── making_relationships.md   # Phase 3: Cypher scripts to create relationships
├── fetching_data.md          # Phase 4: Cypher queries for data retrieval
├── summary.md                # Dataset summary and table overview
├── assignment_instructions.txt  # Original assignment brief
└── README.md                 # This file
```

---

## 🧩 Datasets

The project uses **13 interconnected datasets** representing real-world entities from the Kurdistan Region:

| Domain | Tables |
|---|---|
| 🎓 **Education** | Universities, Departments, Courses, Students, Enrollments |
| 🏥 **Healthcare** | Hospitals, Patients |
| 🏛️ **Government** | Ministries, Government Projects |
| 🏢 **Business** | Companies, Properties |
| 🎉 **Events** | Events, Event Registrations |

Each table contains **1,000 records** with meaningful cross-domain references, enabling rich graph relationships.

---

## ⚙️ Technology Stack

- **Database:** [Neo4j](https://neo4j.com/) — Graph Database
- **Query Language:** Cypher (Neo4j's declarative graph query language)
- **Data Format:** CSV (imported via `LOAD CSV`)
- **Visualization:** Neo4j Browser / Bloom

---

## 🚀 Getting Started

### Prerequisites
- Neo4j Desktop or Neo4j AuraDB (free tier)
- Clone this repository

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SawabS/ADB_GroupProject.git
   cd ADB_GroupProject
   ```

2. **Load the CSV files** into Neo4j's import directory or use a remote URL.

3. **Create Nodes** — Run the Cypher scripts in [`making_nodes.md`](./making_nodes.md)

4. **Create Relationships** — Run the scripts in [`making_relationships.md`](./making_relationships.md)

5. **Query the Data** — Explore the queries in [`fetching_data.md`](./fetching_data.md)

---

## 📜 License

This project is submitted as academic coursework. All datasets are synthetically generated for educational purposes.

---

<p align="center">
  Made with ❤️ by the ADB Group · MSc AI · American University of Kurdistan
</p>
