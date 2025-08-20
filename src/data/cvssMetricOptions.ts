export const exploitabilityMetrics = {
  AV: {
    name: "Attack Vector (AV)",
    description:
      "This metric reflects the context by which vulnerability exploitation is possible.",
    options: [
      {
        label: "Network (N)",
        value: "N",
        description:
          "The vulnerable component is bound to the network stack and the attacker's path is through OSI layer 3 (the network layer).",
      },
      {
        label: "Adjacent (A)",
        value: "A",
        description:
          "The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology.",
      },
      {
        label: "Local (L)",
        value: "L",
        description:
          "The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities.",
      },
      {
        label: "Physical (P)",
        value: "P",
        description:
          "The attack requires the attacker to physically touch or manipulate the vulnerable component.",
      },
    ],
  },
  AC: {
    name: "Attack Complexity (AC)",
    description:
      "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
    options: [
      {
        label: "Low (L)",
        value: "L",
        description:
          "Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.",
      },
      {
        label: "High (H)",
        value: "H",
        description:
          "A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will.",
      },
    ],
  },
  AT: {
    name: "Attack Requirements (AT)",
    description:
      "This metric captures the prerequisite conditions of the vulnerable component that are required to execute an attack.",
    options: [
      {
        label: "None (N)",
        value: "N",
        description:
          "The vulnerable component is in a state that is ready to be attacked.",
      },
      {
        label: "Present (P)",
        value: "P",
        description:
          "The attacker must first attain a specific, standard configuration of the vulnerable component before an attack can be attempted.",
      },
    ],
  },
  PR: {
    name: "Privileges Required (PR)",
    description:
      "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
    options: [
      {
        label: "None (N)",
        value: "N",
        description:
          "The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user.",
      },
      {
        label: "High (H)",
        value: "H",
        description:
          "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component.",
      },
    ],
  },
  UI: {
    name: "User Interaction (UI)",
    description:
      "This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
    options: [
      {
        label: "None (N)",
        value: "N",
        description:
          "The vulnerable system can be exploited without interaction from any human user.",
      },
      {
        label: "Passive (P)",
        value: "P",
        description:
          "Successful exploitation of this vulnerability requires limited interaction by the user associated with the vulnerable component.",
      },
      {
        label: "Active (A)",
        value: "A",
        description:
          "Successful exploitation of this vulnerability requires specific, conscious user interaction with the vulnerable component.",
      },
    ],
  },
};

export const vulnerableSystemImpactMetrics = {
  VC: {
    name: "Confidentiality (VC)",
    description: "Impact to the confidentiality of the vulnerable system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of confidentiality, resulting in all information within the vulnerable component being divulged to the attacker.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no loss of confidentiality within the vulnerable component.",
      },
    ],
  },
  VI: {
    name: "Integrity (VI)",
    description: "Impact to the integrity of the vulnerable system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of integrity, or a complete loss of protection. The attacker is able to modify any/all files protected by the vulnerable component.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no loss of integrity within the vulnerable component.",
      },
    ],
  },
  VA: {
    name: "Availability (VA)",
    description: "Impact to the availability of the vulnerable system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the vulnerable component.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "Performance is reduced or there are interruptions in resource availability.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no impact to availability within the vulnerable component.",
      },
    ],
  },
};

export const subsequentSystemImpactMetrics = {
  SC: {
    name: "Confidentiality (SC)",
    description: "Impact to the confidentiality of the subsequent system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of confidentiality, resulting in all information within the subsequent system being divulged to the attacker.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no loss of confidentiality within the subsequent system.",
      },
    ],
  },
  SI: {
    name: "Integrity (SI)",
    description: "Impact to the integrity of the subsequent system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of integrity, or a complete loss of protection. The attacker is able to modify any/all files protected by the subsequent system.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no loss of integrity within the subsequent system.",
      },
    ],
  },
  SA: {
    name: "Availability (SA)",
    description: "Impact to the availability of the subsequent system.",
    options: [
      {
        label: "High (H)",
        value: "H",
        description:
          "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the subsequent system.",
      },
      {
        label: "Low (L)",
        value: "L",
        description:
          "Performance is reduced or there are interruptions in resource availability.",
      },
      {
        label: "None (N)",
        value: "N",
        description:
          "There is no impact to availability within the subsequent system.",
      },
    ],
  },
};
