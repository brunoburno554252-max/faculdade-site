import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const statusLabels = {
  pending: "Pendente",
  in_review: "Em Análise",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminPartnersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const { data: requests, refetch } = trpc.adminPartners.getAll.useQuery();

  const updateMutation = trpc.adminPartners.update.useMutation({
    onSuccess: () => {
      toast.success("Solicitação atualizada!");
      refetch();
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const deleteMutation = trpc.adminPartners.delete.useMutation({
    onSuccess: () => {
      toast.success("Solicitação excluída!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const openDialog = (request: any) => {
    setSelectedRequest(request);
    setStatus(request.status);
    setNotes(request.notes || "");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
    setStatus("");
    setNotes("");
  };

  const handleUpdate = () => {
    if (!selectedRequest) return;
    updateMutation.mutate({
      id: selectedRequest.id,
      status: status as any,
      notes,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta solicitação?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Solicitações de Parceria</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todas as Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests?.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{request.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[request.status as keyof typeof statusColors]
                        }`}
                      >
                        {statusLabels[request.status as keyof typeof statusLabels]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {request.email}
                    </p>
                    {request.phone && (
                      <p className="text-sm text-gray-600">
                        <strong>Telefone:</strong> {request.phone}
                      </p>
                    )}
                    {request.company && (
                      <p className="text-sm text-gray-600">
                        <strong>Empresa:</strong> {request.company}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>Mensagem:</strong> {request.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Recebido em: {new Date(request.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(request)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(request.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {requests?.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Nenhuma solicitação de parceria ainda.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gerenciar Solicitação</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedRequest.name}</h3>
                  <p className="text-sm text-gray-600">{selectedRequest.email}</p>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in_review">Em Análise</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Notas Internas</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Adicione notas sobre esta solicitação..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={closeDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleUpdate}>
                    Salvar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
