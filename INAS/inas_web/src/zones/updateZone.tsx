import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditZone = () => {
  const { id } = useParams(); // Récupérer l'ID de la zone depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [zone, setZone] = useState({
    nom_zone: '',
    superficie: '',
    distance_mer: '',
    droit_peche_journalier: '',
    prix_metre_carre: '',
  });
  const [loading, setLoading] = useState(true);

  // Charger les détails de la zone à modifier
  useEffect(() => {
    const fetchZone = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/zones/${id}`);
        if (response.ok) {
          const data = await response.json();
          setZone(data);
        } else {
          toast.error('Échec du chargement des informations de la zone.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchZone();
  }, [id]);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/zones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zone),
      });

      if (response.ok) {
        toast.success('La zone a été mise à jour avec succès.');
        navigate('/zones'); // Rediriger vers la liste des zones après modification
      } else {
        toast.error('Échec de la mise à jour de la zone.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setZone((prevZone) => ({
      ...prevZone,
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
          <CardTitle>Modifier la Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom de la zone */}
            <div>
              <Label htmlFor="nom_zone">Nom de la Zone</Label>
              <Input
                id="nom_zone"
                name="nom_zone"
                value={zone.nom_zone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Superficie */}
            <div>
              <Label htmlFor="superficie">Superficie (en m²)</Label>
              <Input
                id="superficie"
                name="superficie"
                value={zone.superficie}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Distance de la mer */}
            <div>
              <Label htmlFor="distance_mer">Distance à la mer (en km)</Label>
              <Input
                id="distance_mer"
                name="distance_mer"
                value={zone.distance_mer}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Droit de pêche journalier */}
            <div>
              <Label htmlFor="droit_peche_journalier">Droit de pêche journalier (en FCFA)</Label>
              <Input
                id="droit_peche_journalier"
                name="droit_peche_journalier"
                value={zone.droit_peche_journalier}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Prix par m² */}
            <div>
              <Label htmlFor="prix_metre_carre">Prix par m² (en FCFA)</Label>
              <Input
                id="prix_metre_carre"
                name="prix_metre_carre"
                value={zone.prix_metre_carre}
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

export default EditZone;
