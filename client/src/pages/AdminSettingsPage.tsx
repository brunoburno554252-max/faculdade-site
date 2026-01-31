import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function AdminSettingsPage() {
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [businessHours, setBusinessHours] = useState("");

  const { data: settings, isLoading, refetch } = trpc.adminSettings.getAll.useQuery();
  const upsertMutation = trpc.adminSettings.upsert.useMutation({
    onSuccess: () => {
      toast.success("Configurações salvas com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro ao salvar configurações: ${error.message}`);
    },
  });

  useEffect(() => {
    if (settings) {
      const settingsMap = Object.fromEntries(
        settings.map((s: any) => [s.key, s.value])
      );
      
      setPhone(settingsMap.phone || "");
      setLocation(settingsMap.location || "");
      setEmail(settingsMap.email || "");
      setAddress(settingsMap.address || "");
      setWhatsapp(settingsMap.whatsapp || "");
      setFacebook(settingsMap.facebook || "");
      setInstagram(settingsMap.instagram || "");
      setLinkedin(settingsMap.linkedin || "");
      setYoutube(settingsMap.youtube || "");
      setTwitter(settingsMap.twitter || "");
      setInstitutionName(settingsMap.institutionName || "");
      setSlogan(settingsMap.slogan || "");
      setDescription(settingsMap.description || "");
      setBusinessHours(settingsMap.businessHours || "");
    }
  }, [settings]);

  const handleSave = async () => {
    const settingsToSave = [
      { key: "phone", value: phone, description: "Telefone de contato" },
      { key: "location", value: location, description: "Localização" },
      { key: "email", value: email, description: "Email de contato" },
      { key: "address", value: address, description: "Endereço completo" },
      { key: "whatsapp", value: whatsapp, description: "WhatsApp" },
      { key: "facebook", value: facebook, description: "Facebook URL" },
      { key: "instagram", value: instagram, description: "Instagram URL" },
      { key: "linkedin", value: linkedin, description: "LinkedIn URL" },
      { key: "youtube", value: youtube, description: "YouTube URL" },
      { key: "twitter", value: twitter, description: "Twitter URL" },
      { key: "institutionName", value: institutionName, description: "Nome da instituição" },
      { key: "slogan", value: slogan, description: "Slogan" },
      { key: "description", value: description, description: "Descrição institucional" },
      { key: "businessHours", value: businessHours, description: "Horário de atendimento" },
    ];

    for (const setting of settingsToSave) {
      await upsertMutation.mutateAsync(setting);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Carregando configurações...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações Gerais</h1>
          <p className="text-gray-600 mt-1">Gerencie as configurações gerais do site</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Institucionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institutionName">Nome da Instituição</Label>
                <Input
                  id="institutionName"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="LA Educação"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slogan">Slogan</Label>
                <Input
                  id="slogan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="Revolucionando a educação à distância"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição institucional..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(44) 9944-9323"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(44) 99999-9999"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contato</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@laeducacao.com.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Maringá - PR"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Exemplo, 123 - Centro, Maringá - PR"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessHours">Horário de Atendimento</Label>
                <Input
                  id="businessHours"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  placeholder="Segunda a Sexta: 8h às 18h"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/laeducacao"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/laeducacao"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/company/laeducacao"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/@laeducacao"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://twitter.com/laeducacao"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              size="lg"
              disabled={upsertMutation.isPending}
            >
              {upsertMutation.isPending ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
