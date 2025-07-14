import app from "./app.js"; //agora vai em

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} 🚀`);
});