import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (mode: "in" | "up") => {
    setLoading(true);
    const res = mode === "in" ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(mode === "in" ? "Welcome back!" : "Account created!");
    navigate("/lessons");
  };

  return (
    <Layout>
      <div className="container py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Learn TS Right</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              {(["signin", "signup"] as const).map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-email`}>Email</Label>
                    <Input id={`${tab}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-password`}>Password</Label>
                    <Input id={`${tab}-password`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                  </div>
                  <Button
                    className="w-full"
                    disabled={loading || !email || !password}
                    onClick={() => handle(tab === "signin" ? "in" : "up")}
                  >
                    {loading ? "Please wait…" : tab === "signin" ? "Sign In" : "Create Account"}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
