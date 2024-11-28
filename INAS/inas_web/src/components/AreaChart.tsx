"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Composant du graphique en aires
export function AreaChartComponent() {
  const [areaChartData, setAreaChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/area-chart-data"); // Remplace par ton endpoint
        const data = await response.json();
        setAreaChartData(data);
      } catch (error) {
        console.error("Erreur lors du fetch des données de area chart:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          width={500}
          height={400}
          data={areaChartData}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="desktop"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorDesktop)"
          />
        </AreaChart>
      </CardContent>
    </Card>
  );
}
