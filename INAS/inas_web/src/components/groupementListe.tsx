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

export const GroupementsList = () => {
  const navigate = useNavigate();
  const [groupements, setGroupements] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroupementId, setSelectedGroupementId] = useState<number | null>(null);

  useEffect(() => {
    const fetchGroupements = async () => {
      const response = await fetch(`${apiBaseUrl}/api/groupements`);
      const data = await response.json();
      setGroupements(data);
    };
    fetchGroupements();
  }, []);
  const handleDeleteClick = (id: number) => {
    setSelectedGroupementId(id);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async () => {
    try {
      if (selectedGroupementId === null) return;
  
      // Appel de l'API backend pour supprimer le groupement
      const response = await fetch(`${apiBaseUrl}/api/groupements/${selectedGroupementId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        toast.success('Le groupement a été supprimé avec succès.');
        
        // Mise à jour de l'état des groupements côté client
        setGroupements(groupements.filter((groupement) => groupement.id_groupement !== selectedGroupementId));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Échec de la suppression du groupement.');
        console.error("Erreur lors de la suppression du groupement :", errorData);
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la suppression.');
      console.error('Error deleting groupement:', error);
    } finally {
      setIsDialogOpen(false);
      setSelectedGroupementId(null);
    }
  };
  
  const handleRowClick = (groupementId: number) => {
    navigate(`/groupements/${groupementId}`);
  };
  


  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Groupements</CardTitle>
            <CardDescription>Gérez vos groupements et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/groupements/new">
            <Button>Créer un groupement</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Logo</span>
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Adresse</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupements?.length > 0 ? (
                groupements?.map((groupement) => (
                  <TableRow
                    key={groupement.id_groupement}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(groupement.id_groupement)} // Ajout du click handler
                  >
                    <TableCell className="hidden sm:table-cell">
                      <Link to={`/groupements/${groupement.id_groupement}`}>
                        <img
                          alt={`Logo de ${groupement.nom}`}
                          className="aspect-square rounded-md object-contain"
                          height="64"
                          src="/placeholder.svg" // Assuming a placeholder image
                          width="64"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">{groupement.nom}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {groupement.adresse_geographique}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Basculer le menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link to={`/groupements/${groupement.id_groupement}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation(); // Empêche le déclenchement de handleRowClick
                              handleDeleteClick(groupement.id_groupement);
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
                    Aucun groupement
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
          <p>Êtes-vous sûr de vouloir supprimer ce groupement ? Cette action est irréversible.</p>
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
