import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState("header");

  // Queries
  const { data: headerData = [], refetch: refetchHeader } = trpc.home.getHeader.useQuery();
  const { data: certifications = [], refetch: refetchCerts } = trpc.home.getCertifications.useQuery();
  const { data: press = [], refetch: refetchPress } = trpc.home.getPress.useQuery();
  const { data: aboutSettings = [], refetch: refetchAbout } = trpc.home.getHomeSection.useQuery({ section: "about" });
  const { data: studentSettings = [], refetch: refetchStudent } = trpc.home.getHomeSection.useQuery({ section: "student_experience" });
  const { data: ecosystemSettings = [], refetch: refetchEcosystem } = trpc.home.getHomeSection.useQuery({ section: "ecosystem" });

  // Mutations
  const updateHeader = trpc.home.updateHeader.useMutation();
  const updateHomeField = trpc.home.updateHomeField.useMutation();
  const addCert = trpc.home.addCertification.useMutation();
  const deleteCert = trpc.home.deleteCertification.useMutation();
  const addPressItem = trpc.home.addPress.useMutation();
  const deletePressItem = trpc.home.deletePress.useMutation();

  // Helper para pegar valor de campo
  const getFieldValue = (data: any[], field: string, defaultValue: string = "") => {
    const item = data.find((s: any) => s.field === field);
    return item?.value || defaultValue;
  };

  // Handler para salvar header
  const handleSaveHeader = async (field: string, value: string) => {
    try {
      await updateHeader.mutateAsync({ field, value });
      toast.success("Header atualizado!");
      refetchHeader();
    } catch (error) {
      toast.error("Erro ao atualizar header");
    }
  };

  // Handler para salvar campo de seção
  const handleSaveField = async (section: string, field: string, value: string, refetch: any) => {
    try {
      await updateHomeField.mutateAsync({ section, field, value });
      toast.success("Campo atualizado!");
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar campo");
    }
  };

  // Handler para adicionar selo
  const handleAddCert = async () => {
    const name = prompt("Nome do selo:");
    const imageUrl = prompt("URL da imagem:");
    if (name && imageUrl) {
      try {
        await addCert.mutateAsync({ name, imageUrl });
        toast.success("Selo adicionado!");
        refetchCerts();
      } catch (error) {
        toast.error("Erro ao adicionar selo");
      }
    }
  };

  // Handler para remover selo
  const handleDeleteCert = async (id: number) => {
    if (confirm("Deseja remover este selo?")) {
      try {
        await deleteCert.mutateAsync({ id });
        toast.success("Selo removido!");
        refetchCerts();
      } catch (error) {
        toast.error("Erro ao remover selo");
      }
    }
  };

  // Handler para adicionar imprensa
  const handleAddPress = async () => {
    const name = prompt("Nome da mídia:");
    const imageUrl = prompt("URL da imagem:");
    if (name && imageUrl) {
      try {
        await addPressItem.mutateAsync({ name, imageUrl });
        toast.success("Mídia adicionada!");
        refetchPress();
      } catch (error) {
        toast.error("Erro ao adicionar mídia");
      }
    }
  };

  // Handler para remover imprensa
  const handleDeletePress = async (id: number) => {
    if (confirm("Deseja remover esta mídia?")) {
      try {
        await deletePressItem.mutateAsync({ id });
        toast.success("Mídia removida!");
        refetchPress();
      } catch (error) {
        toast.error("Erro ao remover mídia");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edição da Home</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os blocos da página inicial</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="selos">Selos</TabsTrigger>
            <TabsTrigger value="imprensa">Imprensa</TabsTrigger>
            <TabsTrigger value="empresarios">Empresários</TabsTrigger>
            <TabsTrigger value="plataforma">Plataforma</TabsTrigger>
            <TabsTrigger value="ecossistema">Ecossistema</TabsTrigger>
            <TabsTrigger value="cursos">Cursos</TabsTrigger>
          </TabsList>

          {/* HEADER */}
          <TabsContent value="header">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Header</CardTitle>
                <CardDescription>Edite telefone, localização e logo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <div className="flex gap-2">
                    <Input
                      defaultValue={getFieldValue(headerData, "phone", "(44) 9944-9323")}
                      id="phone"
                    />
                    <Button onClick={() => {
                      const value = (document.getElementById("phone") as HTMLInputElement).value;
                      handleSaveHeader("phone", value);
                    }}>
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Localização</label>
                  <div className="flex gap-2">
                    <Input
                      defaultValue={getFieldValue(headerData, "location", "Maringá - PR")}
                      id="location"
                    />
                    <Button onClick={() => {
                      const value = (document.getElementById("location") as HTMLInputElement).value;
                      handleSaveHeader("location", value);
                    }}>
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HERO */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Banners Hero</CardTitle>
                <CardDescription>Os banners são gerenciados na seção "Banners" do menu</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => window.location.href = "/admin-la-educacao/banners"}>
                  Ir para Gerenciamento de Banners
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SELOS */}
          <TabsContent value="selos">
            <Card>
              <CardHeader>
                <CardTitle>Selos de Qualidade</CardTitle>
                <CardDescription>Adicione ou remova selos de certificação</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleAddCert} className="mb-4">
                  <Plus className="w-4 h-4 mr-2" /> Adicionar Selo
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {certifications.map((cert: any) => (
                    <div key={cert.id} className="border rounded-lg p-4 flex flex-col items-center">
                      <img src={cert.image_url} alt={cert.name} className="h-20 object-contain mb-2" />
                      <p className="text-sm font-medium text-center">{cert.name}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleDeleteCert(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPRENSA */}
          <TabsContent value="imprensa">
            <Card>
              <CardHeader>
                <CardTitle>Imprensa</CardTitle>
                <CardDescription>Adicione ou remova logos de mídia</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleAddPress} className="mb-4">
                  <Plus className="w-4 h-4 mr-2" /> Adicionar Mídia
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {press.map((item: any) => (
                    <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center">
                      <img src={item.image_url} alt={item.name} className="h-20 object-contain mb-2" />
                      <p className="text-sm font-medium text-center">{item.name}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleDeletePress(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EMPRESÁRIOS */}
          <TabsContent value="empresarios">
            <Card>
              <CardHeader>
                <CardTitle>Seção Empresários Educacionais</CardTitle>
                <CardDescription>Edite textos da seção de diferenciais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Textarea
                    defaultValue={getFieldValue(aboutSettings, "title", "Empresários Educacionais: transformem propósito em rentabilidade real")}
                    id="about-title"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtítulo</label>
                  <Textarea
                    defaultValue={getFieldValue(aboutSettings, "subtitle", "Ser parceiro da LA Educação é sair do jogo pequeno.")}
                    id="about-subtitle"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <Textarea
                    defaultValue={getFieldValue(aboutSettings, "description", "Enquanto o mercado paga 30%, aqui você constrói autoridade...")}
                    id="about-description"
                    rows={3}
                  />
                </div>

                <Button onClick={() => {
                  const title = (document.getElementById("about-title") as HTMLTextAreaElement).value;
                  const subtitle = (document.getElementById("about-subtitle") as HTMLTextAreaElement).value;
                  const description = (document.getElementById("about-description") as HTMLTextAreaElement).value;
                  
                  Promise.all([
                    handleSaveField("about", "title", title, refetchAbout),
                    handleSaveField("about", "subtitle", subtitle, refetchAbout),
                    handleSaveField("about", "description", description, refetchAbout),
                  ]);
                }}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PLATAFORMA */}
          <TabsContent value="plataforma">
            <Card>
              <CardHeader>
                <CardTitle>Seção Plataforma Intuitiva</CardTitle>
                <CardDescription>Edite textos da seção de experiência do aluno</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Label</label>
                  <Input
                    defaultValue={getFieldValue(studentSettings, "label", "EXPERIÊNCIA DO ALUNO")}
                    id="student-label"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Input
                    defaultValue={getFieldValue(studentSettings, "title", "Plataforma intuitiva e repleta de recursos")}
                    id="student-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <Textarea
                    defaultValue={getFieldValue(studentSettings, "description", "Seus alunos terão acesso a uma plataforma moderna...")}
                    id="student-description"
                    rows={3}
                  />
                </div>

                <Button onClick={() => {
                  const label = (document.getElementById("student-label") as HTMLInputElement).value;
                  const title = (document.getElementById("student-title") as HTMLInputElement).value;
                  const description = (document.getElementById("student-description") as HTMLTextAreaElement).value;
                  
                  Promise.all([
                    handleSaveField("student_experience", "label", label, refetchStudent),
                    handleSaveField("student_experience", "title", title, refetchStudent),
                    handleSaveField("student_experience", "description", description, refetchStudent),
                  ]);
                }}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ECOSSISTEMA */}
          <TabsContent value="ecossistema">
            <Card>
              <CardHeader>
                <CardTitle>Seção Ecossistema</CardTitle>
                <CardDescription>Edite textos da seção de ecossistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Input
                    defaultValue={getFieldValue(ecosystemSettings, "title", "Por que somos o maior Ecossistema Educacional do Brasil?")}
                    id="ecosystem-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <Textarea
                    defaultValue={getFieldValue(ecosystemSettings, "description", "À disposição de nossos parceiros e alunos...")}
                    id="ecosystem-description"
                    rows={3}
                  />
                </div>

                <Button onClick={() => {
                  const title = (document.getElementById("ecosystem-title") as HTMLInputElement).value;
                  const description = (document.getElementById("ecosystem-description") as HTMLTextAreaElement).value;
                  
                  Promise.all([
                    handleSaveField("ecosystem", "title", title, refetchEcosystem),
                    handleSaveField("ecosystem", "description", description, refetchEcosystem),
                  ]);
                }}>
                  Salvar Alterações
                </Button>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Para gerenciar as instituições do ecossistema, acesse:
                  </p>
                  <Button onClick={() => window.location.href = "/admin-la-educacao/ecossistema"}>
                    Gerenciar Instituições
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CURSOS */}
          <TabsContent value="cursos">
            <Card>
              <CardHeader>
                <CardTitle>Cursos em Destaque</CardTitle>
                <CardDescription>Escolha quais cursos aparecem na home (máximo 4)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Funcionalidade em desenvolvimento. Em breve você poderá selecionar os cursos diretamente aqui.
                </p>
                <Button onClick={() => window.location.href = "/admin-la-educacao/cursos"}>
                  Gerenciar Cursos
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
