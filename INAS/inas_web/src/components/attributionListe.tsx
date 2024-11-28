import { useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiBaseUrl } from '@/utils/apibaseurl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify"; // Utilisation de react-toastify

import Loader from "./loading";

export const AttributionsList = () => {
  const navigate = useNavigate();
  const [attributions, setAttributions] = useState([]);
  const [groupements, setGroupements] = useState([]); // État pour stocker les groupements
  const [zones, setZones] = useState([]); // État pour stocker les zones
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAttributionId, setSelectedAttributionId] = useState<number | null>(null);

  // Fonction pour récupérer toutes les attributions, groupements et zones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attributionsResponse, groupementsResponse, zonesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/attributions`),
          fetch(`${apiBaseUrl}/api/groupements`),
          fetch(`${apiBaseUrl}/api/zones`),
        ]);

        const [attributionsData, groupementsData, zonesData] = await Promise.all([
          attributionsResponse.json(),
          groupementsResponse.json(),
          zonesResponse.json(),
        ]);

        setAttributions(attributionsData);
        setGroupements(groupementsData);
        setZones(zonesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour gérer la suppression d'une attribution
  const handleDeleteClick = (id: number) => {
    setSelectedAttributionId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedAttributionId === null) return;

      // Appel à l'API pour supprimer l'attribution via l'endpoint
      const response = await fetch(`${apiBaseUrl}/api/attributions/${selectedAttributionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete attribution');
      }

      toast.success("L'attribution a été supprimée avec succès.");
      setAttributions(attributions.filter((attribution) => attribution.id_attribution !== selectedAttributionId));
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Error deleting attribution:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedAttributionId(null);
    }
  };

  // Fonction pour gérer la navigation vers la page de détail d'une attribution
  const handleRowClick = (attributionId: number) => {
    navigate(`/attributions/${attributionId}`);
  };

  // Fonction pour récupérer le nom du groupement par ID
  const getGroupementNameById = (id: number) => {
    const groupement = groupements.find((g) => g.id_groupement === id);
    return groupement ? groupement.nom : "Inconnu";
  };

  // Fonction pour récupérer le nom de la zone par ID
  const getZoneNameById = (id: number) => {
    const zone = zones.find((z) => z.id_zone === id);
    return zone ? zone.nom : "Inconnue";
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Attributions</CardTitle>
            <CardDescription>Gérez vos attributions et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/attributions/new">
            <Button>Créer une attribution</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Groupement</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Date de début</TableHead>
                <TableHead>Date de fin</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributions?.length > 0 ? (
                attributions?.map((attribution) => (
                  <TableRow
                    key={attribution.id_attribution}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(attribution.id_attribution)} // Navigation sur clic
                  >
                    <TableCell className="font-medium">{getGroupementNameById(attribution.id_groupement)}</TableCell>
                    <TableCell>{getZoneNameById(attribution.id_zone)}</TableCell>
                    <TableCell>{attribution.date_début}</TableCell>
                    <TableCell>{attribution.date_fin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Basculer le menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link to={`/attributions/${attribution.id_attribution}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(attribution.id_attribution);
                            }}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Aucune attribution
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Suspense>
      </CardContent>
      <Separator />

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr de vouloir supprimer cette attribution ? Cette action est irréversible.</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
