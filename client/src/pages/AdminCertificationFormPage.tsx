import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import ImageUpload from "@/components/ImageUpload";

export default function AdminCertificationFormPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin-la-educacao/certificacoes/:id");
  const isEditing = params?.id && params.id !== "novo";
  
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const createMutation = trpc.adminCertifications.create.useMutation({
    onSuccess: () => {
      toast.success("Certificação criada com sucesso!");
      setLocation("/admin-la-educacao/certificacoes");
    },
    onError: (error) => {
      toast.error(`Erro ao criar certificação: ${error.message}`);
    },
  });

  const updateMutation = trpc.adminCertifications.update.useMutation({
    onSuccess: () => {
      toast.success("Certificação atualizada com sucesso!");
      setLocation("/admin-la-educacao/certificacoes");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar certificação: ${error.message}`);
    },
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!imageUrl) {
      toast.error("Imagem é obrigatória");
      return;
    }

    if (isEditing) {
      updateMutation.mutate({
        id: parseInt(params?.id || "0"),
        name,

        image: imageUrl,
        isActive,
      });
    } else {
      createMutation.mutate({
        name,
        image: imageUrl,
        isActive,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/admin-la-educacao/certificacoes")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Editar Certificação" : "Nova Certificação"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Certificação *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: MEC, ABED, ISO 9001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem da Certificação *</Label>
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              onRemove={() => setImageUrl("")}
              aspectRatio={1}
            />
            <p className="text-sm text-gray-500">
              Recomendado: imagem quadrada (ex: 200x200px) em formato PNG com fundo transparente
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked as boolean)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Certificação ativa (visível no site)
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEditing ? "Atualizar Certificação" : "Criar Certificação"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/admin-la-educacao/certificacoes")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
