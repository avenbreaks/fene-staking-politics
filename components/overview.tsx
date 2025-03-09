"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

// Generate more realistic data points
const data = Array.from({ length: 60 }, (_, i) => ({
  name: new Date(2024, 0, i + 1).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }),
  value: Math.floor(Math.random() * 60) + 20,
}))

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} interval={14} />
        <Bar dataKey="value" fill="#FF7E67" radius={0} barSize={4} />
      </BarChart>
    </ResponsiveContainer>
  )
}

