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

export const ZonesList = () => {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      const response = await fetch(`${apiBaseUrl}/api/zones`);
      const data = await response.json();
      console.log(data);
      setZones(data);
    };
    fetchZones();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedZoneId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedZoneId === null) return;
      const response = await fetch(`${apiBaseUrl}/api/zones?zoneId=${selectedZoneId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La zone a été supprimée avec succès.");
        setZones(zones.filter((zone) => zone.id_zone !== selectedZoneId));
      } else {
        toast.error("Échec de la suppression de la zone.");
        console.error("Failed to delete zone");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Error deleting zone:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedZoneId(null);
    }
  };

  const handleRowClick = (zoneId: number) => {
    navigate(`/zones/${zoneId}`);
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Zones</CardTitle>
            <CardDescription>Gérez vos zones et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/zones/new">
            <Button>Créer une zone</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Droit de pêche (€/jour)</TableHead>
                <TableHead>Prix/m² (€)</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones?.length > 0 ? (
                zones?.map((zone) => (
                  <TableRow
                    key={zone.id_zone}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(zone.id_zone)}
                  >
                    <TableCell className="font-medium">{zone.nom_zone}</TableCell>
                    <TableCell>{zone.droit_peche_journalier}</TableCell>
                    <TableCell>{zone.prix_metre_carre}</TableCell>
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
                            <Link to={`/zones/${zone.id_zone}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(zone.id_zone);
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
                  <TableCell colSpan={4} className="text-center">
                    Aucune zone disponible
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
          <p>Êtes-vous sûr de vouloir supprimer cette zone ? Cette action est irréversible.</p>
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
