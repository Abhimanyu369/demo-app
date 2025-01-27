import * as Yup from "yup";

export const INITIAL_VALUES = {
  processStep: "",
  failureModes: [
    {
      potentialFailureMode: "",
      potentialFailureEffects: "",
      sev: 1,
      potentialCauses: "",
      occ: 1,
      currentControls: "",
      det: 1,
      rpn: 0,
      actionsRecommended: "",
      sevRec: 1,
      occRec: 1,
      detRec: 1,
      rpnRec: 0,
    },
  ],
};

export const VALIDATION_SCHEMA = Yup.object({
  processStep: Yup.string().required("Process Step is required"),
  failureModes: Yup.array().of(
    Yup.object().shape({
      potentialFailureMode: Yup.string().required("This field is required"),
      potentialFailureEffects: Yup.string().required("This field is required"),
      sev: Yup.number().required("Required").min(1).max(10),
      potentialCauses: Yup.string().required("This field is required"),
      occ: Yup.number().required("Required").min(1).max(10),
      currentControls: Yup.string().required("This field is required"),
      det: Yup.number().required("Required").min(1).max(10),
      rpn: Yup.number(),
      actionsRecommended: Yup.string().required("This field is required"),
      sevRec: Yup.number().required("Required").min(1).max(10),
      occRec: Yup.number().required("Required").min(1).max(10),
      detRec: Yup.number().required("Required").min(1).max(10),
      rpnRec: Yup.number(),
    })
  ),
});

export const CSV_HEADERS = [
  "Process / Process Step",
  "Potential Failure Mode",
  "Potential Failure Effects",
  "SEV",
  "Potential Causes",
  "OCC",
  "Current Controls",
  "DET",
  "RPN",
  "Actions Recommended",
  "SEV",
  "OCC",
  "DET",
  "RPN",
];
