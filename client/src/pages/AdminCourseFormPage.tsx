import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ImageUpload";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function AdminCourseFormPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const courseId = params.id ? parseInt(params.id) : null;
  const isEditing = courseId !== null;

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    slug: "",
    category: "Graduação",
    type: "Graduação",
    description: "",
    objectives: "",
    syllabus: "",
    jobMarket: "",
    requirements: "",
    technicalRequirements: "",
    duration: "",
    modality: "EAD",
    image: "",
    isActive: true,
  });

  const { data: courseData } = trpc.adminCourses.getById.useQuery(
    { id: courseId! },
    { enabled: isEditing }
  );

  const { data: categories } = trpc.adminCategories.getAll.useQuery();
  const { data: types } = trpc.adminTypes.getAll.useQuery();

  // Carregar dados do curso quando estiver editando
  useEffect(() => {
    if (courseData) {
      setFormData({
        name: courseData.name || courseData.title,
        title: courseData.title,
        slug: courseData.slug,
        category: courseData.category,
        type: courseData.type || "Graduação",
        description: courseData.description,
        objectives: courseData.objectives || "",
        syllabus: courseData.syllabus || "",
        jobMarket: courseData.jobMarket || "",
        requirements: courseData.requirements || "",
        technicalRequirements: courseData.technicalRequirements || "",
        duration: courseData.duration,
        modality: courseData.modality,
        image: courseData.image || "",
        isActive: courseData.isActive,
      });
    }
  }, [courseData]);

  const createMutation = trpc.adminCourses.create.useMutation();
  const updateMutation = trpc.adminCourses.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: courseId, ...formData });
        toast.success("Curso atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Curso criado com sucesso!");
      }
      setLocation("/admin-la-educacao/cursos");
    } catch (error) {
      toast.error("Erro ao salvar curso");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/admin-la-educacao/cursos")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Editar Curso" : "Novo Curso"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Curso *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({ ...formData, name, title: name, slug: generateSlug(name) });
              }}
              placeholder="Ex: Engenharia de Software"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">
              URL amigável: /cursos/{formData.slug}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories?.filter(c => c.isActive).map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types?.filter(t => t.isActive).map((type) => (
                    <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modality">Modalidade *</Label>
              <Select
                value={formData.modality}
                onValueChange={(value) => setFormData({ ...formData, modality: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EAD">EAD</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Híbrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ex: 4 anos, 18 meses, 360 horas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Curso *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Apresentação geral do curso"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Objetivos do Curso</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              rows={4}
              placeholder="Objetivos e competências desenvolvidas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="syllabus">Ementa do Curso</Label>
            <Textarea
              id="syllabus"
              value={formData.syllabus}
              onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
              rows={5}
              placeholder="Conteúdo programático detalhado do curso"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobMarket">Mercado de Trabalho</Label>
            <Textarea
              id="jobMarket"
              value={formData.jobMarket}
              onChange={(e) => setFormData({ ...formData, jobMarket: e.target.value })}
              rows={4}
              placeholder="Áreas de atuação e oportunidades profissionais"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos para Matrícula</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              rows={3}
              placeholder="Requisitos acadêmicos necessários (escolaridade, conhecimentos prévios)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technicalRequirements">Requisitos Técnicos</Label>
            <Textarea
              id="technicalRequirements"
              value={formData.technicalRequirements}
              onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
              rows={3}
              placeholder="PC, internet, software, disponibilidade de tempo, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem do Curso</Label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              onRemove={() => setFormData({ ...formData, image: "" })}
              aspectRatio={16 / 9}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="isActive">Curso ativo (visível no site)</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending
                ? "Salvando..."
                : isEditing
                ? "Atualizar Curso"
                : "Criar Curso"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/admin-la-educacao/cursos")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
