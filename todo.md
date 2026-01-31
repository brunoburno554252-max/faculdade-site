# Project TODO

## Melhorias do Painel Administrativo

### CRUD de Certificações
- [x] Criar página AdminCertificationsPage funcional
- [x] Criar formulário de adicionar/editar certificação
- [x] Implementar upload de imagem para certificações
- [x] Implementar exclusão de certificações
- [ ] Testar CRUD completo de certificações

### Conexão Homepage com Banco
- [ ] Conectar hero slider com banners do banco de dados
- [ ] Conectar seção de certificações com banco de dados
- [ ] Testar banners aparecendo na homepage
- [ ] Testar reordenação de banners funcionando

### Configurações Gerais
- [ ] Criar interface de edição de configurações
- [ ] Implementar edição de textos da homepage
- [ ] Implementar edição de informações de contato
- [ ] Implementar edição de redes sociais

### Melhorias de UX
- [ ] Adicionar loading states em todas as operações
- [ ] Melhorar validações de formulários
- [ ] Adicionar confirmações antes de excluir
- [ ] Melhorar mensagens de erro e sucesso
- [ ] Adicionar breadcrumbs de navegação

### Testes Finais
- [ ] Testar fluxo completo de cursos
- [ ] Testar fluxo completo de blog
- [ ] Testar fluxo completo de banners
- [ ] Testar fluxo completo de certificações
- [ ] Verificar responsividade do painel


## Configurações Gerais
- [x] Criar interface AdminSettingsPage funcional
- [x] Implementar edição de informações de contato (telefone, email, endereço, WhatsApp)
- [x] Implementar edição de redes sociais (Facebook, Instagram, LinkedIn, YouTube, Twitter)
- [x] Implementar edição de informações institucionais (nome, slogan, descrição, horário)
- [ ] Conectar configurações com footer e páginas públicas
- [ ] Testar salvamento e exibição de configurações


## Conexão de Configurações com Site Público
- [x] Criar API pública para buscar configurações (publicSettings.getAll)
- [x] Conectar Footer com configurações do banco (telefone, email, redes sociais, endereço)
- [ ] Conectar Header com configurações do banco (telefone, localização)
- [ ] Testar exibição de configurações no site público
- [ ] Verificar que mudanças no admin aparecem instantaneamente no site


## Conexão de Banners e Certificações com Homepage
- [x] Conectar hero slider da homepage com banners do banco (publicBanners.getActive)
- [ ] Conectar seção de certificações da homepage com banco de dados
- [ ] Testar criação de banner no admin → aparecer na homepage
- [ ] Testar reordenação de banners no admin → mudar ordem na homepage
- [ ] Testar ativar/desativar banners no admin


## Sistema Completo de Configuração de Banners
- [x] Adicionar campos CTA (texto e link do botão) na tabela heroBanners
- [x] Adicionar campo de intervalo/duração de exibição por banner
- [x] Adicionar campo de posição do texto (left/center/right)
- [x] Adicionar campo de opacidade do overlay
- [x] Atualizar APIs backend para suportar novos campos
- [x] Atualizar formulário AdminBannerFormPage com todos os novos campos
- [x] Atualizar componente Hero para usar CTA, intervalo e posicionamento dinâmicos
- [ ] Testar criação de banner com todos os campos no admin
- [ ] Testar edição de banner existente
- [ ] Verificar que mudanças aparecem instantaneamente na homepage


## Sistema de Importação de Grade Curricular via PDF
- [x] Criar API backend para processar upload de PDF
- [x] Implementar extração de texto do PDF
- [x] Criar lógica de análise e parsing de grades curriculares
- [x] Identificar automaticamente disciplinas, períodos e cargas horárias
- [x] Adicionar botão "Importar Grade de PDF" na página de currículo
- [x] Criar interface de upload de PDF com drag & drop
- [x] Implementar preview dos dados extraídos para revisão
- [x] Permitir edição manual dos dados antes de salvar
- [x] Integrar com sistema de currículo existente
- [ ] Testar com PDFs de diferentes formatos


## Correção de Erro de Importação de PDF
- [x] Criar script Python robusto para extração de PDF
- [x] Adicionar suporte a OCR para PDFs escaneados
- [x] Melhorar prompt da IA para interpretação inteligente
- [x] Integrar script Python com backend Node.js
- [ ] Testar com PDF real do usuário via interface
- [ ] Validar parsing de grades curriculares


## Microserviço Serverless para Análise de PDF
- [x] Criar projeto separado para função serverless
- [x] Implementar endpoint de processamento de PDF
- [x] Configurar dependências Python no serverless
- [x] Modificar projeto principal para chamar API externa
- [x] Remover dependências Python do projeto principal
- [ ] Fazer deploy do microserviço
- [ ] Configurar URL da API no projeto principal
- [ ] Testar integração completa


