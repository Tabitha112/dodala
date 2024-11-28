import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify'; // Utilisation de react-toastify pour les notifications
import { apiBaseUrl } from '@/utils/apibaseurl';

export const EditFacture = () => {
  const { id } = useParams(); // Récupérer l'ID de la facture depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [facture, setFacture] = useState({
    zoneAttribuée: '',
    pirogueLivrée: '',
    montantTotal: '',
    date: '',
    mois_facturé: '',
    droit_journalier: '',
    prix_metre_carre: '',
    prix_pirogue: '',
    montant_total: '',
    id_groupement: '',
    id_zone: '',
    id_attribution: '',
    id_pirogue: '',
  });
  const [loading, setLoading] = useState(true);

  // Charger les détails de la facture à modifier
  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/factures/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFacture(data);
        } else {
          toast.error('Échec du chargement des informations de la facture.');
        }
      } catch (error) {
        toast.error('Une erreur est survenue lors du chargement.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacture();
  }, [id]);

  // Gérer la soumission du formulaire de mise à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/factures/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facture),
      });

      if (response.ok) {
        toast.success('La facture a été mise à jour avec succès.');
        navigate('/factures'); // Rediriger vers la liste des factures après modification
      } else {
        toast.error('Échec de la mise à jour de la facture.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacture((prevFacture) => ({
      ...prevFacture,
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
          <CardTitle>Modifier la Facture</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Zone Attribuée */}
            <div>
              <Label htmlFor="zoneAttribuée">Zone Attribuée</Label>
              <Input
                id="zoneAttribuée"
                name="zoneAttribuée"
                value={facture.zoneAttribuée}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Pirogue Livrée */}
            <div>
              <Label htmlFor="pirogueLivrée">Pirogue Livrée</Label>
              <Input
                id="pirogueLivrée"
                name="pirogueLivrée"
                value={facture.pirogueLivrée}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Date */}
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={facture.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Mois Facturé */}
            <div>
              <Label htmlFor="mois_facturé">Mois Facturé</Label>
              <Input
                id="mois_facturé"
                name="mois_facturé"
                value={facture.mois_facturé}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Droit Journalier */}
            <div>
              <Label htmlFor="droit_journalier">Droit Journalier</Label>
              <Input
                id="droit_journalier"
                name="droit_journalier"
                type="number"
                value={facture.droit_journalier}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Prix par Mètre Carré */}
            <div>
              <Label htmlFor="prix_metre_carre">Prix par Mètre Carré</Label>
              <Input
                id="prix_metre_carre"
                name="prix_metre_carre"
                type="number"
                step="0.01"
                value={facture.prix_metre_carre}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Prix Pirogue */}
            <div>
              <Label htmlFor="prix_pirogue">Prix de la Pirogue</Label>
              <Input
                id="prix_pirogue"
                name="prix_pirogue"
                type="number"
                step="0.01"
                value={facture.prix_pirogue}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ Montant Total */}
            <div>
              <Label htmlFor="montant_total">Montant Total</Label>
              <Input
                id="montant_total"
                name="montant_total"
                type="number"
                step="0.01"
                value={facture.montant_total}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ ID Groupement */}
            <div>
              <Label htmlFor="id_groupement">ID Groupement</Label>
              <Input
                id="id_groupement"
                name="id_groupement"
                value={facture.id_groupement}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ ID Zone */}
            <div>
              <Label htmlFor="id_zone">ID Zone</Label>
              <Input
                id="id_zone"
                name="id_zone"
                value={facture.id_zone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ ID Attribution */}
            <div>
              <Label htmlFor="id_attribution">ID Attribution</Label>
              <Input
                id="id_attribution"
                name="id_attribution"
                value={facture.id_attribution}
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
                value={facture.id_pirogue}
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

export default EditFacture;
