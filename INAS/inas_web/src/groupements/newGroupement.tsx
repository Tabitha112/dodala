import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utiliser useNavigate de react-router-dom
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewGroupement() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState(''); // Renommé en address pour correspondre à la fonction
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Appel API sans logo
    const response = await fetch('/api/groupements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: name, // Correspond à la clé utilisée dans la fonction createGroupement
        adresse_geographique: address, // Correspond à la clé utilisée dans la fonction createGroupement
      }),
    });

    if (response.ok) {
      navigate('/dashboard/groupements'); // Redirection après création
    } else {
      console.error('Échec de la création du groupement');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouveau Groupement</legend>

          {/* Nom Field */}
          <div className="grid gap-3">
            <Label htmlFor="name">Nom du groupement</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom du groupement"
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
              placeholder="Entrez l'adresse géographique du groupement"
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