## Correção da Página de Detalhes do Curso
- [x] Investigar página CourseDetailPage
- [x] Conectar com dados do banco (descrição, ementa, requisitos)
- [x] Exibir grade curricular completa
- [x] Adicionar campos faltantes no admin (objectives, jobMarket, requirements, type)
- [x] Atualizar schema do banco com novos campos
- [x] Atualizar formulário admin com todos os campos
- [ ] Testar visualização completa no front-end


## Adicionar Ementa e Requisitos Técnicos aos Cursos
- [x] Adicionar campo syllabus (ementa) ao schema
- [x] Adicionar campo technicalRequirements (requisitos técnicos) ao schema
- [x] Atualizar APIs backend com novos campos
- [x] Adicionar campos ao formulário admin
- [x] Exibir ementa e requisitos na página pública de detalhes
- [ ] Testar edição completa no admin


## Botão Remover Imagem no Formulário de Banners
- [x] Adicionar botão "Remover Imagem" no formulário de edição de banners
- [ ] Testar remoção e upload de nova imagem


## Categorias e Tipos Dinâmicos de Cursos
- [x] Criar tabela courseCategories no schema
- [x] Criar tabela courseTypes no schema
- [x] Criar APIs backend para CRUD de categorias
- [x] Criar APIs backend para CRUD de tipos
- [x] Criar página admin para gerenciar categorias
- [x] Criar página admin para gerenciar tipos
- [x] Atualizar formulário de cursos para buscar categorias/tipos do banco
- [x] Popular banco com categorias/tipos iniciais

## Sistema de Registro de Parceiros
- [x] Criar tabela partnershipRequests no schema
- [x] Criar API backend para criar solicitação de parceria
- [x] Criar API backend para listar/gerenciar solicitações (admin)
- [x] Criar formulário público "Quero ser Parceiro"
- [x] Criar página admin para visualizar solicitações
- [x] Trocar botão "Quero me Inscrever" por "Quero ser Parceiro"
- [x] Adicionar sistema de status (pendente, em análise, aprovado, rejeitado)


## Adicionar Links no Menu Lateral do Admin
- [x] Adicionar link para "Parceiros" no AdminLayout
- [x] Adicionar link para "Categorias de Cursos" no AdminLayout
- [x] Adicionar link para "Tipos de Cursos" no AdminLayout
- [x] Adicionar link para "Ouvidoria" no AdminLayout

## Sistema Completo de Ouvidoria
- [x] Criar tabela ombudsmanMessages no banco
- [x] Criar API pública para enviar mensagem/reclamação
- [x] Criar API admin para listar e gerenciar mensagens
- [x] Atualizar formulário público da página OmbudsmanPage
- [x] Criar página AdminOmbudsmanPage para visualizar mensagens
- [x] Adicionar sistema de status (pendente, em análise, resolvido, fechado)
- [x] Adicionar rota no App.tsx


## Correção do Menu Lateral Admin
- [ ] Verificar se AdminLayout.tsx tem os novos links
- [ ] Garantir que links aparecem no navegador
- [ ] Limpar cache e reiniciar servidor se necessário


## Aumentar Limite de Upload de Imagens
- [x] Atualizar limite no componente ImageUpload de 5MB para 50MB
- [x] Verificar limite no backend/servidor (já estava 50MB)
- [ ] Testar upload de imagem grande


## Substituir Imagem da Seção de Parceiros
- [x] Localizar seção "+1.500 Parceiros" na homepage
- [x] Fazer upload da nova imagem do prédio LA Educação
- [x] Substituir imagem antiga pela nova
- [x] Ajustar proporções e CSS (aspect-ratio 4:3) para ficar bem apresentável


## Adicionar Logo como Favicon
- [x] Localizar logo do site
- [x] Copiar logo para favicon.ico
- [x] Adicionar link do favicon no index.html
- [x] Testar exibição do favicon no navegador


## Adicionar Categorias "Técnico" e "EJA" aos Filtros
- [x] Investigar sistema de categorias atual
- [x] Verificar categorias no banco de dados
- [x] Adicionar categorias "Técnico" e "EJA" se não existirem
- [x] Atualizar filtros da página de cursos para buscar categorias dinamicamente
- [x] Testar exibição de todas as categorias nos filtros


## Adicionar Contador de Cursos por Categoria
- [x] Implementar lógica para contar cursos por categoria
- [x] Atualizar interface dos botões de filtro com contadores
- [x] Testar exibição dos contadores em todas as categorias


