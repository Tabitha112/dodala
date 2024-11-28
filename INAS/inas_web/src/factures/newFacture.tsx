import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NewFacture() {
  // Déclaration des états pour chaque champ du formulaire
  const [groupementId, setGroupementId] = useState(''); // ID du groupement auquel la facture est associée
  const [zones, setZones] = useState(''); // Zones attribuées au groupement
  const [pirogues, setPirogues] = useState(''); // Pirogues livrées au groupement
  const [date, setDate] = useState(''); // Date de la facture
  const [moisFacture, setMoisFacture] = useState(''); // Mois facturé
  const [droitJournalier, setDroitJournalier] = useState(''); // Droit journalier
  const [prixMetreCarre, setPrixMetreCarre] = useState(''); // Prix par m²
  const [prixPirogue, setPrixPirogue] = useState(''); // Prix des pirogues
  const [totalAmount, setTotalAmount] = useState(''); // Montant total de la facture

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/factures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_groupement: groupementId, // ID du groupement
        zones_attribuees: zones, // Zones attribuées
        pirogues_livrees: pirogues, // Pirogues livrées
        date: date, // Date de la facture
        mois_facturé: moisFacture, // Mois facturé
        droit_journalier: droitJournalier, // Droit journalier
        prix_metre_carre: prixMetreCarre, // Prix par m²
        prix_pirogue: prixPirogue, // Prix des pirogues
        montant_total: totalAmount, // Montant total
      }),
    });

    if (response.ok) {
      navigate('/dashboard/factures'); // Redirection après la création de la facture
    } else {
      console.error('Échec de la création de la facture');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouvelle Facture</legend>

          {/* ID du Groupement Field */}
          <div className="grid gap-3">
            <Label htmlFor="groupementId">ID du Groupement</Label>
            <Input
              id="groupementId"
              value={groupementId}
              onChange={(e) => setGroupementId(e.target.value)}
              placeholder="Entrez l'ID du groupement"
              required
            />
          </div>

          {/* Zones Attribuées Field */}
          <div className="grid gap-3">
            <Label htmlFor="zones">Zones Attribuées</Label>
            <Input
              id="zones"
              value={zones}
              onChange={(e) => setZones(e.target.value)}
              placeholder="Entrez les zones attribuées"
              required
            />
          </div>

          {/* Pirogues Livrées Field */}
          <div className="grid gap-3">
            <Label htmlFor="pirogues">Pirogues Livrées</Label>
            <Input
              id="pirogues"
              value={pirogues}
              onChange={(e) => setPirogues(e.target.value)}
              placeholder="Entrez les pirogues livrées"
              required
            />
          </div>

          {/* Date Field */}
          <div className="grid gap-3">
            <Label htmlFor="date">Date de la Facture</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Mois Facturé Field */}
          <div className="grid gap-3">
            <Label htmlFor="moisFacture">Mois Facturé</Label>
            <Input
              id="moisFacture"
              value={moisFacture}
              onChange={(e) => setMoisFacture(e.target.value)}
              placeholder="Entrez le mois facturé"
              required
            />
          </div>

          {/* Droit Journalier Field */}
          <div className="grid gap-3">
            <Label htmlFor="droitJournalier">Droit Journalier</Label>
            <Input
              id="droitJournalier"
              value={droitJournalier}
              onChange={(e) => setDroitJournalier(e.target.value)}
              placeholder="Entrez le droit journalier"
              required
            />
          </div>

          {/* Prix par m² Field */}
          <div className="grid gap-3">
            <Label htmlFor="prixMetreCarre">Prix par m²</Label>
            <Input
              id="prixMetreCarre"
              value={prixMetreCarre}
              onChange={(e) => setPrixMetreCarre(e.target.value)}
              placeholder="Entrez le prix par mètre carré"
              required
            />
          </div>

          {/* Prix des Pirogues Field */}
          <div className="grid gap-3">
            <Label htmlFor="prixPirogue">Prix des Pirogues</Label>
            <Input
              id="prixPirogue"
              value={prixPirogue}
              onChange={(e) => setPrixPirogue(e.target.value)}
              placeholder="Entrez le prix des pirogues"
              required
            />
          </div>

          {/* Montant Total Field - Dernier champ */}
          <div className="grid gap-3">
            <Label htmlFor="totalAmount">Montant Total</Label>
            <Input
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Entrez le montant total"
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
