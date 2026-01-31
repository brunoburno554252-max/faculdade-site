import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowLeft, Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import CurriculumPDFImport from "@/components/CurriculumPDFImport";

export default function AdminCurriculumPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const courseId = parseInt(params.id!);

  const { data: course } = trpc.adminCourses.getById.useQuery({ id: courseId });
  const { data: curriculum, refetch } = trpc.adminCurriculum.getByCourseId.useQuery({ courseId });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [formData, setFormData] = useState({
    subjectName: "",
    workload: 0,
    semester: 1,
  });

  const createMutation = trpc.adminCurriculum.create.useMutation();
  const updateMutation = trpc.adminCurriculum.update.useMutation();
  const deleteMutation = trpc.adminCurriculum.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSubject) {
        await updateMutation.mutateAsync({
          id: editingSubject.id,
          subjectName: formData.subjectName,
          workload: formData.workload,
          semester: formData.semester,
        });
        toast.success("Disciplina atualizada com sucesso!");
      } else {
        await createMutation.mutateAsync({
          courseId,
          subjectName: formData.subjectName,
          workload: formData.workload,
          semester: formData.semester,
        });
        toast.success("Disciplina adicionada com sucesso!");
      }
      
      setIsDialogOpen(false);
      setEditingSubject(null);
      setFormData({ subjectName: "", workload: 0, semester: 1 });
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar disciplina");
    }
  };

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setFormData({
      subjectName: subject.subjectName,
      workload: subject.workload,
      semester: subject.semester,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir a disciplina "${name}"?`)) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Disciplina excluída com sucesso!");
      refetch();
    } catch (error) {
      toast.error("Erro ao excluir disciplina");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingSubject(null);
      setFormData({ subjectName: "", workload: 0, semester: 1 });
  };

  // Organizar disciplinas por semestre
  const subjectsBySemester = curriculum?.reduce((acc: any, subject: any) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {}) || {};

  const semesters = Object.keys(subjectsBySemester).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/admin-la-educacao/cursos")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grade Curricular</h1>
            <p className="text-gray-600 mt-1">
              {course?.title} - Gerenciar disciplinas e semestres
            </p>
          </div>
          
          <div className="flex gap-3">
            <CurriculumPDFImport courseId={courseId} onSuccess={() => refetch()} />
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={() => handleDialogClose()}>
                  <Plus className="w-4 h-4" />
                  Nova Disciplina
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingSubject ? "Editar Disciplina" : "Nova Disciplina"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="subjectName">Nome da Disciplina</Label>
                  <Input
                    id="subjectName"
                    value={formData.subjectName}
                    onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                    placeholder="Ex: Algoritmos e Programação"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="workload">Carga Horária (horas)</Label>
                  <Input
                    id="workload"
                    type="number"
                    min="1"
                    value={formData.workload}
                    onChange={(e) => setFormData({ ...formData, workload: parseInt(e.target.value) || 0 })}
                    placeholder="Ex: 80"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Semestre</Label>
                  <Input
                    id="semester"
                    type="number"
                    min="1"
                    max="12"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingSubject ? "Atualizar" : "Adicionar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {semesters.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Nenhuma disciplina cadastrada.</p>
                <p className="text-sm mt-1">Clique em "Nova Disciplina" para começar.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {semesters.map((semester) => (
              <Card key={semester}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {semester}º Semestre
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subjectsBySemester[semester].map((subject: any) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{subject.subjectName}</h3>
                          <p className="text-sm text-gray-600">{subject.workload}h</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleEdit(subject)}
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(subject.id, subject.subjectName)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
