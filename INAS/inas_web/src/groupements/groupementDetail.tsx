import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { apiBaseUrl } from "@/utils/apibaseurl";

const GroupementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupement, setGroupement] = useState(null);

  useEffect(() => {
    const fetchGroupementDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements/${id}`);
        const data = await response.json();
        console.log(data);
        setGroupement(data);
      } catch (error) {
        toast.error("Failed to fetch groupement details.");
      }
    };

    fetchGroupementDetails();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById("printable-content").innerHTML;
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Impression Détails du Groupement</title>
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
            <h1>Détails du Groupement</h1>
            ${printContents}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  if (!groupement) {
    return <p>Loading...</p>;
  }

  return (
    <main className="">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
           
          <div className="flex flex-col">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Détails du Groupement
          </h1>
          
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type de Pirogue</TableHead>
                  <TableHead>Prix Pirogue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupement.piroguesLivrees?.length > 0 ? (
                  groupement.piroguesLivrees.map((pirogue) => (
                    <TableRow key={pirogue.id}>
                      <TableCell>{pirogue.nom}</TableCell>
                      <TableCell>{pirogue.type}</TableCell>
                      <TableCell>{pirogue.prix_pirogue}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>Aucune pirogue associée</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Téléphone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupement.pecheurs?.length > 0 ? (
                  groupement.pecheurs.map((pecheur) => (
                    <TableRow key={pecheur.id}>
                      <TableCell>{pecheur.nom}</TableCell>
                      <TableCell>{pecheur.prenom}</TableCell>
                      <TableCell>{pecheur.n_tel}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>Aucun pêcheur associé</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
              <Button onClick={handlePrint}>Imprimer Détails du Groupement</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GroupementDetails;