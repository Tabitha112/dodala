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
import { toast } from "react-toastify";

import Loader from "./loading";

export const FacturesList = () => {
  const navigate = useNavigate();
  const [factures, setFactures] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFactures = async () => {
      const response = await fetch(`${apiBaseUrl}/api/factures`);
      const data = await response.json();
      console.log(data);
      setFactures(data);
    };
    fetchFactures();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedFactureId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedFactureId === null) return;
      const response = await fetch(`${apiBaseUrl}/api/factures?factureId=${selectedFactureId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La facture a été supprimée avec succès.");
        setFactures(factures.filter((facture) => facture.id_facture !== selectedFactureId));
      } else {
        toast.error("Échec de la suppression de la facture.");
        console.error("Failed to delete facture");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Error deleting facture:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedFactureId(null);
    }
  };

  const handleRowClick = (factureId: number) => {
    navigate(`/factures/${factureId}`);
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Factures</CardTitle>
            <CardDescription>Gérez vos factures et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/factures/new">
            <Button>Créer une facture</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Facture</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mois Facturé</TableHead>
                <TableHead>Droit Journalier</TableHead>
                <TableHead>Prix par m²</TableHead>
                <TableHead>Prix Pirogue</TableHead>
                <TableHead>Montant Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factures?.length > 0 ? (
                factures?.map((facture) => (
                  <TableRow
                    key={facture.id_facture}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(facture.id_facture)}
                  >
                    <TableCell>{facture.id_facture}</TableCell>
                    <TableCell>{facture.date}</TableCell>
                    <TableCell>{facture.mois_facturé}</TableCell>
                    <TableCell>{facture.droit_journalier}</TableCell>
                    <TableCell>{facture.prix_mettre_carre}</TableCell>
                    <TableCell>{facture.prix_pirogue}</TableCell>
                    <TableCell>{facture.montant_total}</TableCell>
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
                            <Link to={`/factures/${facture.id_facture}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(facture.id_facture);
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
                  <TableCell colSpan={8} className="text-center">
                    Aucune facture
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
          <p>Êtes-vous sûr de vouloir supprimer cette facture ? Cette action est irréversible.</p>
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
