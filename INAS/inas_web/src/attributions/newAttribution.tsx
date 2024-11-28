import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { apiBaseUrl } from '@/utils/apibaseurl';

export default function NewAttribution() {
  const [groupements, setGroupements] = useState([]); // Liste des groupements
  const [zones, setZones] = useState([]); // Liste des zones
  const [selectedGroupement, setSelectedGroupement] = useState(''); // ID du groupement sélectionné
  const [selectedZone, setSelectedZone] = useState(''); // ID de la zone sélectionnée
  const [startDate, setStartDate] = useState(''); // Date de début
  const [endDate, setEndDate] = useState(''); // Date de fin

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // Récupérer les groupements
  useEffect(() => {
    const fetchGroupements = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements`);
        const data = await response.json();
        setGroupements(data);

      } catch (error) {
        console.error('Erreur lors de la récupération des groupements:', error);
      }
    };

    fetchGroupements();
  }, []);

  // Récupérer les zones
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/zones`);
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones:', error);
      }
    };

    fetchZones();
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();


  // Affichage des données à envoyer
  console.log("Données à envoyer :", {
    id_groupement: selectedGroupement,
    id_zone: selectedZone,
    date_debut: startDate,
    date_fin: endDate,
  });

    const response = await fetch(`${apiBaseUrl}/api/attributions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_groupement: selectedGroupement,
        id_zone: selectedZone,
        date_debut: startDate,
        date_fin: endDate,
      }),
    });

    console.log(startDate);


    if (response.ok) {
      navigate('/attributions'); // Redirection après la création de l'attribution
    } else {
      console.error('Échec de la création de l\'attribution');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouvelle Attribution</legend>

          {/* Sélection de Groupement */}
          <div className="grid gap-3">
            <Label htmlFor="groupement-select">Sélectionnez un Groupement</Label>
            <select
              id="groupement-select"
              value={selectedGroupement}
              onChange={(e) => setSelectedGroupement(e.target.value)}
            >
              <option value="">Sélectionnez un groupement</option>
              {groupements.map((groupement) => (
                <option key={groupement.id_groupement} value={groupement.id_groupement}>
                  {groupement.nom} {/* Affiche le nom du groupement */}
                </option>
              ))}
            </select>
          </div>

          {/* Sélection de Zone */}
          <div className="grid gap-3">
            <Label htmlFor="zone-select">Sélectionnez une Zone</Label>
            <select
              id="zone-select"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="">Sélectionnez une zone</option>
              {zones.map((zone) => (
                <option key={zone.id_zone} value={zone.id_zone}>
                  {zone.nom_zone} {/* Affiche le nom de la zone */}
                </option>
              ))}
            </select>
          </div>

          {/* Date de Début Field */}
          <div className="grid gap-3">
            <Label htmlFor="startDate">Date de Début</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* Date de Fin Field */}
          <div className="grid gap-3">
            <Label htmlFor="endDate">Date de Fin</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <Button type="submit">Créer</Button>
      </form>
    </div>
  );
}
