# ADB Group Project — Neo4j on KRG Open Data

A graduate-level project implementing a **Neo4j graph database** over a synthetic multi-domain dataset representing the **Kurdistan Region of Iraq (KRG)**.

---

## 🎓 Course Info

| | |
|---|---|
| **Program** | MSc in Artificial Intelligence |
| **Institution** | [American University of Kurdistan — Duhok](https://www.auk.edu.krd/) |
| **Course** | Advanced Database Systems — 101 |
| **Instructor** | [Dr. Shamal AL-Dohuki](https://shamal-dohuki.github.io/) |

**Team:** Sawab Hussein · Mohammed Salah · Asmaa Salih

---

## 📂 Structure

```
ADB_GroupProject/
├── csv_tables_1000/        # 13 CSV datasets (1,000 records each)
├── fetching_data.md        # Cypher queries for data retrieval
├── summary.md              # Dataset overview
├── assignment_instructions.txt
└── README.md
```

---

## 🗃️ Datasets (13 tables × 1,000 records)

| Domain | Tables |
|---|---|
| 🎓 Education | Universities, Departments, Courses, Students, Enrollments |
| 🏥 Healthcare | Hospitals, Patients |
| 🏛️ Government | Ministries, Government Projects |
| 🏢 Business | Companies, Properties |
| 🎉 Events | Events, Event Registrations |

---

## ⚙️ Stack

- **Database:** [Neo4j](https://neo4j.com/) — Graph Database
- **Query Language:** Cypher (`LOAD CSV`)
- **Visualization:** Neo4j Browser / Bloom

---

## 🚀 Getting Started

```bash
git clone https://github.com/SawabS/ADB_GroupProject.git
cd ADB_GroupProject
```

Then load the CSVs into Neo4j and explore queries in [`fetching_data.md`](./fetching_data.md).

---

<p align="center">Made with ❤️ · MSc AI · American University of Kurdistan</p>
