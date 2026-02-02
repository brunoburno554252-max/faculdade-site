import AdminLayout from "@/components/AdminLayout";
import CanvasEditor from "@/components/CanvasEditor";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminEcosystemPage() {
  const [, setLocation] = useLocation();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ecossistema - Editor Visual</h1>
            <p className="text-gray-600 mt-2">
              Configure a posição dos botões de acesso ao ecossistema da LA Educação
            </p>
          </div>
          <Button
            onClick={() => setLocation("/admin-la-educacao/ecossistema/editor")}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            🖼️ Abrir Editor em Tela Cheia
          </Button>
        </div>

        {/* Editor Canvas */}
        <CanvasEditor />
      </div>
    </AdminLayout>
  );
}
