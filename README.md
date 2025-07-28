[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-001F3F?style=for-the-badge&logo=javascript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-001F3F?style=for-the-badge&logo=express
[POSTGRES_BADGE]: https://img.shields.io/badge/PostgreSQL-001F3F?style=for-the-badge&logo=postgresql&logoColor=white
[PRISMA_BADGE]: https://img.shields.io/badge/Prisma-001F3F?style=for-the-badge&logo=prisma&logoColor=white
[NODE_BADGE]: https://img.shields.io/badge/Node.js-001F3F?style=for-the-badge&logo=node.js&logoColor=white
[JWT_BADGE]: https://img.shields.io/badge/JWT-001F3F?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[BRAPI_BADGE]: https://img.shields.io/badge/BRAPI-001F3F?style=for-the-badge&logo=api&logoColor=white


# VibraniumCore-API
A RESTful API for managing personal investments.
It enables user registration, portfolio management, buy and sell operations, and real-time price updates through integration with the BRAPI API.

##  **Technologies used**

<div>

![javascript][JAVASCRIPT__BADGE]
![Node.js][NODE_BADGE]
![express][EXPRESS__BADGE]
![JWT][JWT_BADGE]
![Prisma][PRISMA_BADGE]
![PostgreSQL][POSTGRES_BADGE]
![BRAPI][BRAPI_BADGE]

</div>

<h2 id="started">🚀 Getting started</h2>

<div>
<h3>Prerequisites</h3>
  
- NodeJS
- MongoDB or PostgreSQL (used via Prisma ORM)
- Git
- .env environment file
</div>

<div>
  <h3>Cloning</h3>

Clone this project in your terminal

```bash
git clone https://github.com/olv-stephany/VibraniumCore-API.git
```
</div>

<div>
  <h3> Environment Variables</h2>
  
Create a `.env` file based on `.env.example` and fill in with:

```yaml
DATABASE_URL=your-prisma-db-url
BRAPI_TOKEN=your-brapi-token
JWT_SECRET=your-secret
```
</div>

<div>
<h3>Starting and Running the Project</h3>

How to start your project

```bash
cd VibraniumCore-API
npm install
npm run seed
node src/server.js
``````
</div>

<div>
<h2 id="routes">📍 API Endpoints</h2>

🔐 Authentication
​
| method  | route | description                                         
|----------------------|-------------------------|----------------------------
| POST | <kbd> /auth/register</kbd>  | Create a new user
| POST | <kbd> /auth/login</kbd>     | Login and get token


<h3 id="post-auth-detail">POST /auth/register</h3>

**REQUEST**
```json
{
  "nome_usuario": "Stephany",
  "email": "stephany@teste.com",
  "senha": "123456"
}
```

**RESPONSE**
```json
{
  "message": "Usuário registrado com sucesso!"
}
```

<h3 id="post-auth-detail">POST /auth/login</h3>

**REQUEST**
```json
{
  "email": "stephany@teste.com",
  "senha": "123456"
}
```

**RESPONSE**
```json
{
  "token": "your-token-here"
}
```
</div>

<div>
  
**💳 Investments**


| method  | route | description                                         
|----------------------|-------------------------|----------------------------
| POST | <kbd> /investment</kbd>  | Create a new investment (admin)
| GET | <kbd> /investment</kbd>     | List all investments
| PUT | <kbd> /investment/:id </kbd>     | Update investment (admin)

<div>
<h3 id="post-auth-detail">POST /investment</h3>

**REQUEST**
```json
{
  "code": "BBAS3", ---> check the asset code in brapi API
  "categoriaId": 5, ---> the categories are divided into 5, check the seed.js
  "riscoId": 3,  ---> the risks are "BAIXO, MEDIO, and ALTO"
  "liquidez": "BAIXA",
  "descricao": "Investimento em ações do Banco do Brasil."
}

```

**RESPONSE**
```json
{
 "id": 7,
	"code": "BBAS3",
	"nome_investimento": "BRASIL      ON      NM",
	"categoria_investimentos_id": 5,
	"riscos_investimentos_id": 2,
	"liquidez": "BAIXA",
	"valor_unitario": "20.24",
	"indice_rentabilidade": "0.847",
	"descricao": "Investimento em ações do Banco do Brasil."
}
```
</div>

<div>
<h3 id="post-auth-detail">GET /investment/</h3>


**RESPONSE**
```json
{
  "id": 7,
	"code": null,
	"nome_investimento": "BRASIL      ON      NM",
	"categoria_investimentos_id": 5,
	"riscos_investimentos_id": 3,
	"liquidez": "BAIXA",
	"valor_unitario": "20.24",
	"indice_rentabilidade": "0.847",
	"descricao": "Investimento em ações do Banco do Brasil.",
	"categoria": {
		"id": 5,
		"nome_categoria": "Ações",
		"descricao": null
	},
	"risco": {
		"id": 3,
		"nome_nivel": "ALTO",
		"descricao": "O investimento de alto risco é aquele que não possui previsibilidade ou até mesmo garantias de rentabilidade. Ou seja, no momento da aplicação, não é possível saber qual será a margem de lucro ou de eventuais perdas.",
		"recomendacao_geral": "Investidores Agressivos"
	}
}
```
</div>

<div>
<h3 id="post-auth-detail">PUT /investment/:id</h3>

**REQUEST**
```json
{
  "code": "BBAS3", ---> check the asset code in brapi API
  "categoriaId": 5, ---> the categories are divided into 5, check the seed.js
  "riscoId": 3,  ---> the risks are "BAIXO, MEDIO, and ALTO"
  "liquidez": "BAIXA",
  "descricao": "Investimento em ações do Banco do Brasil."
}

```

**RESPONSE**
```json
{
  "id": 7,
	"code": "BBAS3",
	"nome_investimento": "BRASIL      ON      NM",
	"categoria_investimentos_id": 5,
	"riscos_investimentos_id": 2,
	"liquidez": "BAIXA",
	"valor_unitario": "20.24",
	"indice_rentabilidade": "0.847",
	"descricao": "Investimento em ações do Banco do Brasil."
}
```
</div>
</div>

<div>
  
**📈 Movements**


| method  | route | description                                         
|----------------------|-------------------------|----------------------------
| POST | <kbd> /movements</kbd>  | Record a buy/sell transaction
| PUT | <kbd> /movements </kbd>     | Update a transaction's status

<div>
<h3 id="post-auth-detail">POST /movements/</h3>

**REQUEST**
```json
{
  "code": "VALE3",
	"usuarioId": 11,
	"tipoTransacao": "COMPRA",
	"quantidade": 5,
	"status": "CONCLUIDA"
}

```

**RESPONSE**
```json
{
  "id": 5,
	"usuario_id": 11,
	"investimento_id": 2,
	"tipo_transacao": "COMPRA",
	"quantidade": 5,
	"valor_unitario_momento": "55.7",
	"valor_total": "278.5",
	"data_transacao": "2025-07-27T17:35:57.608Z",
	"status": "CONCLUIDA",
	"usuario": {
		"nome_usuario": "Stephany",
		"email": "stephany@teste.com"
	},
	"investimento": {
		"nome_investimento": "VALE        ON      NM"
	}
}
```
</div>

<div>
<h3 id="post-auth-detail">PUT /movements/:id</h3>

**REQUEST**
```json
 {
	"code": "VALE3",
	"usuarioId": 11,
	"tipoTransacao": "VENDA",
	"quantidade": 20,
	"status": "PENDENTE"  ---> No input, only the status is updated, as we want an immutable and secure movement.
}

```

**RESPONSE**
```json
{
"id": 5,
	"usuario_id": 11,
	"investimento_id": 2,
	"tipo_transacao": "COMPRA",
	"quantidade": 5, ---> Did you see? No other data is changed in the PUT after the POST, only the status.
	"valor_unitario_momento": "55.7",
	"valor_total": "278.5",
	"data_transacao": "2025-07-27T17:35:57.608Z",
	"status": "PENDENTE"
}
```
</div>
</div>

<div>
  
**💵 Wallet**


| method  | route | description                                         
|----------------------|-------------------------|----------------------------
| GET | <kbd>/wallet</kbd>  | Get the user's wallet
| POST | <kbd> /wallet/add</kbd>  | Add a stock to wallet
| POST | <kbd>/wallet/sell</kbd>     | Sell a stock and update wallet

</div>

<div>
  <h2 id="contribute">📫 Contribute</h2>

This project is open to contributions of all kinds! Whether it's fixing bugs, improving documentation, suggesting ideas, or adding new features, you're welcome to collaborate. Let's build and learn together! 🤝🚀

1. `git clone https://github.com/olv-stephany/VibraniumCore-API.git`
2. `git checkout -b feature/your-feature`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
</div>
