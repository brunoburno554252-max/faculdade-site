import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Eye, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminOmbudsmanPage() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const { data: messages, refetch } = trpc.adminOmbudsman.getAll.useQuery();

  const updateMutation = trpc.adminOmbudsman.update.useMutation({
    onSuccess: () => {
      toast.success("Mensagem atualizada com sucesso!");
      refetch();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar: " + error.message);
    },
  });

  const deleteMutation = trpc.adminOmbudsman.delete.useMutation({
    onSuccess: () => {
      toast.success("Mensagem excluída com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao excluir: " + error.message);
    },
  });

  const handleView = (message: any) => {
    setSelectedMessage(message);
    setStatus(message.status);
    setResponse(message.response || "");
    setNotes(message.notes || "");
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedMessage) return;

    updateMutation.mutate({
      id: selectedMessage.id,
      status: status as any,
      response,
      notes,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
      deleteMutation.mutate({ id });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800" },
      in_review: { label: "Em Análise", className: "bg-blue-100 text-blue-800" },
      resolved: { label: "Resolvido", className: "bg-green-100 text-green-800" },
      closed: { label: "Fechado", className: "bg-gray-100 text-gray-800" },
    };

    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ouvidoria</h1>
            <p className="text-gray-600 mt-1">Gerencie mensagens e reclamações recebidas</p>
          </div>
        </div>

        <div className="grid gap-4">
          {messages?.map((message: any) => (
            <Card key={message.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span>{message.name}</span>
                      <span>•</span>
                      <span>{message.email}</span>
                      {message.phone && (
                        <>
                          <span>•</span>
                          <span>{message.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(message.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{message.message}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  <span>Recebido em {new Date(message.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(message)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(message.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {messages?.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma mensagem recebida ainda</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Mensagem</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Assunto</h3>
                  <p>{selectedMessage.subject}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Mensagem</h3>
                  <p className="text-gray-700">{selectedMessage.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Nome</h3>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p>{selectedMessage.email}</p>
                  </div>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p>{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in_review">Em Análise</SelectItem>
                      <SelectItem value="resolved">Resolvido</SelectItem>
                      <SelectItem value="closed">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resposta</label>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Digite a resposta para o solicitante..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notas Internas</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notas internas (não visíveis para o solicitante)..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
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
