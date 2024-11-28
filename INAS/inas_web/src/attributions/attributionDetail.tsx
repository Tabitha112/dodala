import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { apiBaseUrl } from "@/utils/apibaseurl";

const AttributionDetails = () => {
  const { id } = useParams(); // Récupérer l'ID à partir des paramètres de l'URL
  const navigate = useNavigate();
  const [attribution, setAttribution] = useState(null);
  const [groupement, setGroupement] = useState(null);
  const [zone, setZone] = useState(null); // État pour stocker le nom de la zone

  // Récupérer les détails de l'attribution en fonction de l'ID
  useEffect(() => {
    const fetchAttributionDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/attributions/${id}`);
        const data = await response.json();
        console.log(data);
        setAttribution(data);

        // Après avoir récupéré les détails de l'attribution, obtenir les informations du groupement
        if (data.id_groupement) {
          const groupementResponse = await fetch(`${apiBaseUrl}/api/groupements/${data.id_groupement}`);
          const groupementData = await groupementResponse.json();
          setGroupement(groupementData.nom); // Stocker le nom du groupement
        }

        // Après avoir récupéré les détails de l'attribution, obtenir les informations de la zone
        if (data.id_zone) {
          const zoneResponse = await fetch(`${apiBaseUrl}/api/zones/${data.id_zone}`);
          const zoneData = await zoneResponse.json();
          setZone(zoneData.nom); // Stocker le nom de la zone
        }
      } catch (error) {
        toast.error("Failed to fetch attribution details.");
      }
    };

    fetchAttributionDetails();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById("printable-content").innerHTML; // Récupère le contenu à imprimer
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Impression Détails de l'Attribution</title>
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
            <h1>Détails de l'Attribution</h1>
            ${printContents}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  if (!attribution) {
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
            Détails de l'Attribution
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Table id="printable-content">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Groupement</TableCell>
                  <TableCell>{groupement ? groupement : "Non attribué"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Zone</TableCell>
                  <TableCell>{zone ? zone : "Non attribuée"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date de Début</TableCell>
                  <TableCell>{new Date(attribution.date_debut).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date de Fin</TableCell>
                  <TableCell>{new Date(attribution.date_fin).toLocaleDateString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Bouton pour imprimer les détails de l'attribution */}
            <div className="flex justify-end mt-4">
              <Button onClick={handlePrint}>Imprimer Détails de l'Attribution</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AttributionDetails;
