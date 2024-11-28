"use client";

import { useState, useEffect } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Couleurs des segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Composant du graphique en secteurs
export function PieChartComponent() {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pie-chart-data"); // Remplace par ton endpoint
        const data = await response.json();
        setPieChartData(data);
      } catch (error) {
        console.error("Erreur lors du fetch des données de pie chart:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pie Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
}
