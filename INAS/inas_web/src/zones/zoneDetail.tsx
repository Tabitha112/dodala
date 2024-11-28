import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { apiBaseUrl } from "@/utils/apibaseurl";

const ZoneDetails = () => {
  const { id } = useParams(); // Récupérer l'ID à partir des paramètres de l'URL
  const navigate = useNavigate();
  const [zone, setZone] = useState(null); // État pour stocker les détails de la zone

  // Récupérer les détails de la zone en fonction de l'ID
  useEffect(() => {
    const fetchZoneDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/zones/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch zone details.");
        }
        const data = await response.json();
        setZone(data);
      } catch (error) {
        toast.error("Failed to fetch zone details.");
      }
    };

    fetchZoneDetails();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById("printable-content").innerHTML; // Récupère le contenu à imprimer
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Impression Détails de la Zone</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            .header {
              font-weight: bold;
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Détails de la Zone</h1>
            ${printContents}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  if (!zone) {
    return <p>Loading...</p>; // Vous pouvez remplacer cela par un composant de chargement personnalisé si nécessaire
  }

  return (
    <main className="">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Détails de la Zone
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Table id="printable-content">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nom</TableCell>
                  <TableCell>{zone.nom}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Superficie (m²)</TableCell>
                  <TableCell>{zone.superficie}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Distance de la Mer (km)</TableCell>
                  <TableCell>{zone.distance_mer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Droit de Pêche (€/jour)</TableCell>
                  <TableCell>{zone.droit_peche}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prix/m² (€)</TableCell>
                  <TableCell>{zone.prix_par_m2}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Bouton pour imprimer les détails de la zone */}
            <div className="flex justify-end mt-4">
              <Button onClick={handlePrint}>Imprimer Détails de la Zone</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ZoneDetails;
