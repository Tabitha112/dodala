import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditFilet = () => {
  const { id } = useParams(); // Récupérer l'ID du filet depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [filet, setFilet] = useState({
    nom: '', // Ajout du champ nom
    grosseur_maille: '',
    volume: '',
    id_pirogue: '',
  });
  const [loading, setLoading] = useState(true);

  // Charger les détails du filet à modifier
  useEffect(() => {
    const fetchFilet = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/filets/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFilet(data);
        } else {
          toast.error('Échec du chargement des informations du filet.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilet();
  }, [id]);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/filets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filet),
      });

      if (response.ok) {
        toast.success('Le filet a été mis à jour avec succès.');
        navigate('/filets'); // Rediriger vers la liste des filets après modification
      } else {
        toast.error('Échec de la mise à jour du filet.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilet((prevFilet) => ({
      ...prevFilet,
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
          <CardTitle>Modifier le Filet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom */}
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                name="nom"
                value={filet.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Grosseur Maille */}
            <div>
              <Label htmlFor="grosseur_maille">Grosseur de Maille</Label>
              <Input
                id="grosseur_maille"
                name="grosseur_maille"
                value={filet.grosseur_maille}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Volume */}
            <div>
              <Label htmlFor="volume">Volume</Label>
              <Input
                id="volume"
                name="volume"
                type="number"
                step="0.01"
                value={filet.volume}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ ID Pirogue */}
            <div>
              <Label htmlFor="id_pirogue">ID de la Pirogue</Label>
              <Input
                id="id_pirogue"
                name="id_pirogue"
                value={filet.id_pirogue}
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

export default EditFilet;
