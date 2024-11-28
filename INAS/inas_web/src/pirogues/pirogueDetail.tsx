import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { apiBaseUrl } from "@/utils/apibaseurl";

const PirogueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pirogue, setPirogue] = useState(null);
  const [groupement, setGroupement] = useState(null);

  useEffect(() => {
    const fetchPirogueDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/pirogues/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pirogue details");
        }
        const data = await response.json();
        setPirogue(data);

        // Récupérer les détails du groupement si l'ID existe
        if (data.id_groupement) {
          const groupementResponse = await fetch(`${apiBaseUrl}/api/groupements/${data.id_groupement}`);
          const groupementData = await groupementResponse.json();
          setGroupement(groupementData);
        }
      } catch (error) {
        toast.error("Échec de la récupération des détails de la pirogue.");
        console.error(error);
      }
    };

    fetchPirogueDetails();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById("printable-content").innerHTML;
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Impression Détails de la Pirogue</title>
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
            <h1>Détails de la Pirogue</h1>
            ${printContents}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  if (!pirogue) {
    return <p>Loading...</p>;
  }

  return (
    <main className="">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Détails de la Pirogue
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Table id="printable-content">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nom</TableCell>
                  <TableCell>{pirogue.nom}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Longueur</TableCell>
                  <TableCell>{pirogue.longueur}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Largeur</TableCell>
                  <TableCell>{pirogue.largeur}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hauteur</TableCell>
                  <TableCell>{pirogue.hauteur}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Volume</TableCell>
                  <TableCell>{pirogue.volume}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prix</TableCell>
                  <TableCell>{pirogue.prix_pirogue} €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Type</TableCell>
                  <TableCell>{pirogue.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date d'acquisition</TableCell>
                  <TableCell>{new Date(pirogue.date_acquisition).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Groupement</TableCell>
                  <TableCell>{groupement ? groupement.nom : "Non attribué"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
              <Button onClick={handlePrint}>Imprimer Détails de la Pirogue</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PirogueDetails;