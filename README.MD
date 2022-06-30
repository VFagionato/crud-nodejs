## Instalação
o código abaixo irá subir dois containers.

Sendo o primeiro um banco de dados postgres já populado com algumas informações
e o segundo a API em nodeJS.

### iniciar a aplicação

* 1º passo
  * clone o [repositório](git@github.com:VFagionato/crud-nodejs.git)
  ```bash
  git clone git@github.com:VFagionato/crud-nodejs.git
  ```
  e entrar na pasta do projeto
  ```bash
  cd nodejsjunior_viktorfagionato
  ```
* 2º passo
  * instale as dependências com o gerenciador de pacotes [yarn](https://yarnpkg.com/getting-started/install)
  ```bash
  yarn
  ```
* 3º passo
  * suba os containers com o [docker compose.](https://docs.docker.com/compose/install/)
  ```bash
  docker-compose up
  ```

## Utilização
a URL base da aplicação é
http://localhost:3000

### Cadastrar novo colaborador

```http
POST http://localhost:3000/api/colaborador

body: {
  "cpf": "698.506.960-60",
  "nome": "João",
  "email": "valido@mail.com",
  "telefone": 117648272901
}
```
### Remover um colaborador

```http
DELETE http://localhost:300/api/colaborador/?id=<id_do_colaborador>
```

### Buscar um colaborador

```http
GET http://localhost:300/api/colaborador/?id=<id_do_colaborador>
```

### listar todos os colaboradores agrupados por setor
```http
GET http://localhost:300/api/colaborador
```
