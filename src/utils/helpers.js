import { CSV_HEADERS } from "./constants";

export const handleDownload = (data, message) => {
  if (data.length === 0) {
    message.warning("No data available to download");
    return;
  }

  const rows = data.flatMap((entry) =>
    entry.failureModes.map((mode) => [
      entry.processStep,
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
    ])
  );

  const csvContent = [
    CSV_HEADERS.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fmea_data.csv";
  link.click();
  URL.revokeObjectURL(url);
};
