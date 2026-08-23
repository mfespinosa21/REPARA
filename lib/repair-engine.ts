export type PlatformRecord = {
  order: string;
  gpsConfirmed: boolean;
  activeDelivery: boolean;
  timestampConfirmed: boolean;
};

const fictionalRecords: PlatformRecord[] = [
  { order: "MX-48291", gpsConfirmed: true, activeDelivery: true, timestampConfirmed: true },
];

export function evaluateFictionalReport(order: string) {
  const record = fictionalRecords.find((item) => item.order === order);
  const verified = Boolean(record?.gpsConfirmed && record.activeDelivery && record.timestampConfirmed);
  return {
    verified,
    matchedFacts: verified ? ["GPS", "hora", "pedido activo"] : [],
    route: verified ? "automatic-repair" : "bounded-human-review",
    deadline: "26 de agosto, 18:00",
    simulated: true,
  } as const;
}
