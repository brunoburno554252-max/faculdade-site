import { drizzle } from "drizzle-orm/mysql2";
import bcrypt from "bcryptjs";
import { adminUsers } from "../drizzle/schema.js";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL não configurada");
  process.exit(1);
}

const db = drizzle(DATABASE_URL);

async function createAdmin() {
  const username = process.argv[2] || "admin";
  const password = process.argv[3] || "admin123";
  const name = process.argv[4] || "Administrador";
  const email = process.argv[5] || "admin@laeducacao.com.br";

  console.log("\n🔐 Criando usuário administrador...\n");
  console.log(`Username: ${username}`);
  console.log(`Nome: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Senha: ${password}`);

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(adminUsers).values({
      username,
      passwordHash,
      name,
      email,
      isActive: true,
    });

    console.log("\n✅ Usuário administrador criado com sucesso!");
    console.log("\n📝 Acesse o painel em: /admin-la-educacao");
    console.log(`   Username: ${username}`);
    console.log(`   Senha: ${password}`);
    console.log("\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!\n");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.error("\n❌ Erro: Usuário já existe!");
    } else {
      console.error("\n❌ Erro ao criar usuário:", error.message);
    }
    process.exit(1);
  }

  process.exit(0);
}

createAdmin();
