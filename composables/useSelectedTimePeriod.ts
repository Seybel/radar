import {
  startOfYear,
  endOfYear,
  sub,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

import type { IPeriod } from "~/utils/interfaces/Transaction";

export const useSelectedTimePeriod = (period: Ref<string>) => {
  const current: ComputedRef<IPeriod> = computed(() => {
    switch (period.value) {
      case "All Time":
        return {
          from: "ALL_TIME",
          to: "ALL_TIME",
        };
      case "Yearly":
        return {
          from: startOfYear(new Date()),
          to: endOfYear(new Date()),
        };
      case "Monthly":
        return {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        };
      case "Weekly":
        return {
          from: startOfWeek(new Date()),
          to: endOfWeek(new Date()),
        };
      case "Daily":
        return {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        };
      default:
        return {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        };
    }
  });

  const previous: ComputedRef<IPeriod> = computed(() => {
    switch (period.value) {
      case "All Time":
        return {
          from: "ALL_TIME",
          to: "ALL_TIME",
        };
      case "Yearly":
        return {
          from: startOfYear(sub(new Date(), { years: 1 })),
          to: endOfYear(sub(new Date(), { years: 1 })),
        };
      case "Monthly":
        return {
          from: startOfMonth(sub(new Date(), { months: 1 })),
          to: endOfMonth(sub(new Date(), { months: 1 })),
        };
      case "Weekly":
        return {
          from: startOfWeek(sub(new Date(), { weeks: 1 })),
          to: endOfWeek(sub(new Date(), { weeks: 1 })),
        };
      case "Daily":
        return {
          from: startOfDay(sub(new Date(), { days: 1 })),
          to: endOfDay(sub(new Date(), { days: 1 })),
        };
      default:
        return {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        };
    }
  });

  return { current, previous };
};
