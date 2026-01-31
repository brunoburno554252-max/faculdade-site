import { getDb } from './db';
import { courseCategories, courseTypes } from '../drizzle/schema';

async function seedCourseMetadata() {
  console.log('Seeding course categories and types...');

  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  // Seed categories
  const categories = [
    { name: 'Graduação', slug: 'graduacao', description: 'Cursos de graduação (bacharelado, licenciatura, tecnólogo)' },
    { name: 'Pós-Graduação', slug: 'pos-graduacao', description: 'Cursos de especialização, MBA e pós-graduação' },
    { name: 'Técnico', slug: 'tecnico', description: 'Cursos técnicos profissionalizantes' },
    { name: 'Livre', slug: 'livre', description: 'Cursos livres e de extensão' },
  ];

  for (const category of categories) {
    try {
      await db.insert(courseCategories).values(category).onDuplicateKeyUpdate({
        set: { name: category.name, description: category.description }
      });
      console.log(`✓ Category: ${category.name}`);
    } catch (error) {
      console.log(`- Category ${category.name} already exists`);
    }
  }

  // Seed types
  const types = [
    { name: 'Bacharelado', slug: 'bacharelado', description: 'Curso de graduação com foco em formação acadêmica e científica' },
    { name: 'Licenciatura', slug: 'licenciatura', description: 'Curso de graduação para formação de professores' },
    { name: 'Tecnólogo', slug: 'tecnologo', description: 'Curso superior de tecnologia com foco prático' },
    { name: 'Técnico', slug: 'tecnico', description: 'Curso técnico profissionalizante de nível médio' },
    { name: 'Especialização', slug: 'especializacao', description: 'Pós-graduação lato sensu' },
    { name: 'MBA', slug: 'mba', description: 'Master in Business Administration' },
  ];

  for (const type of types) {
    try {
      await db.insert(courseTypes).values(type).onDuplicateKeyUpdate({
        set: { name: type.name, description: type.description }
      });
      console.log(`✓ Type: ${type.name}`);
    } catch (error) {
      console.log(`- Type ${type.name} already exists`);
    }
  }

  console.log('Seeding completed!');
  process.exit(0);
}

seedCourseMetadata().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
