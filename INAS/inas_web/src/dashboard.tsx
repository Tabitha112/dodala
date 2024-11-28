

import { BarChartComponent } from "./components/BarChart";
import { LineChartComponent } from "./components/LineChart";
import { PieChartComponent } from "./components/PieChart";
import { AreaChartComponent } from "./components/AreaChart";


export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation as, and a card with a call to action. The main content area shows an empty state with a call to action."

export function DashboardPage() {
  return (
    <div>
       {/* Graphique en barres horizontales */}
       <BarChartComponent />

{/* Graphique en lignes multiples */}
<LineChartComponent />

{/* Graphique en secteurs */}
<PieChartComponent />

{/* Graphique en aires */}
<AreaChartComponent />
    </div>
  )
}
