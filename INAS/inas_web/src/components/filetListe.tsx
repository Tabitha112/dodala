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

export const FiletsList = () => {
  const navigate = useNavigate();
  const [filets, setFilets] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiletId, setSelectedFiletId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFilets = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/filets`);
        if (!response.ok) {
          throw new Error('Erreur de chargement des filets');
        }
        const data = await response.json();
        setFilets(data);
      } catch (error) {
        console.error("Error fetching filets:", error);
        toast.error("Erreur lors de la récupération des filets.");
      }
    };
    fetchFilets();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedFiletId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedFiletId === null) return;
      const response = await fetch(`${apiBaseUrl}/api/filets?id_filet=${selectedFiletId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Le filet a été supprimé avec succès.");
        setFilets(filets.filter((filet) => filet.id_filet !== selectedFiletId));
      } else {
        toast.error("Échec de la suppression du filet.");
        console.error("Failed to delete filet");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Error deleting filet:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedFiletId(null);
    }
  };

  const handleRowClick = (filetId: number) => {
    navigate(`/filets/${filetId}`);
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Filets</CardTitle>
            <CardDescription>Gérez vos filets et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/filets/new">
            <Button>Créer un filet</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Grosseur Maille</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filets.length > 0 ? (
                filets.map((filet) => (
                  <TableRow
                    key={filet.id_filet}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(filet.id_filet)}
                  >
                    <TableCell>{filet.nom}</TableCell>
                    <TableCell>{filet.Grosseur_maille}</TableCell>
                    <TableCell>{filet.volume}</TableCell>
                    <TableCell>{filet.catégorie}</TableCell>
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
                            <Link to={`/filets/${filet.id_filet}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(filet.id_filet);
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
                    Aucun filet
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
          <p>Êtes-vous sûr de vouloir supprimer ce filet ? Cette action est irréversible.</p>
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