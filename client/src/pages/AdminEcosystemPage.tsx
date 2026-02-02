import AdminLayout from "@/components/AdminLayout";
import CanvasEditor from "@/components/CanvasEditor";

export default function AdminEcosystemPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ecossistema - Editor Visual</h1>
          <p className="text-gray-600 mt-2">
            Configure a posição dos botões de acesso ao ecossistema da LA Educação
          </p>
        </div>

        {/* Editor Canvas */}
        <CanvasEditor />
      </div>
    </AdminLayout>
  );
}
