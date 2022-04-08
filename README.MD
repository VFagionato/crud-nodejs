
# Test técnico NodeJS Junior - Viktor Fagionato

## descrição do projeto
Crie um projeto REST para atender a seguinte demanda respeitando as especificações abaixo.

Para atender uma solicitação de um setor da empresa será necessário desenvolver uma API REST para cadastro de colaboradores e essa API será consumida por diversos sistemas.

Essa API terá 4 funcionalidades: inserir colaborador, remover colaborador, buscar um colaborador e listar colaboradores agrupados por setor. Nesta última funcionalidade, deverão ser exibidos os campos nome e e-mail dos colaboradores para cada setor.

Os atributos necessários para cadastrar um colaborador são: CPF, Nome, telefone, e-Mail.

Um colaborador deve pertencer somente a um dos setores que já devem existir na tabela "setores", que possui um id e uma descrição.

As tabelas devem ser criadas através de scripts, porém deve ser efetuada uma validação estrutural das tabelas existentes no banco no momento que a aplicação for iniciada.

Critérios técnicos para desenvolvimento do projeto

1. O projeto deve ser escrito em NodeJS;

1. Boas práticas de programação serão avaliadas;

1. A lista de códigos de Status HTTP deve seguir a seguinte regra:
  a. 201 - Recurso criado

  b. 200 - Sucesso

  c. 400 - Requisição inválida

   d. 404 - Recurso não encontrado

# Solução
abaixo seguem as instruções de instalação e utilização da API.





## Instalação e Utilização
o código abaixo irá subir dois containers.

Sendo o primeiro um banco de dados postgres já populado com algumas informações
e o segundo a API em nodeJS.

### iniciar a aplicação

* 1º passo
  * clone o [repositório](https://bitbucket.org/vfagionato/nodejsjunior_viktorfagionato/src/master/)
  ```bash
  git clone git@bitbucket.org:vfagionato/nodejsjunior_viktorfagionato.git
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
Método POST em http://localhost:3000/api/colaborador

exemplo de um body valido:
```JSON
{
  "cpf": "698.506.960-60",
  "nome": "João",
  "email": "valido@mail.com",
  "telefone": 117648272901
}
```
