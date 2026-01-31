import { Request, Response, NextFunction } from "express";

/**
 * Middleware para detectar acesso via subdomínio admin.l.a.edutracker.online
 * e redirecionar automaticamente para o painel administrativo
 */
export function adminSubdomainMiddleware(req: Request, res: Response, next: NextFunction) {
  const host = req.get("host") || "";
  
  // Verifica se está acessando via subdomínio admin (admin.l.a.edutracker.online)
  if (host.startsWith("admin.") || host.includes("admin.l.a.")) {
    // Se já está em uma rota admin, continua normalmente
    if (req.path.startsWith("/admin-la-educacao")) {
      return next();
    }
    
    // Se está na raiz ou outra rota, redireciona para o login admin
    if (req.path === "/" || req.path === "") {
      return res.redirect("/admin-la-educacao/dashboard");
    }
    
    // Para outras rotas, mantém o comportamento normal
    return next();
  }
  
  // Se não é subdomínio admin, continua normalmente
  next();
}
