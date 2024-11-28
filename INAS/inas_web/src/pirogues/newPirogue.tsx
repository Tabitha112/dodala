import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { apiBaseUrl } from '@/utils/apibaseurl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewPirogue() {
  const [name, setName] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [volume, setVolume] = useState('');
  const [price, setPrice] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [type, setType] = useState('');
  const [groupements, setGroupements] = useState([]);
  const [selectedGroupement, setSelectedGroupement] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupements = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groupements`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des groupements');
        }
        const data = await response.json();
        setGroupements(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchGroupements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${apiBaseUrl}/api/pirogues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: name,
        longueur: length,
        largeur: width,
        hauteur: height,
        volume: volume,
        prix_pirogue: price,
        date_acquisition: acquisitionDate,
        type: type,
        id_groupement: selectedGroupement
      }),
    });

    if (response.ok) {
      navigate('/dashboard/pirogues');
    } else {
      console.error('Échec de la création de la pirogue');
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Nouvelle Pirogue</legend>

          {/* Nom Field */}
          <div className="grid gap-3">
            <Label htmlFor="name">Nom de la pirogue</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom de la pirogue"
              required
            />
          </div>

          {/* Longueur Field */}
          <div className="grid gap-3">
            <Label htmlFor="length">Longueur de la pirogue</Label>
            <Input
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Entrez la longueur de la pirogue"
              required
            />
          </div>

          {/* Largeur Field */}
          <div className="grid gap-3">
            <Label htmlFor="width">Largeur de la pirogue</Label>
            <Input
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Entrez la largeur de la pirogue"
              required
            />
          </div>

          {/* Hauteur Field */}
          <div className="grid gap-3">
            <Label htmlFor="height">Hauteur de la pirogue</Label>
            <Input
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Entrez la hauteur de la pirogue"
              required
            />
          </div>

          {/* Volume Field */}
          <div className="grid gap-3">
            <Label htmlFor="volume">Volume de la pirogue</Label>
            <Input
              id="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Entrez le volume de la pirogue"
              required
            />
          </div>

          {/* Prix Field */}
          <div className="grid gap-3">
            <Label htmlFor="price">Prix de la pirogue</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Entrez le prix de la pirogue"
              required
            />
          </div>

          {/* Date d'acquisition Field */}
          <div className="grid gap-3">
            <Label htmlFor="acquisitionDate">Date d'acquisition</Label>
            <Input
              id="acquisitionDate"
              type="date"
              value={acquisitionDate}
              onChange={(e) => setAcquisitionDate(e.target.value)}
              placeholder="Entrez la date d'acquisition"
              required
            />
          </div>

          {/* Type Field */}
          <div className="grid gap-3">
            <Label htmlFor="type">Type de Pirogue</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Entrez le type de la pirogue (moteur ou pagaie)"
              required
            />
          </div>

          {/* Groupement Select */}
          <div className="grid gap-3">
            <Label htmlFor="groupement">Groupement</Label>
            <Select onValueChange={setSelectedGroupement} value={selectedGroupement}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un groupement" />
              </SelectTrigger>
              <SelectContent>
                {groupements.map((groupement) => (
                  <SelectItem key={groupement.id_groupement} value={groupement.id_groupement.toString()}>
                    {groupement.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </fieldset>

        {/* Submit Button */}
        <Button type="submit">Créer</Button>
      </form>
    </div>
  );
}