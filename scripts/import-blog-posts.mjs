import mysql from 'mysql2/promise';

// Blog posts data extracted from laeducacao.com.br/blog
const blogPosts = [
  {
    title: "Pós-graduação: o diferencial que pode dobrar o salário dos seus alunos",
    slug: "pos-graduacao-diferencial-dobrar-salario",
    excerpt: "O mercado de trabalho está mais exigente e competitivo a cada ano. Hoje, apenas ter um diploma de graduação já não garante os melhores cargos nem os melhores salários.",
    content: `O mercado de trabalho está mais exigente e competitivo a cada ano. Hoje, apenas ter um diploma de graduação já não garante os melhores cargos nem os melhores salários.

Uma pesquisa do economista Naercio Menezes Filho (Insper) mostrou que profissionais com pós-graduação recebem, em média, **R$ 11.539** — quase **o dobro** do salário de quem possui apenas graduação (**R$ 6.160**).

Isso significa que incentivar seus alunos a continuarem os estudos é também abrir portas para **oportunidades reais de crescimento e valorização profissional**.

## Por que a pós-graduação é tão valorizada?

- **Aumenta a empregabilidade** e a chance de promoções
- **Desenvolve competências técnicas e estratégicas** alinhadas ao mercado
- **Garante estabilidade e reconhecimento** profissional
- Acompanha a **transformação digital** e as novas demandas corporativas

Empresas de grande porte, como Nestlé e Subsea 7, já tratam a especialização como critério decisivo em processos seletivos, especialmente para cargos de liderança, tecnologia e gestão.

## Grupo LA Educação: especialização com qualidade e acessibilidade

No **Grupo LA Educação**, acreditamos que **a graduação abre portas, mas a pós-graduação leva ao próximo nível**. Por isso, oferecemos programas EAD reconhecidos pelo MEC, com qualidade comprovada e valores acessíveis, para que mais brasileiros tenham a oportunidade de se especializar.

Com mais de **mil polos e parceiros espalhados pelo país**, você pode oferecer aos seus alunos um caminho real de evolução profissional, aumentando não apenas o potencial de empregabilidade deles, mas também **o valor agregado dos seus serviços como polo parceiro**.

📌 **Seus alunos já conquistaram o diploma. Agora, é hora de dobrar o potencial deles.** Leve a pós-graduação do Grupo LA Educação para a sua base de alunos e transforme carreiras.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Educação",
    image: "/images/blog/pos-graduacao-diferencial.webp",
    readTime: "1 min",
    publishedAt: new Date("2025-08-11")
  },
  {
    title: "Educação técnica em alta: Grupo LA é destaque no G1 em matéria sobre o futuro da Geração Z",
    slug: "educacao-tecnica-alta-grupo-la-destaque-g1-geracao-z",
    excerpt: "Nos últimos anos, temos observado uma mudança significativa no comportamento dos jovens quando o assunto é formação profissional. Os cursos técnicos estão em alta.",
    content: `Nos últimos anos, temos observado uma mudança significativa no comportamento dos jovens quando o assunto é **formação profissional**. Cada vez mais, a Geração Z tem optado por caminhos mais objetivos, acessíveis e alinhados às demandas do mercado de trabalho real. E uma dessas escolhas é clara: **os cursos técnicos estão em alta.**

Essa transformação silenciosa, porém poderosa, foi tema de uma matéria especial publicada no portal **G1**, um dos veículos de comunicação mais respeitados do país, e com muito orgulho, o **Grupo LA Educação** foi destaque nessa reportagem.

## Um novo olhar da juventude sobre o futuro

Na matéria, abordamos como a Geração Z está trocando o tradicional diploma universitário por formações técnicas que oferecem **empregabilidade, agilidade e liberdade profissional**, tudo isso com um investimento mais acessível e retorno mais rápido.

Além disso, mostramos como a formação certa, oferecida com qualidade e suporte real, é o grande diferencial para que esses jovens não apenas se formem, mas **entrem no mercado com confiança e propósito.**

## Grupo LA Educação: compromisso com a transformação

Ser citado em uma matéria como essa é mais do que um reconhecimento, é a confirmação de que estamos no caminho certo. O Grupo LA tem investido fortemente em:

- **Educação técnica de qualidade;**
- **Expansão nacional com foco regional;**
- **Formações acessíveis, reconhecidas e conectadas ao mercado;**
- **Tecnologia e inovação, inclusive no ensino EAD;**
- **Projetos sociais e inclusão profissional real.**

## Leia, compartilhe e faça parte desse movimento

A **valorização da formação técnica no Brasil como alicerce para um futuro mais justo, prático e promissor.**`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Educação",
    image: "/images/blog/educacao-tecnica-geracao-z.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-08-05")
  },
  {
    title: "A revolução silenciosa da Certificação por Competência: quando a experiência vira diploma",
    slug: "revolucao-silenciosa-certificacao-competencia-experiencia-diploma",
    excerpt: "Você já parou para pensar em quantas pessoas incríveis você conhece que trabalham há anos, dominam sua profissão com maestria, mas não têm um diploma?",
    content: `Você já parou para pensar em quantas pessoas incríveis você conhece que trabalham há anos, dominam sua profissão com maestria, mas não têm um diploma formal que comprove isso?

A **Certificação por Competência** é uma modalidade que permite que profissionais com experiência prática comprovada obtenham reconhecimento formal de suas habilidades, sem necessariamente passar por todo o processo tradicional de formação.

## O que é a Certificação por Competência?

É um processo que avalia e certifica as competências adquiridas ao longo da vida profissional, transformando experiência em qualificação reconhecida pelo mercado.

## Benefícios da Certificação por Competência

- **Valorização da experiência prática**
- **Reconhecimento formal no mercado de trabalho**
- **Oportunidade de crescimento profissional**
- **Acesso a melhores oportunidades de emprego**

O Grupo LA Educação está na vanguarda dessa transformação, oferecendo programas de certificação que reconhecem o valor da experiência profissional.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Educação",
    image: "/images/blog/certificacao-competencia.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-07-31")
  },
  {
    title: "Grupo LA Educação expande para o Sul e adquire escola técnica tradicional em Caxias do Sul (RS)",
    slug: "grupo-la-educacao-expande-sul-caxias-do-sul",
    excerpt: "O Grupo LA Educação, referência nacional em ensino técnico, profissionalizante e superior acessível, acaba de dar mais um passo importante em sua expansão.",
    content: `O Grupo LA Educação, referência nacional em ensino técnico, profissionalizante e superior acessível, acaba de dar mais um passo importante em sua expansão nacional.

A aquisição de uma escola técnica tradicional em Caxias do Sul (RS) marca a chegada do grupo à região Sul do Brasil, fortalecendo ainda mais sua presença em todo o território nacional.

## Expansão estratégica

Esta aquisição representa:

- **Fortalecimento da presença nacional**
- **Acesso a novos mercados regionais**
- **Ampliação da rede de parceiros**
- **Mais oportunidades para estudantes da região Sul**

O Grupo LA Educação continua comprometido com sua missão de democratizar o acesso à educação de qualidade em todo o Brasil.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/expansao-sul-caxias.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-07-14")
  },
  {
    title: "Impacto social da educação técnica e comportamental: como transformar realidades com educação prática",
    slug: "impacto-social-educacao-tecnica-comportamental",
    excerpt: "A formação técnica e o desenvolvimento comportamental são chaves para inclusão social, geração de renda e empregabilidade.",
    content: `A formação técnica e o desenvolvimento comportamental são chaves para inclusão social, geração de renda e empregabilidade. Entenda como a educação prática pode transformar realidades.

## O poder transformador da educação técnica

A educação técnica vai além do ensino de habilidades específicas. Ela:

- **Promove inclusão social**
- **Gera oportunidades de renda**
- **Aumenta a empregabilidade**
- **Desenvolve competências comportamentais**

## Educação que transforma vidas

No Grupo LA Educação, acreditamos que a educação é a ferramenta mais poderosa para transformar realidades. Por isso, investimos em programas que combinam formação técnica de qualidade com desenvolvimento de habilidades comportamentais.

Nossos alunos não apenas aprendem uma profissão, mas desenvolvem competências que os preparam para os desafios do mercado de trabalho e da vida.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Educação",
    image: "/images/blog/impacto-social-educacao.webp",
    readTime: "3 min",
    publishedAt: new Date("2025-07-04")
  },
  {
    title: "Grupo LA Educação no G1: uma história que inspira o Brasil",
    slug: "grupo-la-educacao-g1-historia-inspira-brasil",
    excerpt: "Ter uma história contada em um dos maiores portais de notícias do país é, sem dúvidas, um marco. Mais que visibilidade, é reconhecimento.",
    content: `Ter uma história contada em um dos maiores portais de notícias do país é, sem dúvidas, um marco. Mais que visibilidade, é reconhecimento.

O Grupo LA Educação foi destaque no G1, um dos principais portais de notícias do Brasil, em uma matéria que conta a trajetória de sucesso da empresa.

## Uma história de superação e sucesso

A matéria destaca:

- **A origem humilde do fundador**
- **O crescimento exponencial da empresa**
- **O impacto social da educação oferecida**
- **A visão de futuro do grupo**

## Reconhecimento merecido

Este reconhecimento é fruto do trabalho árduo de toda a equipe do Grupo LA Educação e de nossos parceiros espalhados por todo o Brasil.

Continuamos comprometidos com nossa missão de democratizar o acesso à educação de qualidade.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/grupo-la-g1.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-07-01")
  },
  {
    title: "O Grupo LA Educação Conquista a Honra de Ser Reconhecido no LAQI 2025",
    slug: "grupo-la-educacao-reconhecido-laqi-2025",
    excerpt: "Em uma noite histórica, o Grupo LA Educação marcou sua presença de forma imbatível no renomado evento LAQI 2025.",
    content: `Em uma noite histórica, o Grupo LA Educação marcou sua presença de forma imbatível no renomado evento LAQI 2025, realizado em um dos mais prestigiados espaços de eventos.

## Reconhecimento internacional

O LAQI (Latin America Quality Institute) é uma das mais importantes premiações de qualidade da América Latina, reconhecendo empresas que se destacam por sua excelência em gestão e serviços.

## O que este reconhecimento significa

- **Validação da qualidade dos nossos serviços**
- **Reconhecimento do compromisso com a excelência**
- **Destaque entre as melhores empresas da América Latina**
- **Motivação para continuar evoluindo**

O Grupo LA Educação agradece a todos os colaboradores, parceiros e alunos que fazem parte dessa conquista.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/laqi-2025.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-05-23")
  },
  {
    title: "Fredison Carneiro se destaca na 30ª CIAED e fortalece o protagonismo do Grupo LA Educação",
    slug: "fredison-carneiro-30-ciaed-protagonismo-grupo-la",
    excerpt: "O CEO do Grupo LA Educação, Fredison Carneiro, marcou presença de forma expressiva na 30ª edição do CIAED.",
    content: `O CEO do Grupo LA Educação, Fredison Carneiro, marcou presença de forma expressiva na 30ª edição do CIAED – Congresso Internacional ABED de Educação a Distância.

## Participação de destaque

O evento reuniu os principais players do mercado de educação a distância do Brasil e da América Latina, e Fredison Carneiro representou o Grupo LA Educação com maestria.

## Temas abordados

- **Inovação na educação a distância**
- **Democratização do acesso à educação**
- **Tecnologia aplicada ao ensino**
- **O futuro da EAD no Brasil**

## Fortalecendo o protagonismo

A participação no CIAED reforça o posicionamento do Grupo LA Educação como uma das principais referências em educação a distância no país.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/ciaed-30.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-05-10")
  },
  {
    title: "Grupo LA Educação é destaque em duas matérias no Grupo Globo",
    slug: "grupo-la-educacao-destaque-grupo-globo",
    excerpt: "Quando se faz bem feito, o reconhecimento é consequência. O Grupo LA Educação foi destaque em duas matérias no Grupo Globo.",
    content: `Quando se faz bem feito, o reconhecimento é consequência. E essa frase nunca fez tanto sentido quanto agora.

O Grupo LA Educação foi destaque em duas matérias veiculadas pelo Grupo Globo, um dos maiores conglomerados de mídia do Brasil.

## Duplo reconhecimento

As matérias destacaram:

- **A trajetória de sucesso do fundador Fredison Carneiro**
- **O modelo de negócio inovador**
- **O impacto social da educação oferecida**
- **A expansão nacional da empresa**

## Visibilidade que transforma

Este reconhecimento amplia a visibilidade do Grupo LA Educação e reforça nosso compromisso com a educação de qualidade acessível a todos os brasileiros.

Agradecemos a todos que fazem parte dessa história de sucesso.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/destaque-globo.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-04-15")
  },
  {
    title: "Grupo LA Educação é reconhecido como a melhor empresa de cursos profissionalizantes no Reclame AQUI",
    slug: "grupo-la-educacao-melhor-empresa-reclame-aqui",
    excerpt: "Reclame AQUI, é a principal plataforma de avaliação de reputação e atendimento ao consumidor do Brasil.",
    content: `O Reclame AQUI é a principal plataforma de avaliação de reputação e atendimento ao consumidor do Brasil, e o Grupo LA Educação conquistou o reconhecimento como a melhor empresa de cursos profissionalizantes.

## O que isso significa

- **Excelência no atendimento ao cliente**
- **Alta taxa de resolução de problemas**
- **Satisfação dos alunos e parceiros**
- **Compromisso com a qualidade**

## Reconhecimento merecido

Este prêmio é resultado do trabalho dedicado de toda a equipe do Grupo LA Educação, que se empenha diariamente para oferecer o melhor atendimento e a melhor experiência aos nossos alunos e parceiros.

Agradecemos a confiança de todos que escolhem o Grupo LA Educação para sua formação profissional.`,
    author: "Ana Lívia Marques Ribeiro",
    category: "Institucional",
    image: "/images/blog/reclame-aqui.webp",
    readTime: "2 min",
    publishedAt: new Date("2025-04-07")
  }
];

async function importBlogPosts() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'faculdade_site',
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  });

  console.log('Connected to database');

  // First, delete existing blog posts to avoid duplicates
  await connection.execute('DELETE FROM blog_posts WHERE 1=1');
  console.log('Cleared existing blog posts');

  for (const post of blogPosts) {
    try {
      await connection.execute(
        `INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image, readTime, isPublished, featured, publishedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0, ?)`,
        [
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.author,
          post.category,
          post.image,
          post.readTime,
          post.publishedAt
        ]
      );
      console.log(`Inserted: ${post.title}`);
    } catch (error) {
      console.error(`Error inserting ${post.title}:`, error.message);
    }
  }

  await connection.end();
  console.log('Import completed!');
}

importBlogPosts().catch(console.error);
