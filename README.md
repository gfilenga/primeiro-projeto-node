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


# Comandos utilizados
- yarn init -y (Para inicializar o package.json)

- yarn add typescript -D
- yarn tsc --init (Para inicializar o tsconfig.json)
- yarn tsc (Converte o código typescript para javascript pro node conseguir entender)

- yarn add express
- yarn add @types/express -D (Pacote de tipos do express)

- node dist/server.js (executa o código convertido)

- yarn add tsconfig-paths -D (Lib que converte os caminhos atalhos com "@" para normal)
- yarn add ts-node-dev -D (Lib que executa o projeto typescript em desenvolvimento e builda automaticamente com "yarn tsc" toda vez)
- yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts
("scripts": { yarn dev:server })

- yarn add uuidv4 (Lib usada para gerar um id único)

- yarn add date-fns (Lib usada para lidar com datas)

**Configurando atalhos para importação(tsconfig.json)**

    "baseUrl": "./src",
    "paths": {
        "@modules/*":["modules/*"],
        "@config/*":["config/*"],
        "@shared/*":["shared/*"]
    },

**Configurando TypeORM**

- docker run --name nomeAqui -e POSTGRES_PASSWORD=senhaAqui -d postgres -p 5432:5432 -d postgres (Comando para criar um container)

- yarn add typeorm pg (Instala o typeorm e o driver do postgres)

- Configurações do arquivo ormconfig.json

    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "gostack_gobarber",
    "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }

- Criando conexão

import { createConnection } from 'typeorm';

- Procura dentro do projeto o arquivo "ormconfig.json" e faz a conexão de acordo com esse arquivo.

createConnection();

- Importando o arquivo de conexão dentro do server.ts

import './database';

- yarn ts-node-dev ./node_modules/typeorm/cli.js ("scripts": { yarn typeorm }) (ts-node-dev converte os arquivos typescript antes de executar o comando)
- yarn typeorm migration:create -n NomeDaMigration
- yarn typeorm migration:run (Executa as migrations)
- yarn typeorm migration:revert (Reverte a última migration feita)
- yarn typeorm migration:show (Mostra as migrations já executadas)

- Habilitando decorators no tsconfig.json

"experimentalDecorators": true,
"emitDecoratorMetadata": true,

- Desabilitando inicialização das variáveis da classe no tsconfig.json

"strictPropertyInitialization": false,

- Adicionar decorators nas entidades. Exemplo:

        @Entity('appointments')
        class Appointment {
            @PrimaryGeneratedColumn('uuid')
            id: string;

            @Column()
            provider_id: string;

            @ManyToOne(() => User)
            @JoinColumn({ name: 'provider_id' })
            provider: User;

            @Column('timestamp with time zone')
            date: Date;

            @CreateDateColumn()
            created_at: Date;

            @UpdateDateColumn()
            updated_at: Date;
        }

- yarn add reflect-metadata (dependência que o typescript tem com a syntax de decorators)

- import 'reflect-metadata' (importar no arquivo global, no caso, server.ts)

**Criptografia de senha**

- yarn add bcryptjs (Lib de criptografia)
- yarn add -D @types/bcryptjs

**Autenticação JWT**

- yarn add jsonwebtoken (Lib que vai gerar o token)
- yarn add -D @types/jsonwebtoken

- Criação de token:

const { secret, expiresIn } = authConfig.jwt;

const token = sign({}, secret, {
    subject: user.id,
    expiresIn,
});

return {
    user,
    token,
};

- Validação do token JWT

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

- Separa o token de acordo com o espaço (Bearer 1321ji321e3d31dy31daqda)
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}

**Upload de imagens**

- yarn add multer  (Pacote para lidar com upload de arquivos)

- Configuração:

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
};

**Tratativa de erros**

- yarn add express-async-errors (Pacote pra que o express consiga captar erros em rotas async)
- import 'express-async-errors'; (Importar logo após da importação do express)

**Injeção de dependências**

- yarn add tsyringe

# Testes e Test Driven Development (TDD)

- A aplicação continue funcionando independente do número de novas funcionalidades e do número de devs no time.

1. Testes unitários

- Testam funcionalidades específicas da nossa aplicação (precisam ser funções puras, que independem de serviços externos).

- Exemplo: Jamais fará uma chamada à uma API e efeito colateral.

2. Testes de integração

- Testam uma funcionalidade completa, passando por várias camadas da aplicação.

- Exemplo: Route ==> Controller ==> Serviço ==> Repositório ==> ...

3. Testes E2E (EndToEnd)

- Testes que simulam a ação do usuário dentro da aplicação.

**Configurando Jest**

- yarn add jest -D
- yarn jest --init (Yes => Node => No => Yes )
- yarn add ts-jest -D (Para conseguir ler os arquivos de teste escritos em typescript)

- jest.config.js:
    preset: 'ts-jest',
    testMatch: [
        "**/*.spec.ts"
    ],

- Para o jest entender a syntax de atalhos de importações(jest.config.js):

    const { pathsToModuleNameMapper } = require('ts-jest/utils');
    const { compilerOptions } = require('./tsconfig.json');

        moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),

**Configurando o coverage report**

- jest.config.js:

    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/modules/**/services/*.ts'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: "v8",
    coverageReporters: [
      "text-summary",
      "lcov",
    ],

# Emails em desenvolvimento

- yarn add nodemailer

**Template de emails**

- yarn add handlebars

# Configurando MongoDB com docker

- docker run --name mongodb -p 27017:27017 -d -t mongo

- yarn add mongodb

- Configuração ormconfig.json

        "name":"mongo",
        "type": "mongodb",
        "host": "localhost",
        "port": 27017,
        "database": "gobarber",
        "useUnifiedTopology": true,
        "entities": [
            "./src/modules/**/infra/typeorm/schemas/*.ts"
        ]

# Validando dados

- yarn add celebrate

# Variáveis ambiente

- yarn add dotenv
