import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function AdminCertificationsPage() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const { data: certifications, isLoading, refetch } = trpc.adminCertifications.getAll.useQuery();
  const deleteMutation = trpc.adminCertifications.delete.useMutation({
    onSuccess: () => {
      toast.success("Certificação excluída com sucesso!");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(`Erro ao excluir certificação: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate({ id: deleteId });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Carregando certificações...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Certificações</h1>
            <p className="text-gray-600 mt-1">Gerencie os selos de certificação exibidos no site</p>
          </div>
          <Button className="gap-2" onClick={() => setLocation("/admin-la-educacao/certificacoes/novo")}>
            <Plus className="w-4 h-4" />
            Nova Certificação
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Certificações</CardTitle>
          </CardHeader>
          <CardContent>
            {!certifications || certifications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Nenhuma certificação cadastrada. Clique em "Nova Certificação" para adicionar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert: any) => (
                  <div
                    key={cert.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.name}
                      className="w-24 h-24 object-contain mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                    {cert.description && (
                      <p className="text-sm text-gray-600 text-center mb-4">{cert.description}</p>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs mb-4 ${
                        cert.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cert.isActive ? "Ativo" : "Inativo"}
                    </span>
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => setLocation(`/admin-la-educacao/certificacoes/${cert.id}`)}
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 text-red-600 hover:text-red-700"
                        onClick={() => setDeleteId(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir Certificação"
        description="Tem certeza que deseja excluir esta certificação? Esta ação não pode ser desfeita."
      />
    </AdminLayout>
  );
}
