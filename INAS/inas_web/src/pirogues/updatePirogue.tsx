import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { apiBaseUrl } from '@/utils/apibaseurl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Groupement {
  id_groupement: number;
  nom: string;
}

interface Pirogue {
  nom: string;
  longueur: string;
  largeur: string;
  hauteur: string;
  volume: string;
  prix_pirogue: string;
  date_acquisition: string;
  id_type: string;
  type: string;
  id_groupement: string | null;
}

export const EditPirogue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [groupements, setGroupements] = useState<Groupement[]>([]);
  const [pirogue, setPirogue] = useState<Pirogue>({
    nom: '',
    longueur: '',
    largeur: '',
    hauteur: '',
    volume: '',
    prix_pirogue: '',
    date_acquisition: '',
    id_type: '',
    type: '',
    id_groupement: null,
  });

  useEffect(() => {
    const fetchGroupements = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements`);
        if (response.ok) {
          const data = await response.json();
          setGroupements(data);
        } else {
          toast.error('Échec du chargement des groupements.');
        }
      } catch (error) {
        console.error('Erreur:', error);
        toast.error('Une erreur est survenue lors du chargement des groupements.');
      }
    };

    fetchGroupements();
  }, []);

  useEffect(() => {
    const fetchPirogue = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/pirogues/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPirogue(data);
        } else {
          toast.error('Échec du chargement des informations de la pirogue.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchPirogue();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pirogueToUpdate = {
      ...pirogue,
      longueur: parseFloat(pirogue.longueur),
      largeur: parseFloat(pirogue.largeur),
      hauteur: parseFloat(pirogue.hauteur),
      volume: parseFloat(pirogue.volume),
      prix_pirogue: parseFloat(pirogue.prix_pirogue),
      id_groupement: pirogue.id_groupement === "null" ? null : 
                    pirogue.id_groupement ? parseInt(pirogue.id_groupement) : null
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/pirogues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pirogueToUpdate),
      });

      if (response.ok) {
        const updatedPirogue = await response.json();
        setPirogue(updatedPirogue);
        toast.success('La pirogue a été mise à jour avec succès.');
        navigate('/pirogues');
      } else {
        const errorData = await response.json();
        toast.error(`Échec de la mise à jour de la pirogue: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPirogue((prevPirogue) => ({
      ...prevPirogue,
      [name]: value,
    }));
  };

  const handleGroupementChange = (value: string) => {
    setPirogue((prevPirogue) => ({
      ...prevPirogue,
      id_groupement: value === "null" ? null : value,
    }));
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white p-4">
      <Card>
        <CardHeader>
          <CardTitle>Modifier la Pirogue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de la Pirogue</Label>
              <Input
                id="nom"
                name="nom"
                value={pirogue.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="longueur">Longueur</Label>
              <Input
                id="longueur"
                name="longueur"
                value={pirogue.longueur}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="largeur">Largeur</Label>
              <Input
                id="largeur"
                name="largeur"
                value={pirogue.largeur}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="hauteur">Hauteur</Label>
              <Input
                id="hauteur"
                name="hauteur"
                value={pirogue.hauteur}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                name="volume"
                value={pirogue.volume}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="prix_pirogue">Prix</Label>
              <Input
                id="prix_pirogue"
                name="prix_pirogue"
                value={pirogue.prix_pirogue}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="date_acquisition">Date d'Acquisition</Label>
              <Input
                id="date_acquisition"
                name="date_acquisition"
                type="date"
                value={pirogue.date_acquisition}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={pirogue.type}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="groupement">Groupement (Facultatif)</Label>
              <Select 
                onValueChange={handleGroupementChange} 
                value={pirogue.id_groupement?.toString() || "null"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un groupement (optionnel)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Aucun groupement</SelectItem>
                  {groupements.map((groupement) => (
                    <SelectItem 
                      key={groupement.id_groupement} 
                      value={groupement.id_groupement.toString()}
                    >
                      {groupement.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Mettre à jour</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPirogue;