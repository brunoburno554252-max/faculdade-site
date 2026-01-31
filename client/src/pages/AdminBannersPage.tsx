import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function AdminBannersPage() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const { data: banners = [], refetch } = trpc.adminBanners.getAll.useQuery();
  const deleteMutation = trpc.adminBanners.delete.useMutation({
    onSuccess: () => {
      toast.success("Banner excluído com sucesso!");
      refetch();
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir banner: ${error.message}`);
    },
  });

  const reorderMutation = trpc.adminBanners.reorder.useMutation({
    onSuccess: () => {
      toast.success("Ordem atualizada!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Erro ao reordenar: ${error.message}`);
    },
  });

  const handleMoveUp = (id: number, currentOrder: number) => {
    if (currentOrder > 1) {
      reorderMutation.mutate({ id, newOrder: currentOrder - 1 });
    }
  };

  const handleMoveDown = (id: number, currentOrder: number, maxOrder: number) => {
    if (currentOrder < maxOrder) {
      reorderMutation.mutate({ id, newOrder: currentOrder + 1 });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate({ id: deleteId });
    }
  };

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order);
  const maxOrder = Math.max(...banners.map(b => b.order), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Banners</h1>
            <p className="text-gray-600 mt-1">Gerencie os banners do hero slider da homepage</p>
          </div>
          <Button className="gap-2" onClick={() => setLocation("/admin-la-educacao/banners/novo")}>
            <Plus className="w-4 h-4" />
            Novo Banner
          </Button>
        </div>

        {banners.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Nenhum banner cadastrado. Clique em "Novo Banner" para adicionar.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Lista de Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={banner.image || "/placeholder.jpg"}
                      alt={banner.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{banner.title}</h3>
                      <p className="text-sm text-gray-600">{banner.subtitle}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs text-gray-500">Ordem: {banner.order}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            banner.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {banner.isActive ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={index === 0}
                          onClick={() => handleMoveUp(banner.id, banner.order)}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={index === sortedBanners.length - 1}
                          onClick={() => handleMoveDown(banner.id, banner.order, maxOrder)}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setLocation(`/admin-la-educacao/banners/${banner.id}`)}
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 hover:text-red-700"
                          onClick={() => setDeleteId(banner.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {deleteId !== null && (
        <DeleteConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={handleDelete}
          title="Excluir Banner"
          description="Tem certeza que deseja excluir este banner? Esta ação não pode ser desfeita."
        />
      )}
    </AdminLayout>
  );
}
