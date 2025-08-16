// This file is our new single source of truth for the CVSS v4.0 calculator's UI options.

export const exploitabilityMetrics = {
  AV: {
    name: "Attack Vector (AV)",
    options: [
      { label: "Network (N)", value: "N" },
      { label: "Adjacent (A)", value: "A" },
      { label: "Local (L)", value: "L" },
      { label: "Physical (P)", value: "P" },
    ],
  },
  AC: {
    name: "Attack Complexity (AC)",
    options: [
      { label: "Low (L)", value: "L" },
      { label: "High (H)", value: "H" },
    ],
  },
  AT: {
    name: "Attack Requirements (AT)",
    options: [
      { label: "None (N)", value: "N" },
      { label: "Present (P)", value: "P" },
    ],
  },
  PR: {
    name: "Privileges Required (PR)",
    options: [
      { label: "None (N)", value: "N" },
      { label: "Low (L)", value: "L" },
      { label: "High (H)", value: "H" },
    ],
  },
  UI: {
    name: "User Interaction (UI)",
    options: [
      { label: "None (N)", value: "N" },
      { label: "Passive (P)", value: "P" },
      { label: "Active (A)", value: "A" },
    ],
  },
};

export const vulnerableSystemImpactMetrics = {
  VC: {
    name: "Confidentiality (VC)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
  VI: {
    name: "Integrity (VI)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
  VA: {
    name: "Availability (VA)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
};

export const subsequentSystemImpactMetrics = {
  SC: {
    name: "Confidentiality (SC)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
  SI: {
    name: "Integrity (SI)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
  SA: {
    name: "Availability (SA)",
    options: [
      { label: "High (H)", value: "H" },
      { label: "Low (L)", value: "L" },
      { label: "None (N)", value: "N" },
    ],
  },
};
