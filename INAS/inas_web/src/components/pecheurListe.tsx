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

import Loader from "../components/loading";

export const PecheursList = () => {
  const navigate = useNavigate();
  const [pecheurs, setPecheurs] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPecheurId, setSelectedPecheurId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPecheurs = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/pecheurs`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des pêcheurs');
        const data = await response.json();
        setPecheurs(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des pêcheurs.");
        console.error("Erreur de récupération des pêcheurs :", error);
      }
    };
    fetchPecheurs();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedPecheurId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedPecheurId === null) return;
      const response = await fetch(`${apiBaseUrl}/api/pecheurs/${selectedPecheurId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Le pêcheur a été supprimé avec succès.");
        setPecheurs(pecheurs.filter((pecheur) => pecheur.id_pecheur !== selectedPecheurId));
      } else {
        toast.error("Échec de la suppression du pêcheur.");
        console.error("Échec de la suppression du pêcheur");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Erreur lors de la suppression du pêcheur :", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedPecheurId(null);
    }
  };

  const handleRowClick = (pecheurId: number) => {
    navigate(`/pecheurs/${pecheurId}`);
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Pêcheurs</CardTitle>
            <CardDescription>Gérez vos pêcheurs et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/pecheurs/new">
            <Button>Ajouter un pêcheur</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénoms</TableHead>
                <TableHead>Sexe</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pecheurs.length > 0 ? (
                pecheurs.map((pecheur) => (
                  <TableRow
                    key={pecheur.id_pecheur}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(pecheur.id_pecheur)}
                  >
                    <TableCell className="font-medium">{pecheur.nom}</TableCell>
                    <TableCell>{pecheur.prenom}</TableCell>
                    <TableCell>{pecheur.sexe}</TableCell>
                    <TableCell>{pecheur.n_tel}</TableCell>
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
                            <Link to={`/pecheurs/${pecheur.id_pecheur}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(pecheur.id_pecheur);
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
                    Aucun pêcheur
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
          <p>Êtes-vous sûr de vouloir supprimer ce pêcheur ? Cette action est irréversible.</p>
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
