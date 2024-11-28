import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditPecheur = () => {
  const { id } = useParams(); // Récupérer l'ID du pêcheur depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [pecheur, setPecheur] = useState({
    nom: '',
    prenom: '',
    sexe: '',
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    n_tel: '', // Numéro de téléphone
    id_groupement: '', // ID du groupement
  });
  const [loading, setLoading] = useState(true);
  const [groupements, setGroupements] = useState([]); // État pour stocker les groupements
  const [loadingGroupements, setLoadingGroupements] = useState(true); // État de chargement pour les groupements

  // Charger les détails du pêcheur à modifier
  useEffect(() => {
    const fetchPecheur = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/pecheurs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPecheur(data);
        } else {
          toast.error('Échec du chargement des informations du pêcheur.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchPecheur();
  }, [id]);

  // Charger les groupements
  useEffect(() => {
    const fetchGroupements = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements`);
        if (response.ok) {
          const data = await response.json();
          setGroupements(data); // Stocke les groupements récupérés
        } else {
          toast.error('Échec du chargement des groupements.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement des groupements.');
      } finally {
        setLoadingGroupements(false);
      }
    };

    fetchGroupements();
  }, []);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPecheur = {
      nom: pecheur.nom,
      prenom: pecheur.prenom,
      sexe: pecheur.sexe,
      date_naissance: pecheur.date_naissance,
      lieu_naissance: pecheur.lieu_naissance,
      adresse: pecheur.adresse,
      n_tel: pecheur.n_tel,
      id_groupement: pecheur.id_groupement,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/pecheurs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPecheur),
      });

      if (response.ok) {
        toast.success('Le pêcheur a été mis à jour avec succès.');
        navigate('/pecheurs'); // Rediriger vers la liste des pêcheurs après modification
      } else {
        toast.error('Échec de la mise à jour du pêcheur.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPecheur((prevPecheur) => ({
      ...prevPecheur,
      [name]: value,
    }));
  };

  if (loading || loadingGroupements) {
    return <div>Chargement...</div>; // Un loader simple peut être utilisé ici
  }

  return (
    <div className="bg-white p-4">
      <Card>
        <CardHeader>
          <CardTitle>Modifier le Pêcheur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom */}
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                name="nom"
                value={pecheur.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Prénom */}
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                name="prenom"
                value={pecheur.prenom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Sexe */}
            <div>
              <Label htmlFor="sexe">Sexe</Label>
              <Input
                id="sexe"
                name="sexe"
                value={pecheur.sexe}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Date de Naissance */}
            <div>
              <Label htmlFor="date_naissance">Date de Naissance</Label>
              <Input
                id="date_naissance"
                name="date_naissance"
                type="date"
                value={pecheur.date_naissance}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Lieu de Naissance */}
            <div>
              <Label htmlFor="lieu_naissance">Lieu de Naissance</Label>
              <Input
                id="lieu_naissance"
                name="lieu_naissance"
                value={pecheur.lieu_naissance}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Adresse */}
            <div>
              <Label htmlFor="adresse">Adresse</Label>
              <Input
                id="adresse"
                name="adresse"
                value={pecheur.adresse}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Numéro de Téléphone */}
            <div>
              <Label htmlFor="n_tel">Numéro de Téléphone</Label>
              <Input
                id="n_tel"
                name="n_tel"
                value={pecheur.n_tel}
                onChange={handleChange}
                required
              />
            </div>

            
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

            {/* Bouton de soumission */}
            <Button type="submit">Mettre à jour</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPecheur;
