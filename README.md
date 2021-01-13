# Comandos utilizados
- yarn init -y (Para inicializar o package.json)

- yarn add typescript -D
- yarn tsc --init (Para inicializar o tsconfig.json)
- yarn tsc (Converte o código typescript para javascript pro node conseguir entender)

- yarn add express
- yarn add @types/express -D (Pacote de tipos do express)

- node dist/server.js (executa o código convertido)

- yarn add ts-node-dev -D (Serve pra executar o projeto typescript em desenvolvimento, sem que precise ficar buildando com yarn tsc o tempo todo)
- yarn ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts
("scripts": { yarn dev:server })

- yarn add uuidv4 (Lib usada para gerar um id único)

- yarn add date-fns (Lib usada para lidar com datas)

# Recuperação de senha

**Requisitos Funcionais - (RF)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não Funcionais - (RNF)**

- Utilizar Mailtrap para testar envios em ambiente desenvolvimento;
- Utilizar o Amazon SES(simple e-mail service) para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Requisitos de Negócio - (RN)**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis das 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
