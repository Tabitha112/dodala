import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditGroupement = () => {
  const { id } = useParams(); // Récupérer l'ID du groupement depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [groupement, setGroupement] = useState({
    nom: '',
    adresse_geographique: '',
  });
  const [loading, setLoading] = useState(true);

  // Charger les détails du groupement à modifier
  useEffect(() => {
    const fetchGroupement = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements/${id}`);
        if (response.ok) {
          const data = await response.json();
          setGroupement(data);
        } else {
          toast.error('Échec du chargement des informations du groupement.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupement();
  }, [id]);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/groupements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupement),
      });

      if (response.ok) {
        toast.success('Le groupement a été mis à jour avec succès.');
        navigate('/groupements'); // Rediriger vers la liste des groupements après modification
      } else {
        toast.error('Échec de la mise à jour du groupement.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupement((prevGroupement) => ({
      ...prevGroupement,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Chargement...</div>; // Un loader simple peut être utilisé ici
  }

  return (
    <div className="bg-white p-4">
      <Card>
        <CardHeader>
          <CardTitle>Modifier le Groupement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom */}
            <div>
              <Label htmlFor="nom">Nom du Groupement</Label>
              <Input
                id="nom"
                name="nom"
                value={groupement.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Adresse Géographique */}
            <div>
              <Label htmlFor="adresse_geographique">Adresse Géographique</Label>
              <Input
                id="adresse_geographique"
                name="adresse_geographique"
                value={groupement.adresse_geographique}
                onChange={handleChange}
                required
              />
            </div>

            {/* Bouton de soumission */}
            <Button type="submit">Mettre à jour</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditGroupement;
