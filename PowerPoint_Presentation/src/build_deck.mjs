import fs from "fs/promises";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

const root = path.resolve("C:/Users/sawab/OneDrive/Desktop/ADB_GroupProject");
const runtimeRoot = path.join(
  process.env.USERPROFILE ?? "C:/Users/sawab",
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "node",
  "node_modules",
  "@oai",
  "artifact-tool",
  "dist",
  "artifact_tool.mjs",
);

const {
  Presentation,
  PresentationFile,
  row,
  column,
  grid,
  layers,
  panel,
  text,
  image,
  shape,
  rule,
  fill,
  hug,
  fixed,
  wrap,
  fr,
} = await import(pathToFileURL(runtimeRoot).href);

const W = 1920;
const H = 1080;

const outDir = path.join(root, "PowerPoint_Presentation", "output");
const previewDir = path.join(root, "PowerPoint_Presentation", "previews");
const pptxPath = path.join(outDir, "Neo4j_KRG_Graph_Database_Presentation.pptx");

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const colors = {
  bg: "#F7FBFA",
  bg2: "#EEF6F4",
  ink: "#1F2933",
  muted: "#66758A",
  lightText: "#96A2AF",
  teal: "#2E6F73",
  tealLight: "#6FA8AA",
  tealPale: "#D7EBE8",
  gray: "#EEF1F3",
  white: "#FFFFFF",
  sand: "#F8F2E8",
  coralPale: "#FFE4DC",
  lavenderPale: "#EFE8FB",
  skyPale: "#E7F5FF",
};

const nodeColors = {
  City: "#65dfaf",
  Company: "#ffbfb5",
  Course: "#ea8ff6",
  Department: "#80babc",
  Enrollment: "#79f5d6",
  Event: "#b5e6fe",
  EventRegistration: "#56c4ca",
  GovernmentProject: "#f4a4d1",
  Hospital: "#ffacce",
  Ministry: "#9ac098",
  Patient: "#c5aa7b",
  Property: "#ff8d69",
  Student: "#d7c3f4",
  University: "#e4abbe",
};

const figure = (name) => must(path.join(root, "LaTeX_Report", "figures", name));
const aukLogo = must(path.join(root, "LaTeX_Report", "AUK-logo.png"));
const imageCache = new Map();

