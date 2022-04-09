
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