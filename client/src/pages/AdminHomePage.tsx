import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Save, Loader2 } from "lucide-react";

export default function AdminHomePage() {
  const { data: homeSettings = [], refetch } = trpc.home.getHomeSettings.useQuery();
  const updateMutation = trpc.home.updateHomeSection.useMutation({
    onSuccess: () => {
      toast.success("Configurações atualizadas com sucesso!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar: ${error.message}`);
    },
  });

  // Função auxiliar para pegar valor de um campo
  const getFieldValue = (section: string, field: string) => {
    const item = (homeSettings as any[]).find(
      (s: any) => s.section === section && s.field === field
    );
    return item?.value || "";
  };

  // Hero Section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");

  // About Section
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSubtitle, setAboutSubtitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [aboutSectionTitle, setAboutSectionTitle] = useState("");

  // Student Experience
  const [studentLabel, setStudentLabel] = useState("");
  const [studentTitle, setStudentTitle] = useState("");
  const [studentDescription, setStudentDescription] = useState("");

  // Ecosystem
  const [ecosystemTitle, setEcosystemTitle] = useState("");
  const [ecosystemDescription, setEcosystemDescription] = useState("");

  // Carregar dados quando disponíveis
  useState(() => {
    if (homeSettings.length > 0) {
      // Hero
      setHeroTitle(getFieldValue("hero", "title"));
      setHeroSubtitle(getFieldValue("hero", "subtitle"));
      setHeroCtaText(getFieldValue("hero", "cta_text"));
      setHeroCtaLink(getFieldValue("hero", "cta_link"));

      // About
      setAboutTitle(getFieldValue("about", "title"));
      setAboutSubtitle(getFieldValue("about", "subtitle"));
      setAboutDescription(getFieldValue("about", "description"));
      setAboutSectionTitle(getFieldValue("about", "section_title"));

      // Student Experience
      setStudentLabel(getFieldValue("student_experience", "label"));
      setStudentTitle(getFieldValue("student_experience", "title"));
      setStudentDescription(getFieldValue("student_experience", "description"));

      // Ecosystem
      setEcosystemTitle(getFieldValue("ecosystem", "title"));
      setEcosystemDescription(getFieldValue("ecosystem", "description"));
    }
  });

  const handleSaveHero = () => {
    updateMutation.mutate({
      section: "hero",
      fields: [
        { field: "title", value: heroTitle, sortOrder: 0 },
        { field: "subtitle", value: heroSubtitle, sortOrder: 1 },
        { field: "cta_text", value: heroCtaText, sortOrder: 2 },
        { field: "cta_link", value: heroCtaLink, sortOrder: 3 },
      ],
    });
  };

  const handleSaveAbout = () => {
    updateMutation.mutate({
      section: "about",
      fields: [
        { field: "title", value: aboutTitle, sortOrder: 0 },
        { field: "subtitle", value: aboutSubtitle, sortOrder: 1 },
        { field: "description", value: aboutDescription, sortOrder: 2 },
        { field: "section_title", value: aboutSectionTitle, sortOrder: 3 },
      ],
    });
  };

  const handleSaveStudentExperience = () => {
    updateMutation.mutate({
      section: "student_experience",
      fields: [
        { field: "label", value: studentLabel, sortOrder: 0 },
        { field: "title", value: studentTitle, sortOrder: 1 },
        { field: "description", value: studentDescription, sortOrder: 2 },
      ],
    });
  };

  const handleSaveEcosystem = () => {
    updateMutation.mutate({
      section: "ecosystem",
      fields: [
        { field: "title", value: ecosystemTitle, sortOrder: 0 },
        { field: "description", value: ecosystemDescription, sortOrder: 1 },
      ],
    });
  };

  const isLoading = updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edição da Home</h1>
            <p className="text-gray-600 mt-2">
              Configure todos os elementos da página inicial
            </p>
          </div>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">Diferenciais</TabsTrigger>
            <TabsTrigger value="student">Plataforma</TabsTrigger>
            <TabsTrigger value="ecosystem">Ecossistema</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Banner Principal (Hero)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Título</Label>
                  <Input
                    id="hero-title"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="Cresça no mercado educacional"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Input
                    id="hero-subtitle"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="com segurança, escala e a maior lucratividade do setor!"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-cta-text">Texto do Botão</Label>
                  <Input
                    id="hero-cta-text"
                    value={heroCtaText}
                    onChange={(e) => setHeroCtaText(e.target.value)}
                    placeholder="Quero ser Parceiro"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-cta-link">Link do Botão</Label>
                  <Input
                    id="hero-cta-link"
                    value={heroCtaLink}
                    onChange={(e) => setHeroCtaLink(e.target.value)}
                    placeholder="/seja-um-parceiro"
                  />
                </div>

                <Button
                  onClick={handleSaveHero}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Hero
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Seção de Diferenciais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">Título Principal</Label>
                  <Textarea
                    id="about-title"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    placeholder="Empresários Educacionais: transformem propósito em rentabilidade real..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="about-subtitle">Subtítulo</Label>
                  <Input
                    id="about-subtitle"
                    value={aboutSubtitle}
                    onChange={(e) => setAboutSubtitle(e.target.value)}
                    placeholder="Ser parceiro da LA Educação é sair do jogo pequeno."
                  />
                </div>

                <div>
                  <Label htmlFor="about-description">Descrição</Label>
                  <Textarea
                    id="about-description"
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    placeholder="Enquanto o mercado paga 30%..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="about-section-title">Título da Seção de Diferenciais</Label>
                  <Input
                    id="about-section-title"
                    value={aboutSectionTitle}
                    onChange={(e) => setAboutSectionTitle(e.target.value)}
                    placeholder="Conheça agora os diferenciais de Ser LA:"
                  />
                </div>

                <Button
                  onClick={handleSaveAbout}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Diferenciais
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Experience Section */}
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Plataforma para Alunos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="student-label">Label (Texto Pequeno)</Label>
                  <Input
                    id="student-label"
                    value={studentLabel}
                    onChange={(e) => setStudentLabel(e.target.value)}
                    placeholder="EXPERIÊNCIA DO ALUNO"
                  />
                </div>

                <div>
                  <Label htmlFor="student-title">Título</Label>
                  <Input
                    id="student-title"
                    value={studentTitle}
                    onChange={(e) => setStudentTitle(e.target.value)}
                    placeholder="Plataforma intuitiva e repleta de recursos"
                  />
                </div>

                <div>
                  <Label htmlFor="student-description">Descrição</Label>
                  <Textarea
                    id="student-description"
                    value={studentDescription}
                    onChange={(e) => setStudentDescription(e.target.value)}
                    placeholder="Seus alunos terão acesso a uma plataforma moderna..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSaveStudentExperience}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Plataforma
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ecosystem Section */}
          <TabsContent value="ecosystem">
            <Card>
              <CardHeader>
                <CardTitle>Ecossistema Educacional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ecosystem-title">Título</Label>
                  <Input
                    id="ecosystem-title"
                    value={ecosystemTitle}
                    onChange={(e) => setEcosystemTitle(e.target.value)}
                    placeholder="Por que somos o maior Ecossistema Educacional do Brasil?"
                  />
                </div>

                <div>
                  <Label htmlFor="ecosystem-description">Descrição</Label>
                  <Textarea
                    id="ecosystem-description"
                    value={ecosystemDescription}
                    onChange={(e) => setEcosystemDescription(e.target.value)}
                    placeholder="À disposição de nossos parceiros e alunos..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSaveEcosystem}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Ecossistema
                    </>
                  )}
                </Button>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Os logos e links do ecossistema são gerenciados na seção "Ecossistema" do menu lateral.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