## Adicionar Seção de Benefícios Adicionais para Licenciados
- [x] Gerar imagem de central de atendimento personalizada com logo LA Educação
- [x] Criar nova seção destacando suporte exclusivo e atendimento dedicado
- [x] Adicionar seção após a seção "Seja um Licenciado" na homepage
- [x] Testar responsividade da nova seção


## Melhorar Imagem da Central de Atendimento
- [x] Gerar nova imagem removendo logos excessivos das telas
- [x] Adicionar chamadas de vídeo e dashboards nas telas dos computadores
- [x] Testar nova imagem na seção de suporte exclusivo


## Adicionar Seção da Plataforma Intuitiva para Alunos
- [x] Gerar imagem moderna da interface da plataforma de estudos
- [x] Criar seção destacando vantagens da plataforma (intuitiva, acessível, recursos completos)
- [x] Adicionar seção na homepage
- [x] Testar responsividade da nova seção


## Substituir Badge "100% Online" por "+15000 ALUNOS"
- [x] Atualizar badge flutuante com contador de alunos e fotos
- [x] Adicionar mensagem descritiva abaixo do badge
- [x] Testar visual e responsividade


## Adicionar Seção de Blog em Destaque na Homepage
- [x] Adicionar campo 'featured' (booleano) na tabela blogPosts
- [x] Criar migração do banco de dados
- [x] Criar API pública para buscar posts em destaque
- [x] Adicionar toggle no admin para marcar posts como destaque
- [x] Criar componente FeaturedBlog para homepage
- [x] Adicionar seção na homepage
- [x] Testar funcionalidade completa


## Adicionar Seção de Depoimentos de Parceiros
- [x] Criar tabela 'testimonials' no banco de dados
- [x] Aplicar migração do schema
- [x] Criar APIs públicas para buscar depoimentos ativos
- [x] Criar routers admin para CRUD de depoimentos
- [x] Criar página admin de gerenciamento de depoimentos
- [x] Criar componente Testimonials com carrossel
- [x] Adicionar seção na homepage
- [x] Testar funcionalidade completa


## Popular Conteúdo de Exemplo
- [x] Criar 3 depoimentos de parceiros no banco de dados
- [x] Criar 3 posts de blog e marcar como destaque
- [x] Verificar exibição na homepage


## Integrar API Externa de Licenciados
- [x] Testar API https://licenciado.laeducacao.com.br/api/licenciados
- [x] Entender estrutura de dados retornada
- [x] Criar proxy no backend para evitar CORS
- [x] Atualizar página de consulta para consumir API via proxy
- [x] Testar funcionalidade completa


## Otimizar Performance da Busca de Licenciados
- [x] Testar busca e identificar problema de loading infinito
- [x] Analisar site de referência (laeducacao.com.br)
- [x] Reimplementar com busca em tempo real (sem botão)
- [x] Testar busca instantânea conforme usuário digita
- [x] Validar funcionalidade completa


## Corrigir Busca de Licenciados para Incluir ID
- [x] Adicionar busca por ID no filtro
- [x] Testar busca por ID
- [x] Testar busca por CPF/CNPJ
- [x] Validar todos os tipos de busca funcionando


## Validar Busca por CNPJ/CPF Completo com API Modificada
- [x] Testar API modificada e verificar campo cnpj_cpf_busca
- [x] Adicionar campo cnpj_cpf_busca na interface TypeScript
- [x] Atualizar filtro para buscar no campo cnpj_cpf_busca
- [x] Testar busca por CNPJ sem formatação (52453312000154)
- [x] Testar busca por CNPJ com formatação (36.131.612/0001-60)
- [x] Validar remoção automática de pontuação


## Implementar Máxima Segurança na API de Licenciados
- [x] Substituir endpoint getAll por busca no backend
- [x] Adicionar validação de entrada (mínimo 3 caracteres)
- [x] Implementar rate limiting (máx 10 req/min por IP)
- [x] Adicionar cache de 10 minutos
- [x] Mascarar CPF/CNPJ na resposta (manter apenas 4 primeiros dígitos)
- [x] Implementar logs de auditoria com IP e termo buscado
- [x] Atualizar frontend para usar nova API
- [x] Testar segurança e validar proteções


## Mover URL da API Externa para Variável de Ambiente
- [x] Adicionar variável LICENCIADOS_API_URL nas variáveis de ambiente
- [x] Atualizar licenciadosProxy.ts para usar variável de ambiente
- [x] Testar funcionamento da busca após mudança
- [x] Validar que URL não está mais hardcoded no código


## Melhorar Design do Painel Administrativo
- [ ] Analisar painel admin atual e identificar melhorias
- [ ] Redesenhar sidebar com melhor hierarquia visual
- [ ] Melhorar cards, tabelas e formulários
- [ ] Adicionar dashboard inicial com estatísticas
- [ ] Refinar cores, espaçamentos e tipografia
- [ ] Testar responsividade e usabilidade

