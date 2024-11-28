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

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // Gérer la réponse de l'API
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Rediriger après une connexion réussie
      navigate("/dashboard");
    } catch (err) {
      setError("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Entrez vos informations ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          
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
         
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">
            Connexion
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n'avez pas de compte?{" "}
          <Link to="/signup" className="underline">
            Inscrivez-vous
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
