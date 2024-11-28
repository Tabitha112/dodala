import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewPecheur() {
  const [name, setName] = useState('');
  const [prenoms, setPrenoms] = useState(''); // Nouveau champ pour le prénom
  const [sexe, setSexe] = useState(''); // Nouveau champ pour le sexe
  const [dateNaissance, setDateNaissance] = useState(''); // Nouveau champ pour la date de naissance
  const [lieuNaissance, setLieuNaissance] = useState(''); // Nouveau champ pour le lieu de naissance
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [groupementId, setGroupementId] = useState(''); // ID du groupement sélectionné
  const [selectedGroupement, setSelectedGroupement] = useState(''); // Variable nouvellement ajoutée
  const [groupements, setGroupements] = useState([]); // Liste des groupements à afficher dans le select
  const navigate = useNavigate();

  // Chargement des groupements depuis l'API
  useEffect(() => {
    const fetchGroupements = async () => {
      const response = await fetch('/api/groupements');
      const data = await response.json();
      setGroupements(data); // Met à jour la liste des groupements
    };

    fetchGroupements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/pecheurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: name,
        prenoms: prenoms,
        sexe: sexe,
        date_naissance: dateNaissance,
        lieu_naissance: lieuNaissance,
        adresse_geographique: address,
        n_tel: phone,
        id_groupement: selectedGroupement, // Utilisation de la nouvelle variable selectedGroupement
      }),
    });

    if (response.ok) {
      navigate('/dashboard/pecheurs');
    } else {
      console.error('Échec de la création du pêcheur');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouveau Pêcheur</legend>

          {/* Nom Field */}
          <div className="grid gap-3">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom du pêcheur"
              required
            />
          </div>

          {/* Prénoms Field */}
          <div className="grid gap-3">
            <Label htmlFor="prenoms">Prénoms</Label>
            <Input
              id="prenoms"
              value={prenoms}
              onChange={(e) => setPrenoms(e.target.value)}
              placeholder="Entrez les prénoms du pêcheur"
              required
            />
          </div>

          {/* Sexe Field */}
          <div className="grid gap-3">
            <Label htmlFor="sexe">Sexe</Label>
            <Input
              id="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              placeholder="Entrez le sexe du pêcheur"
              required
            />
          </div>

          {/* Date de Naissance Field */}
          <div className="grid gap-3">
            <Label htmlFor="dateNaissance">Date de Naissance</Label>
            <Input
              id="dateNaissance"
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              placeholder="Entrez la date de naissance du pêcheur"
              required
            />
          </div>

          {/* Lieu de Naissance Field */}
          <div className="grid gap-3">
            <Label htmlFor="lieuNaissance">Lieu de Naissance</Label>
            <Input
              id="lieuNaissance"
              value={lieuNaissance}
              onChange={(e) => setLieuNaissance(e.target.value)}
              placeholder="Entrez le lieu de naissance du pêcheur"
              required
            />
          </div>

          {/* Adresse Field */}
          <div className="grid gap-3">
            <Label htmlFor="address">Adresse Géographique</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Entrez l'adresse géographique du pêcheur"
              required
            />
          </div>

          {/* Téléphone Field */}
          <div className="grid gap-3">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Entrez le numéro de téléphone du pêcheur"
              required
            />
          </div>

          {/* Sélection de Groupement */}
          <div className="grid gap-3">
            <Label htmlFor="groupement-select">Sélectionnez un Groupement</Label>
            <select
              id="groupement-select"
              value={selectedGroupement} // Utilisation de selectedGroupement
              onChange={(e) => setSelectedGroupement(e.target.value)} // Mise à jour de selectedGroupement
              required
            >
              <option value="">Sélectionnez un groupement</option>
              {groupements.map((groupement) => (
                <option key={groupement.id_groupement} value={groupement.id_groupement}>
                  {groupement.nom} {/* Affiche le nom du groupement */}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Submit Button */}
        <Button type="submit">Créer</Button>
      </form>
    </div>
  );
}
