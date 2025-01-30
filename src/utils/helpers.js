import { CSV_HEADERS } from "./constants";

export const handleDownload = (data, message) => {
  if (data.length === 0) {
    message.warning("No data available to download");
    return;
  }

  const rows = [];

  data.forEach((entry) => {
    entry.failureModes.forEach((mode, index) => {
      const row = [
        index === 0 ? entry.processStep : "", // Only the first row contains processStep
        mode.potentialFailureMode,
        mode.potentialFailureEffects,
        mode.sev,
        mode.potentialCauses,
        mode.occ,
        mode.currentControls,
        mode.det,
        mode.rpn,
        mode.actionsRecommended,
        mode.sevRec,
        mode.occRec,
        mode.detRec,
        mode.rpnRec,
      ];
      rows.push(row);
    });
  });

  const csvContent = [
    CSV_HEADERS.join(","), // Add headers
    ...rows.map((row) => row.join(",")), // Add rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fmea_data.csv";
  link.click();
  URL.revokeObjectURL(url);
};

