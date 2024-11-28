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

export const PiroguesList = () => {
  const navigate = useNavigate();
  const [pirogues, setPirogues] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPirogueId, setSelectedPirogueId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPirogues = async () => {
      const response = await fetch(`${apiBaseUrl}/api/pirogues`);
      const data = await response.json();
      console.log(data);
      setPirogues(data);
    };
    fetchPirogues();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedPirogueId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedPirogueId === null) return;
      const response = await fetch(`${apiBaseUrl}/api/pirogues?pirogueId=${selectedPirogueId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La pirogue a été supprimée avec succès.");
        setPirogues(pirogues.filter((pirogue) => pirogue.id_pirogue !== selectedPirogueId));
      } else {
        toast.error("Échec de la suppression de la pirogue.");
        console.error("Failed to delete pirogue");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error("Error deleting pirogue:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedPirogueId(null);
    }
  };

  const handleRowClick = (pirogueId: number) => {
    navigate(`/pirogues/${pirogueId}`);
  };

  return (
    <div className="bg-white p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Pirogues</CardTitle>
            <CardDescription>Gérez vos pirogues et consultez leurs détails.</CardDescription>
          </div>
          <Link to="/pirogues/new">
            <Button>Créer une pirogue</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date d'acquisition</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pirogues?.length > 0 ? (
                pirogues.map((pirogue) => (
                  <TableRow
                    key={pirogue.id_pirogue}
                    className="hover:bg-muted/10 cursor-pointer"
                    onClick={() => handleRowClick(pirogue.id_pirogue)}
                  >
                    <TableCell>{pirogue.nom}</TableCell>
                    <TableCell>{pirogue.prix_pirogue}</TableCell>
                    <TableCell>{pirogue.type}</TableCell>
                    <TableCell>{pirogue.date_acquisition}</TableCell>
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
                            <Link to={`/pirogues/${pirogue.id_pirogue}/edit`}>
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(pirogue.id_pirogue);
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
                    Aucune pirogue
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
          <p>Êtes-vous sûr de vouloir supprimer cette pirogue ? Cette action est irréversible.</p>
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
