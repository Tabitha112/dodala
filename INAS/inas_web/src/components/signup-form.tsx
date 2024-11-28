import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apiBaseUrl } from '@/utils/apibaseurl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

// Configurer l'URL de base de votre API
axios.defaults.baseURL = "${apiBaseUrl}";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Par défaut, le rôle est "user"
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
        role,
      });

      // Gérer la réponse de l'API
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Rediriger après une inscription réussie
      navigate("/dashboard");
    } catch (err) {
      setError("Échec de l'inscription. Veuillez vérifier les informations fournies.");
      console.log(err);
      
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Inscription</CardTitle>
        <CardDescription>
          Créez un compte pour accéder à votre espace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="grid gap-4">
          
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre_email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Rôle</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border rounded px-3 py-2"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
         
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <Link to="/login" className="underline">
            Connectez-vous
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
