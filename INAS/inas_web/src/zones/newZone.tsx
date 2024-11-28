import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utiliser useNavigate de react-router-dom
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewZone() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Champ pour la description de la zone
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/zones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: name, // Clé utilisée pour le nom de la zone dans l'API
        description: description, // Clé pour la description de la zone
      }),
    });

    if (response.ok) {
      navigate('/dashboard/zones'); // Redirection après création de la zone
    } else {
      console.error('Échec de la création de la zone');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouvelle Zone</legend>

          {/* Nom Field */}
          <div className="grid gap-3">
            <Label htmlFor="name">Nom de la zone</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom de la zone"
              required
            />
          </div>

          {/* Description Field */}
          <div className="grid gap-3">
            <Label htmlFor="description">Description de la zone</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description de la zone"
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