function must(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required asset: ${filePath}`);
  }
  return filePath;
}

function imagePayload(filePath) {
  if (!imageCache.has(filePath)) {
    const data = readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
    imageCache.set(filePath, {
      dataUrl: `data:${contentType};base64,${data.toString("base64")}`,
      contentType,
    });
  }
  return imageCache.get(filePath);
}

function rasterImage(filePath, options) {
  return image({
    ...imagePayload(filePath),
    ...options,
  });
}

function place(slide, node, left, top, width, height) {
  slide.compose(node, {
    frame: { left, top, width, height },
    baseUnit: 8,
  });
}

function background(slide, accent = colors.tealPale) {
  place(
    slide,
    layers({ width: fill, height: fill }, [
      shape({ width: fill, height: fill, fill: colors.bg }),
      shape({ width: fixed(32), height: fill, fill: accent }),
      shape({ width: fixed(14), height: fill, fill: colors.tealLight }),
    ]),
    0,
    0,
    W,
    H,
  );
}

function addSlideNumber(slide, index) {
  place(
    slide,
    text(String(index).padStart(2, "0"), {
      width: fixed(44),
      height: hug,
      style: { fontSize: 18, color: colors.lightText, bold: true },
    }),
    1810,
    1016,
    80,
    32,
  );
}

function addNodeRibbon(slide, y = 1014) {
  const names = [
    "City",
    "Student",
    "Patient",
    "GovernmentProject",
    "Event",
    "Property",
    "Ministry",
    "University",
    "Company",
  ];
  place(
    slide,
    row(
      { width: hug, height: hug, gap: 14, align: "center" },
      names.map((name) =>
        shape({
          geometry: "ellipse",
          width: fixed(16),
          height: fixed(16),
          fill: nodeColors[name],
        }),
      ),
    ),
    96,
    y,
    520,
    28,
  );
}

function header(slide, kicker, title, subtitle) {
  place(
    slide,
    column({ width: fill, height: hug, gap: 8 }, [
      text(kicker, {
        width: hug,
        height: hug,
        style: {
          fontSize: 22,
          bold: true,
          color: colors.tealLight,
          letterSpacing: 0,
        },
      }),
      text(title, {
        width: fill,
        height: hug,
        style: {
          fontSize: 42,
          bold: true,
          color: colors.ink,
          letterSpacing: 0,
        },
      }),
      subtitle
        ? text(subtitle, {
            width: fill,
            height: hug,
            style: { fontSize: 23, color: colors.muted, letterSpacing: 0 },
          })
        : row({ width: hug, height: fixed(1) }, []),
    ]),
    96,
    58,
    1680,
    165,
  );
  place(
    slide,
    rule({ width: fixed(190), stroke: colors.tealLight, weight: 4 }),
    96,
    215,
    190,
    8,
  );
}

function sectionKicker(slide, textValue, x, y, color = colors.teal) {
  place(
    slide,
    text(textValue, {
      width: hug,
      height: hug,
      style: { fontSize: 21, bold: true, color, letterSpacing: 0 },
    }),
    x,
    y,
    520,
    34,
  );
}

function pill(slide, textValue, x, y, w, fillColor, textColor = colors.ink) {
  place(
    slide,
    panel(
      {
        width: fill,
        height: fill,
        fill: fillColor,
        borderRadius: 22,
        align: "center",
        justify: "center",
        padding: { x: 20, y: 9 },
      },
      text(textValue, {
        width: fixed(Math.max(80, w - 40)),
        height: hug,
        style: { fontSize: 20, bold: true, color: textColor },
      }),
    ),
    x,
    y,
    w,
    52,
  );
}

function bulletText(lines, fontSize = 25) {
  return column(
    { width: fill, height: hug, gap: 18 },
    lines.map(({ dot, text: value, bold = false }) =>
      row({ width: fill, height: hug, gap: 16, align: "start" }, [
        shape({
          geometry: "ellipse",
          width: fixed(15),
          height: fixed(15),
          fill: dot,
        }),
        text(value, {
          width: wrap(820),
          height: hug,
          style: { fontSize, color: colors.ink, bold, letterSpacing: 0 },
        }),
      ]),
    ),
  );
}

function legend(slide, items, y = 982) {
  const labelWidth = (name) => {
    if (name === "GovernmentProject" || name === "EventRegistration") return 210;
    if (name === "University" || name === "Department") return 120;
    if (name === "Company" || name === "Property" || name === "Hospital") return 105;
    return 80;
  };
  const nodes = items.map((name) =>
    row({ width: hug, height: hug, gap: 7, align: "center" }, [
      shape({
        geometry: "ellipse",
        width: fixed(16),
        height: fixed(16),
        fill: nodeColors[name],
      }),
      text(name, {
        width: fixed(labelWidth(name)),
        height: hug,
        style: { fontSize: 19, bold: true, color: nodeColors[name] },
      }),
    ]),
  );
  place(
    slide,
    row({ width: fill, height: hug, gap: 18, align: "center", justify: "center" }, nodes),
    92,
    y,
    1736,
    42,
  );
}

function imageCard(slide, imgPath, label, x, y, w, h, options = {}) {
  const accent = options.accent ?? colors.tealLight;
  place(
    slide,
    row({ width: fill, height: hug, gap: 10, align: "center" }, [
      shape({
        geometry: "ellipse",
        width: fixed(14),
        height: fixed(14),
        fill: accent,
      }),
      text(label, {
        width: fixed(160),
        height: hug,
        style: { fontSize: 22, bold: true, color: colors.teal },
      }),
    ]),
    x,
    y - 38,
    w,
    32,
  );
  place(
    slide,
    panel(
      {
        width: fill,
        height: fill,
        fill: colors.white,
        borderRadius: 16,
        padding: { x: 16, y: 14 },
        align: "center",
        justify: "center",
      },
      image({
        ...imagePayload(imgPath),
        width: fill,
        height: fill,
        fit: "contain",
        alt: label,
      }),
    ),
    x,
    y,
    w,
    h,
  );
}

function addTaskText(slide, task) {
  place(
    slide,
    row({ width: fill, height: hug, gap: 14, align: "start" }, [
      text("Question", {
        width: fixed(120),
        height: hug,
        style: { fontSize: 20, bold: true, color: colors.teal },
      }),
      text(task.question, {
        width: fixed(1390),
        height: hug,
        style: { fontSize: 23, color: colors.ink },
      }),
    ]),
    96,
    158,
    1660,
    54,
  );
  place(
    slide,
    row({ width: fill, height: hug, gap: 14, align: "start" }, [
      text("Graph", {
        width: fixed(120),
        height: hug,
        style: { fontSize: 20, bold: true, color: colors.teal },
      }),
      text(task.shape, {
        width: fixed(1430),
        height: hug,
        style: {
          fontSize: 20,
          color: colors.ink,
          bold: true,
          fontFace: "Consolas",
        },
      }),
    ]),
    96,
    216,
    1660,
    42,
  );
}

function taskSlide(presentation, index, task) {
  const slide = presentation.slides.add();
  background(slide, task.accent ?? colors.tealPale);
  header(slide, `Visual task ${task.no}`, task.title, null);
  addTaskText(slide, task);

  if (task.images.length === 1) {
    imageCard(slide, task.images[0].path, task.images[0].label, 235, 332, 1450, 555, {
      accent: task.primaryColor,
    });
  } else {
    imageCard(slide, task.images[0].path, task.images[0].label, 94, 332, 835, 555, {
      accent: task.primaryColor,
    });
    imageCard(slide, task.images[1].path, task.images[1].label, 990, 332, 835, 555, {
      accent: task.secondaryColor ?? task.primaryColor,
    });
  }

  place(
    slide,
    text(task.insight, {
      width: wrap(1500),
      height: hug,
      style: { fontSize: 23, color: colors.muted },
    }),
    160,
    910,
    1600,
    40,
  );
  legend(slide, task.legend);
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function tableCell(value, bg, color = colors.ink, bold = false, fontSize = 18, textWidth = 92) {
  return panel(
    {
      width: fill,
      height: fixed(42),
      fill: bg,
      align: "center",
      justify: "center",
      padding: { x: 8, y: 3 },
    },
    text(String(value), {
      width: fixed(textWidth),
      height: hug,
      style: { fontSize, bold, color },
    }),
  );
}

function stressTable() {
  const rows = [
    ["City", "Patients", "Events", "Projects", "Properties", "StressScore"],
    ["Sulaymaniyah", 198, 195, 225, 202, 820],
    ["Halabja", 207, 187, 197, 226, 817],
    ["Duhok", 203, 223, 175, 194, 795],
    ["Zakho", 200, 187, 208, 198, 793],
    ["Erbil", 192, 208, 195, 180, 775],
  ];
  return column(
    { width: fill, height: hug, gap: 0 },
    rows.map((r, rowIndex) =>
      grid(
        {
          width: fill,
          height: fixed(rowIndex === 0 ? 46 : 42),
          columns: [fr(1.45), fr(0.9), fr(0.85), fr(0.95), fr(1.05), fr(1.1)],
          columnGap: 0,
          rowGap: 0,
        },
        r.map((cell, colIndex) =>
          tableCell(
            cell,
            rowIndex === 0 ? colors.tealLight : rowIndex % 2 === 1 ? colors.gray : colors.white,
            rowIndex === 0 ? colors.white : colors.ink,
            rowIndex === 0 || cell === r[0],
            rowIndex === 0 ? 16 : 17,
            colIndex === 0 ? 150 : colIndex === 5 ? 118 : 96,
          ),
        ),
      ),
    ),
  );
}

function nodeMini(name, label, size = 62) {
  return column({ width: hug, height: hug, gap: 6, align: "center" }, [
    shape({
      geometry: "ellipse",
      width: fixed(size),
      height: fixed(size),
      fill: nodeColors[name],
    }),
    text(label ?? name, {
      width: fixed(170),
      height: hug,
      style: { fontSize: 17, bold: true, color: colors.ink },
    }),
  ]);
}

function coverSlide(presentation) {
  const slide = presentation.slides.add();
  place(slide, shape({ width: fill, height: fill, fill: "#FBFDFB" }), 0, 0, W, H);
  place(slide, shape({ width: fixed(34), height: fill, fill: colors.tealPale }), 0, 0, 34, H);
  place(slide, shape({ width: fixed(16), height: fill, fill: colors.tealLight }), 34, 0, 16, H);
  place(slide, rasterImage(aukLogo, { width: fill, height: fill, fit: "contain", alt: "AUK logo" }), 112, 70, 168, 168);

  place(
    slide,
    column({ width: fill, height: hug, gap: 10 }, [
      text("Neo4j Graph Database", {
        width: fixed(1200),
        height: hug,
        style: { fontSize: 73, bold: true, color: colors.ink },
      }),
      text("Implementation for KRG Open Data", {
        width: fixed(1320),
        height: hug,
        style: { fontSize: 73, bold: true, color: colors.ink },
      }),
      rule({ width: fixed(410), stroke: colors.tealLight, weight: 5 }),
      text("Graph modeling, data loading, relationship design, and visual Cypher analysis", {
        width: fixed(1200),
        height: hug,
        style: { fontSize: 29, color: colors.muted },
      }),
    ]),
    330,
    118,
    1280,
    260,
  );

  place(
    slide,
    column({ width: fill, height: hug, gap: 18 }, [
      text("Team Members", {
        width: fixed(360),
        height: hug,
        style: { fontSize: 25, bold: true, color: colors.teal },
      }),
      text("Sawab Hussein     Mohammed Salah     Asmaa Salih", {
        width: fixed(900),
        height: hug,
        style: { fontSize: 27, color: colors.ink },
      }),
      text("Advanced Database Systems -- 101", {
        width: fixed(900),
        height: hug,
        style: { fontSize: 25, color: colors.muted },
      }),
      text("Instructor: Dr. Shamal AL-Dohuki", {
        width: fixed(900),
        height: hug,
        style: { fontSize: 24, color: colors.ink },
      }),
      text("DBMS: Neo4j     Date: April 2026", {
        width: fixed(900),
        height: hug,
        style: { fontSize: 24, color: colors.ink },
      }),
    ]),
    330,
    520,
    1080,
    260,
  );

  const constellation = [
    ["City", 1520, 520, 94],
    ["Student", 1650, 430, 52],
    ["Patient", 1715, 600, 58],
    ["Event", 1510, 690, 48],
    ["GovernmentProject", 1630, 755, 66],
    ["Property", 1780, 770, 58],
    ["Ministry", 1445, 800, 44],
    ["University", 1730, 505, 46],
    ["Company", 1575, 865, 38],
  ];
  for (const [name, x, y, size] of constellation) {
    place(
      slide,
      shape({
        geometry: "ellipse",
        width: fixed(size),
        height: fixed(size),
        fill: nodeColors[name],
      }),
      x,
      y,
      size,
      size,
    );
  }
  place(
    slide,
    text("AUK | MSc Artificial Intelligence", {
      width: fixed(460),
      height: hug,
      style: { fontSize: 20, color: colors.lightText, bold: true },
    }),
    112,
    980,
    520,
    34,
  );
  return slide;
}

function agendaSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.skyPale);
  header(slide, "Report flow", "From CSV files to graph insight", "The presentation follows the report: build the graph, show the city hub, then walk through the ten visual tasks.");
  const steps = [
    ["01", "Data and schema", "13 CSV tables become labeled nodes with indexed identifiers.", nodeColors.Company],
    ["02", "City hub", "City is the shared connector across education, health, government, business, events, and property.", nodeColors.City],
    ["03", "Visual tasks", "Cypher paths expose movement, ownership, density, and cross-city pressure.", colors.tealLight],
    ["04", "Analysis landing", "Stress and investment views turn graph neighborhoods into city-level evidence.", nodeColors.Property],
  ];
  place(
    slide,
    row(
      { width: fill, height: hug, gap: 38, align: "stretch" },
      steps.map(([num, title, desc, color]) =>
        column({ width: fixed(370), height: hug, gap: 18 }, [
          shape({ geometry: "ellipse", width: fixed(76), height: fixed(76), fill: color }),
          text(num, {
            width: hug,
            height: hug,
            style: { fontSize: 25, bold: true, color: colors.teal },
          }),
          text(title, {
            width: wrap(360),
            height: hug,
            style: { fontSize: 31, bold: true, color: colors.ink },
          }),
          text(desc, {
            width: wrap(355),
            height: hug,
            style: { fontSize: 22, color: colors.muted },
          }),
        ]),
      ),
    ),
    130,
    358,
    1660,
    430,
  );
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function dataUniverseSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.lavenderPale);
  header(slide, "Dataset scope", "A multi-domain KRG open-data graph", "The graph combines operational tables from public services, education, health, business, real estate, and events.");
  const domains = [
    ["Education", ["University", "Department", "Course", "Student", "Enrollment"]],
    ["Healthcare", ["Hospital", "Patient"]],
    ["Government", ["Ministry", "GovernmentProject"]],
    ["Business + Property", ["Company", "Property"]],
    ["Events", ["Event", "EventRegistration"]],
    ["Geography", ["City"]],
  ];
  place(
    slide,
    grid(
      {
        width: fill,
        height: fill,
        columns: [fr(1), fr(1), fr(1)],
        rows: [fr(1), fr(1)],
        columnGap: 36,
        rowGap: 38,
      },
      domains.map(([domain, nodes]) =>
        column({ width: fill, height: fill, gap: 20 }, [
          text(domain, {
            width: hug,
            height: hug,
            style: { fontSize: 30, bold: true, color: colors.teal },
          }),
          row(
            { width: fill, height: hug, gap: 12, align: "center" },
            nodes.slice(0, 4).map((n) =>
              shape({
                geometry: "ellipse",
                width: fixed(38),
                height: fixed(38),
                fill: nodeColors[n],
              }),
            ),
          ),
          text(nodes.join("  /  "), {
            width: wrap(460),
            height: hug,
            style: { fontSize: 20, color: colors.ink, bold: true },
          }),
        ]),
      ),
    ),
    130,
    330,
    1660,
    520,
  );
  place(
    slide,
    text("Result: 14 node labels, indexed identifiers, and relationship paths that can be queried directly in Neo4j Browser or Bloom.", {
      width: wrap(1460),
      height: hug,
      style: { fontSize: 25, color: colors.muted },
    }),
    176,
    895,
    1500,
    54,
  );
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function graphBuildSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.tealPale);
  header(slide, "Graph construction", "Efficient loading with indexed MERGE patterns", "The loading method keeps entity identity stable while building reusable graph paths around City.");
  place(
    slide,
    bulletText([
      { dot: colors.tealLight, text: "Create indexes first on every identifier field: company_id, student_id, hospital_id, project_id, city name, and more.", bold: true },
      { dot: nodeColors.City, text: "Load nodes with LOAD CSV WITH HEADERS and MERGE so repeated imports update the graph instead of duplicating entities." },
      { dot: nodeColors.EventRegistration, text: "Create relationships in 500-row transactions, which keeps large CSV imports manageable and repeatable." },
      { dot: nodeColors.GovernmentProject, text: "Use City as the geography hub so unrelated domains can be crossed by path queries instead of manual joins." },
    ], 25),
    124,
    330,
    900,
    420,
  );

  place(
    slide,
    column({ width: fill, height: hug, gap: 18, align: "center" }, [
      row({ width: hug, height: hug, gap: 24, align: "center" }, [
        nodeMini("Company", "Company"),
        nodeMini("University", "University"),
        nodeMini("Hospital", "Hospital"),
      ]),
      row({ width: hug, height: hug, gap: 20, align: "center" }, [
        nodeMini("GovernmentProject", "Project"),
        nodeMini("City", "City", 112),
        nodeMini("Event", "Event"),
      ]),
      row({ width: hug, height: hug, gap: 24, align: "center" }, [
        nodeMini("Student", "Student"),
        nodeMini("Patient", "Patient"),
        nodeMini("Property", "Property"),
      ]),
    ]),
    1080,
    315,
    690,
    520,
  );
  pill(slide, "CREATE INDEX", 124, 806, 220, colors.skyPale, colors.teal);
  pill(slide, "LOAD CSV", 370, 806, 190, colors.coralPale, colors.ink);
  pill(slide, "MERGE", 586, 806, 150, colors.lavenderPale, colors.ink);
  pill(slide, "IN TRANSACTIONS", 762, 806, 260, colors.sand, colors.ink);
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function cityHubSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.sand);
  header(slide, "Model spine", "City turns separate CSVs into one analyzable graph", "This is the key modeling move: City is not just an attribute, it becomes a reusable node shared by sectors.");

  const centerX = 880;
  const centerY = 505;
  const orbit = [
    ["University", 450, 310],
    ["Student", 445, 640],
    ["Hospital", 720, 225],
    ["Patient", 710, 775],
    ["Ministry", 1135, 225],
    ["GovernmentProject", 1215, 390],
    ["Event", 1215, 640],
    ["Property", 1128, 800],
    ["Company", 1390, 545],
  ];

  for (const [name, x, y] of orbit) {
    place(
      slide,
      nodeMini(name, name === "GovernmentProject" ? "Gov. Project" : name, name === "GovernmentProject" ? 74 : 68),
      x,
      y,
      170,
      110,
    );
  }
  place(slide, nodeMini("City", "City hub", 142), centerX, centerY, 200, 180);
  place(
    slide,
    text("Path-first analysis becomes natural: Neo4j can traverse from a city into education, healthcare, projects, events, or property without rebuilding tabular joins.", {
      width: wrap(560),
      height: hug,
      style: { fontSize: 26, color: colors.ink, bold: true },
    }),
    112,
    820,
    640,
    120,
  );
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function taskNineSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.coralPale);
  header(slide, "Visual task 9", "Task 9: City Stress Index Graph", null);
  addTaskText(slide, {
    question: "Which cities carry the highest multi-sector load across healthcare, events, government projects, and real estate?",
    shape: "Patient / Event / GovernmentProject / Property  ->  City, ranked by combined StressScore",
  });
  imageCard(slide, figure("task09_city_stress.png"), "Graph result", 112, 345, 805, 510, {
    accent: nodeColors.City,
  });
  place(
    slide,
    row({ width: fill, height: hug, gap: 10, align: "center", justify: "center" }, [
      shape({ geometry: "ellipse", width: fixed(14), height: fixed(14), fill: colors.tealLight }),
      text("CSV result table", {
        width: hug,
        height: hug,
        style: { fontSize: 22, bold: true, color: colors.teal },
      }),
    ]),
    1030,
    307,
    760,
    32,
  );
  place(slide, stressTable(), 1012, 392, 795, 300);
  place(
    slide,
    text("Sulaymaniyah ranks highest in the extracted result, with Halabja close behind; the graph shows why by surrounding each city with sector-specific load nodes.", {
      width: wrap(690),
      height: hug,
      style: { fontSize: 24, color: colors.ink },
    }),
    1040,
    740,
    735,
    110,
  );
  legend(slide, ["City", "Patient", "Event", "GovernmentProject", "Property"]);
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

function findingsSlide(presentation, index) {
  const slide = presentation.slides.add();
  background(slide, colors.tealPale);
  header(slide, "Closing insight", "The graph makes cross-domain questions practical", "Neo4j's value in this project is the ability to ask path questions across domains that were originally separate CSV tables.");
  place(
    slide,
    column({ width: fill, height: hug, gap: 34 }, [
      row({ width: fill, height: hug, gap: 24, align: "center" }, [
        shape({ geometry: "ellipse", width: fixed(74), height: fixed(74), fill: nodeColors.City }),
        text("City is the analytical hub, not just a text field.", {
          width: wrap(900),
          height: hug,
          style: { fontSize: 36, bold: true, color: colors.ink },
        }),
      ]),
      row({ width: fill, height: hug, gap: 24, align: "center" }, [
        shape({ geometry: "ellipse", width: fixed(74), height: fixed(74), fill: nodeColors.GovernmentProject }),
        text("Relationship paths expose ownership, movement, referrals, concentration, and pressure.", {
          width: wrap(1100),
          height: hug,
          style: { fontSize: 31, color: colors.ink },
        }),
      ]),
      row({ width: fill, height: hug, gap: 24, align: "center" }, [
        shape({ geometry: "ellipse", width: fixed(74), height: fixed(74), fill: nodeColors.Property }),
        text("The final stress and investment views turn graph neighborhoods into decision-ready city evidence.", {
          width: wrap(1130),
          height: hug,
          style: { fontSize: 31, color: colors.ink },
        }),
      ]),
    ]),
    190,
    335,
    1450,
    390,
  );
  place(
    slide,
    text("ADB Group Project | Advanced Database Systems | American University of Kurdistan", {
      width: hug,
      height: hug,
      style: { fontSize: 22, color: colors.lightText, bold: true },
    }),
    190,
    900,
    980,
    36,
  );
  addNodeRibbon(slide);
  addSlideNumber(slide, index);
  return slide;
}

const tasks = [
  {
    no: 1,
    title: "Task 1: City as a Central Multi-Sector Hub",
    subtitle: "Introductory graph showing City as the shared integration point.",
    question: "Which city acts as the strongest shared hub across education, healthcare, business, events, and real estate?",
    shape: "University / Hospital / Company / Event / Property  ->  City",
    images: [
      { path: figure("task01_city_hub.png"), label: "LIMIT 30" },
      { path: figure("task01_city_hub_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["City", "University", "Hospital", "Company", "Event", "Property"],
    insight: "The same City node lets multiple sectors cluster around a shared geography instead of staying as isolated CSV fields.",
    primaryColor: nodeColors.City,
    secondaryColor: nodeColors.Property,
    accent: colors.tealPale,
  },
  {
    no: 2,
    title: "Task 2: Patient and Hospital Movement",
    subtitle: "Home city and hospital city are separated so treatment movement becomes visible.",
    question: "How do patients move from their home city to the hospital system, and are they treated locally or outside their city?",
    shape: "Patient -> HomeCity;  Patient -> Hospital -> HospitalCity",
    images: [
      { path: figure("task02_patient_hospital.png"), label: "LIMIT 30" },
      { path: figure("task02_patient_hospital_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["Patient", "City", "Hospital"],
    insight: "The graph creates a visual distinction between local treatment and cross-city treatment patterns.",
    primaryColor: nodeColors.Patient,
    secondaryColor: nodeColors.Hospital,
    accent: colors.skyPale,
  },
  {
    no: 3,
    title: "Task 3: Government Project Network",
    subtitle: "Projects connect administrative control to physical city distribution.",
    question: "Which ministries control public projects, and how are those projects distributed across cities?",
    shape: "Ministry <- GovernmentProject -> City",
    images: [
      { path: figure("task03_government_projects.png"), label: "LIMIT 30" },
      { path: figure("task03_government_projects_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["GovernmentProject", "Ministry", "City"],
    insight: "GovernmentProject nodes sit between ministries and cities, making public-service networks visible.",
    primaryColor: nodeColors.GovernmentProject,
    secondaryColor: nodeColors.Ministry,
    accent: colors.lavenderPale,
  },
  {
    no: 4,
    title: "Task 4: Cross-City Student Mobility",
    subtitle: "Student nodes become bridges between home cities and university cities.",
    question: "Which students leave their home city for university, and which cities are sending or receiving students?",
    shape: "Student -> HomeCity;  Student -> University -> UniversityCity",
    images: [{ path: figure("task04_student_mobility.png"), label: "LIMIT 1000" }],
    legend: ["Student", "City", "University"],
    insight: "The graph reveals educational migration by showing city-to-university movement as traversable paths.",
    primaryColor: nodeColors.Student,
    accent: colors.sand,
  },
  {
    no: 5,
    title: "Task 5: Full Academic Path for Students",
    subtitle: "A complete education chain from students to locations.",
    question: "How does each student connect into the full academic structure of courses, departments, universities, and locations?",
    shape: "Student -> Course -> Department -> University -> City",
    images: [
      { path: figure("task05_academic_path.png"), label: "LIMIT 30" },
      { path: figure("task05_academic_path_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["Student", "Course", "Department", "University", "City"],
    insight: "Layered academic paths make the institutional hierarchy inspectable from any student node.",
    primaryColor: nodeColors.Course,
    secondaryColor: nodeColors.University,
    accent: colors.lavenderPale,
  },
  {
    no: 6,
    title: "Task 6: Event Registrations and Their Cities",
    subtitle: "Registration activity is tied to events and then to city geography.",
    question: "How do registrations connect to events, and how are events distributed across cities?",
    shape: "EventRegistration -> Event -> City",
    images: [
      { path: figure("task06_event_registrations.png"), label: "LIMIT 30" },
      { path: figure("task06_event_registrations_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["EventRegistration", "Event", "City"],
    insight: "Dense registration clusters show where cultural and public event activity concentrates.",
    primaryColor: nodeColors.EventRegistration,
    secondaryColor: nodeColors.Event,
    accent: colors.skyPale,
  },
  {
    no: 7,
    title: "Task 7: Cross-City Healthcare Referral Network",
    subtitle: "The healthcare graph focuses on patients treated outside their home city.",
    question: "Which cities depend on hospitals in other cities, and where is cross-city healthcare movement strongest?",
    shape: "Patient -> HomeCity;  Patient -> Hospital -> HospitalCity",
    images: [
      { path: figure("task07_healthcare_referral.png"), label: "LIMIT 30" },
      { path: figure("task07_healthcare_referral_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["Patient", "City", "Hospital"],
    insight: "The same relationship structure as Task 2 becomes analytical once cross-city referrals are emphasized.",
    primaryColor: nodeColors.Patient,
    secondaryColor: nodeColors.Hospital,
    accent: colors.coralPale,
  },
  {
    no: 8,
    title: "Task 8: Ministry Cross-City Project Control",
    subtitle: "Administrative centralization appears when ministry city differs from project city.",
    question: "Is public project management local, or are some cities controlled administratively from other cities?",
    shape: "Ministry -> MinistryCity;  Project -> Ministry;  Project -> ProjectCity",
    images: [
      { path: figure("task08_ministry_control.png"), label: "LIMIT 30" },
      { path: figure("task08_ministry_control_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["Ministry", "City", "GovernmentProject"],
    insight: "Ministries become control hubs when they manage projects outside their own city.",
    primaryColor: nodeColors.Ministry,
    secondaryColor: nodeColors.GovernmentProject,
    accent: colors.sand,
  },
  {
    no: 10,
    title: "Task 10: Public Investment and Property Market Pressure",
    subtitle: "Investment and real estate are connected through the shared city hub.",
    question: "Which cities show both large public investment and high property prices, suggesting economic pressure or development concentration?",
    shape: "Ministry -> GovernmentProject -> City <- Property",
    images: [
      { path: figure("task10_public_investment.png"), label: "LIMIT 30" },
      { path: figure("task10_public_investment_1000.png"), label: "LIMIT 1000" },
    ],
    legend: ["Ministry", "GovernmentProject", "City", "Property"],
    insight: "City nodes bridge large public budgets and expensive properties, making development pressure easier to compare.",
    primaryColor: nodeColors.Property,
    secondaryColor: nodeColors.GovernmentProject,
    accent: colors.tealPale,
  },
];

const presentation = Presentation.create({
  slideSize: { width: W, height: H },
});

coverSlide(presentation);
agendaSlide(presentation, 2);
dataUniverseSlide(presentation, 3);
graphBuildSlide(presentation, 4);
cityHubSlide(presentation, 5);

let slideIndex = 6;
for (const task of tasks.slice(0, 8)) {
  taskSlide(presentation, slideIndex, task);
  slideIndex += 1;
}
taskNineSlide(presentation, slideIndex);
slideIndex += 1;
taskSlide(presentation, slideIndex, tasks[8]);
slideIndex += 1;
findingsSlide(presentation, slideIndex);

const pptxBlob = await PresentationFile.exportPptx(presentation);
await pptxBlob.save(pptxPath);

async function saveBlob(blob, filePath) {
  await fs.writeFile(filePath, Buffer.from(await blob.arrayBuffer()));
}

for (let i = 0; i < presentation.slides.count; i += 1) {
  const slide = presentation.slides.getItem(i);
  const png = await slide.export({ format: "png" });
  await saveBlob(png, path.join(previewDir, `native_slide_${String(i + 1).padStart(2, "0")}.png`));
}

const pptxBytes = await fs.readFile(pptxPath);
const imported = await PresentationFile.importPptx(pptxBytes);
for (let i = 0; i < imported.slides.count; i += 1) {
  const slide = imported.slides.getItem(i);
  const png = await slide.export({ format: "png" });
  await saveBlob(png, path.join(previewDir, `pptx_roundtrip_slide_${String(i + 1).padStart(2, "0")}.png`));
}

console.log(JSON.stringify({
  pptxPath,
  slideCount: presentation.slides.count,
  nativePreviewDir: previewDir,
  roundtripPreviewDir: previewDir,
}, null, 2));