## Restaurar Analytics no Painel Admin
- [x] Adicionar link de Analytics no menu lateral do AdminLayout
- [x] Verificar se página AdminAnalyticsPage existe
- [x] Adicionar rota de Analytics no App.tsx
- [x] Testar acesso ao Analytics

## Implementar Dados Reais no Analytics
- [x] Verificar schema de pageviews no banco
- [x] Criar API backend para buscar estatísticas reais
- [x] Conectar frontend AdminAnalyticsPage com API
- [x] Remover todos os dados mockados/estáticos
- [x] Testar com dados reais do banco

## Restaurar Alterações da Página de Consulta
- [ ] Verificar estado atual da ConsultPage
- [ ] Identificar alterações perdidas no rollback
- [ ] Restaurar design moderno com Header e Footer
- [ ] Testar funcionalidade de busca

## Restaurar Design Completo da Página de Consulta
- [x] Adicionar Header com navegação completa
- [x] Adicionar Footer com links e informações
- [x] Manter hero com gradiente roxo/rosa
- [x] Manter funcionalidade de busca
- [x] Testar responsividade

## Seção de Avaliações dos Parceiros
- [x] Criar schema de banco de dados para depoimentos (videoUrl, courseName)
- [x] Criar API backend para CRUD de depoimentos
- [x] Criar componente de depoimentos na página inicial (acima do blog)
- [x] Design com fundo escuro, cards, estrelas, fotos
- [x] Suporte a vídeos (YouTube/Vimeo ou upload)
- [x] Carrossel com navegação
- [x] Criar página de gerenciamento no admin
- [x] Testar funcionalidade completa

## Redesenhar Seção de Depoimentos com Design Claro
- [x] Mudar fundo escuro para fundo claro/branco
- [x] Usar cores roxo/rosa (#9d197d) consistentes com o site
- [x] Manter funcionalidade de carrossel e vídeos
- [x] Testar visual integrado ao site

## Atualizar Página Sobre Nós com Conteúdo Original
- [x] Acessar página Sobre Nós do site original LA Educação
- [x] Extrair conteúdo e estrutura da página
- [x] Baixar/referenciar imagens relevantes (sede)
- [x] Adaptar conteúdo para design do site (roxo/rosa #9d197d)
- [x] Testar página atualizada

## Redesenhar Modelo de Busca da Página de Consulta
- [x] Analisar design atual da busca
- [x] Criar campo de busca maior e mais destacado
- [x] Adicionar ícones e feedback visual
- [x] Melhorar cards de resultados
- [x] Adicionar animações e transições suaves
- [x] Testar responsividade

## Corrigir Lógica de Busca para Ser Mais Precisa
- [x] Busca por ID numérico deve retornar APENAS o ID exato
- [x] Busca por nome deve ser mais restritiva (correspondência exata ou início do nome)
- [x] Busca por CNPJ/CPF deve ser correspondência exata
- [x] Reduzir número de resultados irrelevantes
- [x] Testar com diferentes termos

## Corrigir Logo no Painel Admin
- [x] Verificar componente AdminLayout
- [x] Corrigir tamanho e exibição da logo
- [x] Corrigir logo na página de login
- [x] Testar visual

## Adicionar QR Code e-MEC no Footer
- [ ] Copiar imagem do QR Code para o projeto
- [ ] Adicionar seção no Footer com design integrado
- [ ] Estilizar para combinar com o tema do site
- [ ] Testar visual


## Importar Blog do Site Antigo
- [x] Acessar blog do site antigo (laeducacao.com.br/blog)
- [x] Extrair todos os posts (títulos, conteúdo, imagens)
- [x] Baixar imagens dos posts para o projeto
- [x] Inserir 9 posts no banco de dados com conteúdo completo
- [x] Corrigir página de detalhes do blog para buscar do banco de dados
- [x] Adicionar react-markdown para renderizar conteúdo formatado
- [x] Baixar imagens únicas para cada post
- [x] Testar exibição na página de blog do novo site
- [x] Verificar categorias e datas corretas


## Sistema de Ajuste/Crop de Imagem no Admin
- [x] Instalar biblioteca react-image-crop
- [x] Criar componente ImageCropper reutilizável com drag, zoom e rotação
- [x] Integrar crop no formulário de Banners (16:9)
- [x] Integrar crop no formulário de Cursos (16:9)
- [x] Integrar crop no formulário de Blog (16:9)
- [x] Integrar crop no formulário de Certificações (1:1 quadrado)
- [x] Integrar crop no formulário de Depoimentos (1:1 quadrado)
- [x] Testar funcionalidade em todos os formulários
