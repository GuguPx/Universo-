"use client";

import { useEffect, useState } from "react";

const MET_DATE = new Date(2026, 6, 24);
const DAY = 24 * 60 * 60 * 1000;

function calculateDays() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.floor((today.getTime() - MET_DATE.getTime()) / DAY));
}

/** Dias completos no calendário local desde 24/07/2026. */
export function useDaysSince() {
  const [days, setDays] = useState(calculateDays);

  useEffect(() => {
    const update = () => setDays(calculateDays());
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return days;
}
