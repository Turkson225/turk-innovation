import { Project, BlogPost, TeamMember, Service } from "./types";

export const companyProfile = {
  name: "Turk Innovation",
  founder: "Ennis Turkson",
  email: "turkinnovation@gmail.com",
  headquarters: "Accra, Ghana",
  description:
    "Turk Innovation is a Ghana-born physical-world technology company building intelligent systems for safety, infrastructure, robotics, and autonomous operations.",
  boilerplate:
    "Turk Innovation is a Ghana-born technology company building practical systems for the physical world. From intelligent safety and energy visibility to robotics and autonomous operations, the company connects embedded hardware, firmware, data, and field workflows. Founded by Ennis Turkson, Turk Innovation is building from Ghana with a global engineering ambition.",
  vision: "Build Africa's trusted physical-world technology company.",
  mission: "Turn real problems into intelligent systems.",
  values: "Proof. Discipline. Usefulness. Courage.",
};

export const projects: Project[] = [
  {
    id: "smartguard",
    title: "SmartGuard",
    description:
      "A two-system intelligent home security and automation prototype combining AI vision, GSM alerts, Firebase monitoring, and remote appliance control.",
    longDescription:
      "SmartGuard connects an AI camera security node and a separate automation node through a shared Wi-Fi and Firebase architecture. Unknown-face detection can trigger image capture, cloud evidence logging, SMS and calls through SIM800L, while the automation node manages alarm and appliance relays.",
    problem:
      "Home security systems often stop at detection, while automation systems operate separately. The result is slow response, limited evidence, and no dependable fallback when internet connectivity is poor.",
    solution:
      "A modular security and automation architecture using ESP32-CAM, HuskyLens, SIM800L GSM, Firebase, Google Apps Script, and an ESP32 relay controller. The design keeps GSM alerting and manual operation available when cloud services are unavailable.",
    impact:
      "Working prototype tested with approximately 1 m HuskyLens face-detection distance and measured relay switching delays between 2 and 5 seconds. Internet-dependent email, Drive, and Firebase features are separated from the GSM and manual fallback paths.",
    status: "ongoing",
    tags: ["AI Security", "ESP32", "Firebase"],
    image: "",
    metrics: [
      { label: "Detection distance observed", value: "≈ 1 m" },
      { label: "Relay response observed", value: "2–5 s" },
      { label: "Offline alert path", value: "GSM SMS + call" },
      { label: "Cloud services", value: "Firebase + Apps Script" },
    ],
  },
  {
    id: "smart-power",
    title: "Smart Power Monitoring",
    description:
      "A real-time electrical monitoring and control system for voltage, current, power, energy, frequency, power factor, and four relay outputs.",
    longDescription:
      "The Smart Power Monitoring system combines an ESP32, PZEM energy measurement, ZMPT101B voltage sensing, ACS712 current sensing, a four-channel relay, buzzer, and 20×4 LCD with a browser dashboard. It is designed to make electrical loads easier to understand and control.",
    problem:
      "Small installations often have no clear view of per-load electrical behaviour, making faults, overloads, and energy waste difficult to identify.",
    solution:
      "A connected measurement and control layer that presents electrical readings locally and on a web dashboard while giving the operator direct relay control and visible system status.",
    impact:
      "Working prototype with confirmed dashboard operation, local LCD feedback, relay control, and live electrical telemetry. Hardware protection and isolation remain important engineering requirements before any commercial deployment.",
    status: "completed",
    tags: ["Energy", "ESP32", "PZEM"],
    image: "",
    metrics: [
      { label: "Controlled outputs", value: "4 channels" },
      { label: "Local display", value: "20×4 LCD" },
      { label: "Energy meter", value: "PZEM-004T" },
      { label: "Architecture", value: "ESP32 + dashboard" },
    ],
  },
  {
    id: "gassafe-iot",
    title: "GasSafe IoT",
    description:
      "Gas-leakage monitoring with automatic shutoff, audible alerts, Firebase reporting, email notifications, and a manual offline fallback.",
    longDescription:
      "GasSafe IoT uses an ESP32-C3, MQ2 gas sensing, relay-controlled shutoff, buzzer, status indicators, Firebase, and Google Apps Script notifications. The device is designed to keep the safety response local while using the cloud for visibility and alert distribution.",
    problem:
      "A gas alert that depends entirely on the internet can fail at the moment a household needs a local safety response.",
    solution:
      "Local detection and automatic shutoff are kept on the device, while cloud synchronization, dashboard updates, and email notifications resume when connectivity returns.",
    impact:
      "Working prototype with automatic response logic, cloud dashboard integration, multi-recipient alert design, and offline manual operation. Calibration, certified gas sensing, enclosure safety, and compliance would be required before productization.",
    status: "completed",
    tags: ["Safety", "IoT", "ESP32-C3"],
    image: "",
    metrics: [
      { label: "Local response", value: "Automatic shutoff" },
      { label: "Connectivity mode", value: "Online + offline" },
      { label: "Cloud layer", value: "Firebase" },
      { label: "Alert layer", value: "Apps Script email" },
    ],
  },
  {
    id: "escort-bot",
    title: "Escort-Bot & Intelligent UGV",
    description:
      "A recovery-support ground vehicle concept combining mecanum mobility, remote control, obstacle awareness, IMU stability, line following, and future waypoint navigation.",
    longDescription:
      "The Escort-Bot project explores how a compact unmanned ground vehicle could support recovery logistics by carrying equipment through operational environments. The architecture brings together motor drivers, mecanum wheels, NRF24L01 control, ultrasonic sensing, HuskyLens, MPU6050, GPS, a load limit switch, and manual/autonomous modes.",
    problem:
      "Recovery tasks can require people to carry equipment through repetitive or difficult routes, creating opportunities to improve safety, consistency, and operator workload.",
    solution:
      "A staged robotics platform: begin with reliable manual drive and obstacle warnings, then add line-following, heading stability, load detection, offload-point recognition, and outdoor waypoint assistance.",
    impact:
      "Active engineering concept and prototype direction grounded in a real recovery workflow. The design still requires field validation across gravel, slopes, weather, load capacity, braking, battery endurance, and emergency-stop behaviour.",
    status: "ongoing",
    tags: ["Robotics", "UGV", "Autonomy"],
    image: "",
    metrics: [
      { label: "Mobility concept", value: "4-wheel mecanum" },
      { label: "Control modes", value: "Manual + autonomous" },
      { label: "Navigation stack", value: "Vision + IMU + GPS" },
      { label: "Safety layer", value: "Obstacle stop + buzzer" },
    ],
  },
  {
    id: "drone-systems",
    title: "Drone Systems & Operations",
    description:
      "Hands-on work across autonomous drone operations, fixed-wing control, recovery workflows, monitoring, troubleshooting, and operational safety.",
    longDescription:
      "This work combines practical drone operations experience with independent fixed-wing and recovery-system prototyping. The focus is not only flight hardware, but also the procedures, monitoring, fault diagnosis, and human-machine coordination required to operate autonomous systems responsibly.",
    problem:
      "Autonomous aerial systems depend on dependable operations, clear monitoring, disciplined recovery workflows, and fast fault response—not hardware alone.",
    solution:
      "A systems approach connecting flight operations, maintenance thinking, telemetry awareness, recovery data, custom controller exploration, and ground-support robotics.",
    impact:
      "Operational experience and ongoing prototype work provide a foundation for future products in drone support, recovery logistics, inspection, and autonomous operations tooling.",
    status: "ongoing",
    tags: ["Drones", "Operations", "Systems"],
    image: "",
    metrics: [
      { label: "Primary perspective", value: "Field operations" },
      { label: "Prototype direction", value: "Fixed-wing + UGV" },
      { label: "Focus", value: "Safety + recovery" },
      { label: "Build mode", value: "Test and iterate" },
    ],
  },
  {
    id: "iot-relay-control",
    title: "IoT Relay Control",
    description:
      "A Firebase-connected four-channel appliance control platform with an ESP32 device, browser dashboard, status feedback, and remote switching.",
    longDescription:
      "The IoT Relay Control system was built as a practical demonstration of hardware-to-cloud control. An ESP32 receives authenticated dashboard commands, switches four relay outputs, and reports state back to a Firebase-backed interface.",
    problem:
      "Appliance control prototypes often lack a clear feedback loop, so users cannot tell whether a command was received or a load actually changed state.",
    solution:
      "A simple, observable architecture with device state, cloud data, browser controls, and a defined relay channel map. The system can be extended with local fallback, protection, scheduling, and role-based access.",
    impact:
      "Working prototype demonstrating real-time remote switching and the foundation for connected control products and educational projects.",
    status: "completed",
    tags: ["IoT", "Control", "Firebase"],
    image: "",
    metrics: [
      { label: "Relay channels", value: "4" },
      { label: "Device", value: "ESP32" },
      { label: "Control surface", value: "Web dashboard" },
      { label: "Cloud database", value: "Firebase RTDB" },
    ],
  },
  {
    id: "embedded-systems-lab",
    title: "Embedded Systems Lab",
    description:
      "Hands-on learning and project-building for students passionate about electronics, embedded systems, robotics, IT, and innovation.",
    longDescription:
      "The Embedded Systems Lab turns practical engineering experience into accessible learning. Students work through circuits, microcontrollers, sensors, communication, dashboards, troubleshooting, and the discipline of documenting a system from idea to working prototype.",
    problem:
      "Many learners can access tutorials but struggle to connect electronics, firmware, cloud services, debugging, and product thinking into one complete project.",
    solution:
      "A build-first learning approach that makes students wire, code, test, explain, and improve real systems with Arduino, ESP32, sensors, motors, and dashboards.",
    impact:
      "An expanding training and community direction designed to create more builders who can contribute to Africa's technology ecosystem.",
    status: "ongoing",
    tags: ["Training", "Arduino", "ESP32"],
    image: "",
    metrics: [
      { label: "Learning mode", value: "Build-first" },
      { label: "Core platforms", value: "Arduino + ESP32" },
      { label: "Topics", value: "IoT + robotics" },
      { label: "Community", value: "Growing" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "smartguard-build-log",
    title: "Building SmartGuard as two dependable systems",
    excerpt:
      "What changes when AI detection, GSM alerts, cloud evidence, and appliance control are designed as separate but coordinated nodes.",
    content:
      "SmartGuard is being developed as a two-node system so a cloud outage does not erase the local safety response. The build is still evolving through hardware tests, timing measurements, connectivity checks, and documentation.",
    author: "Ennis Turkson",
    date: "2026-08-01",
    category: "Build log",
    tags: ["AI Security", "IoT", "Firebase"],
    readTime: "6 min read",
  },
  {
    id: "offline-first-iot",
    title: "Why safety devices should fail locally, not silently",
    excerpt:
      "Lessons from designing GasSafe IoT with automatic local response and cloud synchronization that resumes after connectivity returns.",
    content:
      "Internet connectivity is valuable for visibility, but a safety device should keep its first response close to the sensor. GasSafe IoT uses that principle as a design constraint.",
    author: "Ennis Turkson",
    date: "2026-07-03",
    category: "Engineering",
    tags: ["Safety", "ESP32", "IoT"],
    readTime: "5 min read",
  },
  {
    id: "from-recovery-data-to-ugv",
    title: "From recovery data to an escort robot",
    excerpt:
      "How operational observations can become a grounded robotics problem with measurable safety and logistics goals.",
    content:
      "The Escort-Bot concept starts with a real workflow: how equipment moves, where people spend effort, and what the robot must do before autonomy becomes useful.",
    author: "Ennis Turkson",
    date: "2026-06-11",
    category: "Robotics",
    tags: ["UGV", "Drones", "Autonomy"],
    readTime: "7 min read",
  },
  {
    id: "building-from-ghana",
    title: "Building practical technology from Ghana",
    excerpt:
      "A perspective on turning local constraints into better engineering questions, stronger prototypes, and globally relevant systems.",
    content:
      "Turk Innovation is being built around practical experimentation: start with a real problem, make the system work, measure what happened, and invite others into the build.",
    author: "Ennis Turkson",
    date: "2026-05-20",
    category: "Perspective",
    tags: ["Ghana", "Innovation", "Community"],
    readTime: "4 min read",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Ennis Turkson",
    role: "Founder & Systems Builder",
    bio:
      "Electrical and Electronic Engineering graduate, Flight Operator at Zipline, and hands-on builder working across embedded systems, IoT, robotics, drone operations, electrical maintenance, and real-time monitoring.",
    image: "",
  },
];

export const services: Service[] = [
  {
    title: "Embedded & IoT Systems",
    description:
      "Prototype connected devices, sensor systems, dashboards, alerts, and automation around a real operational need.",
    icon: "cpu",
  },
  {
    title: "Safety & Monitoring",
    description:
      "Design local-first monitoring and control systems for security, gas detection, energy visibility, and remote alerts.",
    icon: "shield",
  },
  {
    title: "Robotics & Autonomous Operations",
    description:
      "Explore ground vehicles, drone support systems, machine vision, navigation, recovery logistics, and field workflows.",
    icon: "bot",
  },
  {
    title: "Technical Training & Collaboration",
    description:
      "Build practical learning experiences and collaborate with students, engineers, and organizations on working prototypes.",
    icon: "graduation-cap",
  },
];

export const focusAreas = [
  {
    title: "Intelligent Safety & Automation",
    description:
      "Local-first systems that detect, alert, and respond when people need them.",
    icon: "shield",
  },
  {
    title: "Energy & Connected Infrastructure",
    description:
      "Measurement and control layers that make electrical systems more visible.",
    icon: "zap",
  },
  {
    title: "Robotics & Autonomous Operations",
    description:
      "Machines and workflows designed for safer, clearer work in the physical world.",
    icon: "bot",
  },
];

export const milestones = [
  {
    year: "01",
    title: "Start with real problems",
    description:
      "Ground each build in a safety, energy, mobility, operations, or learning problem that can be explained clearly.",
  },
  {
    year: "02",
    title: "Prototype the whole system",
    description:
      "Connect the circuit, firmware, interface, data path, and human workflow instead of proving only one component.",
  },
  {
    year: "03",
    title: "Test honestly",
    description:
      "Record observed performance, constraints, failures, and the next engineering question.",
  },
  {
    year: "04",
    title: "Invite the next builder",
    description:
      "Share the build and grow a network of collaborators who can turn strong prototypes into dependable products.",
  },
];
