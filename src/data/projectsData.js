export const projectsData = [
  {
    id: "project-past",
    code: "MISSION 01",
    tag: "PAST MILESTONE",
    title: "Looking Back, Moving Forward",
    summary: "Our early work grew from experiments, prototypes and a shared curiosity about flight. These first builds taught us how to design, test and learn as one aerospace team.",
    details: "From initial concepts to first launch attempts, every milestone became part of the foundation for what Unity Space is building today. We established our core propulsion benchmarks and telemetry protocols through intensive student-led iterations.",
    image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1600&q=85",
    subteam: "Engineering & Flight",
    disciplines: ["Propulsion Prototyping", "Flight Test Bed", "Airframe Recovery"],
    status: "Completed",
    timeline: "Foundation Phase",
    specs: {
      thrust: "2.8 kN",
      isp: "210s",
      apogee: "8,500 ft",
      payload: "2.0 kg telemetry package",
      propellant: "Solid composite grain",
      avionics: "Single-channel flight logger"
    }
  },
  {
    id: "project-present",
    code: "MISSION 02",
    tag: "ACTIVE FLIGHT SYSTEM",
    title: "Building Today, Launching Tomorrow",
    summary: "Our current focus is practical aerospace engineering: structures, propulsion research, avionics, testing and documentation.",
    details: "Each iteration is designed to make our systems safer, smarter and more capable while giving students real hands-on engineering experience. We are integrating advanced sensors, autonomous tracking, and payload integration pods.",
    image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=1600&q=85",
    subteam: "Engineering & Flight",
    disciplines: ["Active Avionics", "Structural Optimization", "Ground Control Station"],
    status: "Active Engineering",
    timeline: "Current Mission",
    specs: {
      thrust: "4.5 kN",
      isp: "248s",
      apogee: "15,000 ft",
      payload: "4.5 kg scientific sensors",
      propellant: "Hybrid N2O / HTPB core",
      avionics: "Dual STM32 + LoRa 433MHz telemetry"
    }
  }
];

export const tickerHardwareCards = [
  {
    id: "hw-flight-test",
    url: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=800&q=80",
    label: "FLIGHT TEST PLATFORM",
    code: "FT-01",
    tag: "PROPULSION",
    category: "PROPULSION SYSTEM",
    title: "Static Motor Bench & Test Chamber",
    summary: "High-pressure test cell instrumented with multi-axis load cells to capture instantaneous burn curves and impulse response.",
    specs: { thrust: "3.2 kN peak", isp: "235s", massFlow: "1.4 kg/s", duration: "4.2s" }
  },
  {
    id: "hw-aerospace-prop",
    url: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=800&q=80",
    label: "AEROSPACE PROPULSION",
    code: "AP-04",
    tag: "THRUST",
    category: "MOTOR CHAMBER",
    title: "Aerospace Convergent-Divergent Nozzle",
    summary: "Precision CNC graphite nozzle insert with optimized expansion ratio for Mach 2.8 supersonic exhaust velocities.",
    specs: { throatDia: "24.5 mm", expansionRatio: "8.4", material: "Iso-molded Graphite", tempMax: "2800°C" }
  },
  {
    id: "hw-orbital-telemetry",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    label: "ORBITAL TELEMETRY",
    code: "OT-09",
    tag: "AVIONICS",
    category: "ELECTRONICS",
    title: "Real-time Flight Telemetry Stack",
    summary: "Redundant IMU with 9-axis sensor fusion, GPS lock, barometric altimetry, and continuous 433MHz downlinks.",
    specs: { frequency: "433.92 MHz", packetRate: "20 Hz", power: "3.7V LiPo 1200mAh", sensorFusion: "Extended Kalman Filter" }
  },
  {
    id: "hw-launch-pad",
    url: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80",
    label: "LAUNCH PAD SYSTEM",
    code: "LP-12",
    tag: "GROUND OPS",
    category: "INFRASTRUCTURE",
    title: "Autonomous Rail Launch Tower",
    summary: "Modular 6-meter guide rail with pneumatic hold-down clamps and automated wireless countdown firing circuits.",
    specs: { railLength: "6.0 m", elevation: "75° - 90°", maxRocketWeight: "45 kg", remoteLink: "Encrypted RF 868MHz" }
  },
  {
    id: "hw-structures-cad",
    url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
    label: "AIRFRAME CAD MODEL",
    code: "ST-03",
    tag: "AIRFRAME",
    category: "AEROSTRUCTURES",
    title: "Carbon Composite Airframe & Nosecone",
    summary: "Von Kármán geometric nose cone layups manufactured from aerospace-grade 3K carbon fiber and high-temp epoxy resin.",
    specs: { diameter: "102 mm", wallThickness: "1.8 mm", factorOfSafety: "2.5", massDry: "6.8 kg" }
  },
  {
    id: "hw-mission-control",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    label: "MISSION CONTROL",
    code: "MC-07",
    tag: "TELEMETRY",
    category: "SOFTWARE & COMMS",
    title: "Ground Control Station Dashboard",
    summary: "Live web-based telemetry console plotting real-time trajectory curves, acceleration vectors, and mission states.",
    specs: { latency: "< 50 ms", range: "25 km LoS", antenna: "14 dBi Yagi Directional", backup: "Omni 5.8 dBi" }
  },
  {
    id: "hw-recovery-chute",
    url: "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?auto=format&fit=crop&w=800&q=80",
    label: "DUAL DEPLOY RECOVERY",
    code: "RC-08",
    tag: "RECOVERY",
    category: "SAFETY SYSTEMS",
    title: "Barometric Dual-Deployment Parachute",
    summary: "Two-stage recovery: drogue parachute at apogee followed by 1.8m toroidal main parachute ejection at 400m AGL.",
    specs: { drogueSize: "450 mm", mainChute: "1800 mm Toroidal", descentRate: "5.2 m/s", ejectionCharge: "Black Powder 1.5g" }
  },
  {
    id: "hw-payload-pod",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    label: "SENSOR PAYLOAD POD",
    code: "SP-11",
    tag: "HARDWARE",
    category: "RESEARCH BAY",
    title: "Atmospheric Sampling Experiment Pod",
    summary: "1U CubeSat form-factor scientific bay measuring UV radiation flux, ambient temperature, and particulate densities.",
    specs: { dimensions: "100x100x100 mm", mass: "950 g", sensors: "UV, Pressure, Humidity, VOC", storage: "MicroSD 64GB SPI" }
  }
];

export const row1GalleryImages = tickerHardwareCards.slice(0, 4);
export const row2GalleryImages = tickerHardwareCards.slice(4, 8);
export const projectGalleryImages = tickerHardwareCards;
