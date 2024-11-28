import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NewFilet() {
  const [name, setName] = useState(''); // Nouveau champ pour le nom du filet
  const [meshSize, setMeshSize] = useState(''); // Taille de la maille
  const [volume, setVolume] = useState(''); // Volume du filet
  const [pirogueId, setPirogueId] = useState(''); // ID de la pirogue à laquelle le filet est associé

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/filets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: name, // Clé pour le nom du filet
        grosseur_maille: meshSize, // Clé pour la grosseur de la maille
        volume: volume, // Clé pour le volume
        id_pirogue: pirogueId, // Clé pour l'ID de la pirogue
      }),
    });

    if (response.ok) {
      navigate('/dashboard/filets'); // Redirection après création du filet
    } else {
      console.error('Échec de la création du filet');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouveau Filet</legend>

          {/* Nom Field */}
          <div className="grid gap-3">
            <Label htmlFor="name">Nom du filet</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom du filet"
              required
            />
          </div>

          {/* Taille de la maille Field */}
          <div className="grid gap-3">
            <Label htmlFor="meshSize">Taille de la maille</Label>
            <Input
              id="meshSize"
              value={meshSize}
              onChange={(e) => setMeshSize(e.target.value)}
              placeholder="Entrez la taille de la maille"
              required
            />
          </div>

          {/* Volume Field */}
          <div className="grid gap-3">
            <Label htmlFor="volume">Volume du filet</Label>
            <Input
              id="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Entrez le volume du filet"
              required
            />
          </div>

          {/* ID de la pirogue Field */}
          <div className="grid gap-3">
            <Label htmlFor="pirogueId">ID de la pirogue</Label>
            <Input
              id="pirogueId"
              value={pirogueId}
              onChange={(e) => setPirogueId(e.target.value)}
              placeholder="Entrez l'ID de la pirogue"
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
