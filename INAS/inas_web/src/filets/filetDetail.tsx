import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { apiBaseUrl } from "@/utils/apibaseurl";

const FiletDetails = () => {
  const { id } = useParams(); // Récupérer l'ID à partir des paramètres de l'URL
  const navigate = useNavigate();
  const [filet, setFilet] = useState(null); // État pour stocker les détails du filet

  // Récupérer les détails du filet en fonction de l'ID
  useEffect(() => {
    const fetchFiletDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/filets/${id}`);
        const data = await response.json();
        console.log(data);
        setFilet(data);
      } catch (error) {
        toast.error("Échec de la récupération des détails du filet.");
      }
    };

    fetchFiletDetails();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById("printable-content").innerHTML; // Récupère le contenu à imprimer
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Impression Détails du Filet</title>
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
            <h1>Détails du Filet</h1>
            ${printContents}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  if (!filet) {
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
            Détails du Filet
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Table id="printable-content">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nom</TableCell>
                  <TableCell>{filet.nom}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Grosseur Maille</TableCell>
                  <TableCell>{filet.grosseur_maille}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Volume</TableCell>
                  <TableCell>{filet.volume}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Catégorie</TableCell>
                  <TableCell>{filet.categorie}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Bouton pour imprimer les détails du filet */}
            <div className="flex justify-end mt-4">
              <Button onClick={handlePrint}>Imprimer Détails du Filet</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FiletDetails;
