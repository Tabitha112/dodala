import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditAttribution = () => {
  const { id } = useParams(); // Récupérer l'ID de l'attribution depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [attribution, setAttribution] = useState({
    groupementId: '',
    zoneId: '',
    dateDebut: '',
    dateFin: '',
  });
  const [loading, setLoading] = useState(true);
  const [groupements, setGroupements] = useState([]); // État pour les groupements
  const [zones, setZones] = useState([]); // État pour les zones

  // Charger les détails de l'attribution à modifier
  useEffect(() => {
    const fetchAttribution = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/attributions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAttribution(data);
        } else {
          toast.error("Échec du chargement des informations de l'attribution.");
        }
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement.");
      } finally {
        setLoading(false);
      }
    };

    const fetchGroupements = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements`);
        if (response.ok) {
          const data = await response.json();
          setGroupements(data); // Stocker la liste des groupements
        }
      } catch (error) {
        toast.error("Échec du chargement des groupements.");
      }
    };

    const fetchZones = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/zones`);
        if (response.ok) {
          const data = await response.json();
          setZones(data); // Stocker la liste des zones
        }
      } catch (error) {
        toast.error("Échec du chargement des zones.");
      }
    };

    fetchAttribution();
    fetchGroupements();
    fetchZones();
  }, [id]);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/attributions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attribution),
      });

      if (response.ok) {
        toast.success("L'attribution a été mise à jour avec succès.");
        navigate('/attributions'); // Rediriger vers la liste des attributions après modification
      } else {
        toast.error("Échec de la mise à jour de l'attribution.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAttribution((prevAttribution) => ({
      ...prevAttribution,
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
          <CardTitle>Modifier l'Attribution</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Groupement */}
            <div className="flex flex-col">
              <Label htmlFor="groupementId">Groupement</Label>
              <select
                id="groupementId"
                name="groupementId"
                value={attribution.groupementId}
                onChange={handleChange}
                required
                className="mt-1 border border-gray-300 rounded-md p-2"
              >
                <option value="">Sélectionner un groupement</option>
                {groupements.map((groupement) => (
                  <option key={groupement.id} value={groupement.id}>
                    {groupement.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Zone */}
            <div className="flex flex-col">
              <Label htmlFor="zoneId">Zone</Label>
              <select
                id="zoneId"
                name="zoneId"
                value={attribution.zoneId}
                onChange={handleChange}
                required
                className="mt-1 border border-gray-300 rounded-md p-2"
              >
                <option value="">Sélectionner une zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Date Début */}
            <div className="flex flex-col">
              <Label htmlFor="dateDebut">Date Début</Label>
              <Input
                id="dateDebut"
                name="dateDebut"
                type="date"
                value={attribution.dateDebut}
                onChange={handleChange}
                required
                className="mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Champ Date Fin */}
            <div className="flex flex-col">
              <Label htmlFor="dateFin">Date Fin</Label>
              <Input
                id="dateFin"
                name="dateFin"
                type="date"
                value={attribution.dateFin}
                onChange={handleChange}
                required
                className="mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Bouton de soumission */}
            <Button type="submit" className="mt-4">Mettre à jour</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAttribution;
