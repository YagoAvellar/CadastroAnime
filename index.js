import express  from "express";

const port = 3000;
const host = 'localhost';

const app = express();
app.use(express.static('./paginas'));
app.get('/', (req, res) => {
    res.end(`
    <!DOCTYPE html>
        <head>
        <meta charset="UTF-8">
            <title>Menu do sistema</title>
        </head>
        <body>
            <h1>Menu</h1>
            <ul>
                <li><a href="/cadastro">Cadastrar novas despesas</a></li>
                <li><a href="/ControleFinanceiro">Listar Desepesas</a></li>
            </ul>
        </body>
    </html>
    `);
});
const list = []
function controller(req, res) {
    if (req.query.produto && req.query.preco && req.query.categoria && req.query.descricao && req.query.data) {
        const despesa = {
            produto: req.query.produto,
            preco: req.query.preco,
            categoria: req.query.categoria,
            descricao: req.query.descricao,
            data: req.query.data
        }
        list.push(despesa);

        res.writeHead(302, {
            'Location': '/ControleFinanceiro' 
        });
        return res.end();
    }

    let ConteudoResultado = `
    <!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
        <title>Meu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </head>
    <body>
        <h1>Despesas</h1>
        <table class="table table-striped">
            <thead class="thead-dark justify-content-center">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Preco</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Data</th>
                </tr>
            </thead>
            <tbody> `;
            
    let resultado = 0;
    for(const despesa of list){
        const preco = Number(despesa.preco);
        ConteudoResultado += `
            <tr>
                <td>${despesa.produto}</td>
                <td>${preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                <td>${despesa.categoria}</td>
                <td>${despesa.descricao}</td>
                <td>${despesa.data}</td>
            </tr>      
        `;
        resultado += preco;
    }

    ConteudoResultado += `
            </tbody>
        </table>
        <p><strong>Valor total:</strong> ${resultado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/ControleFinanceiro.html" role="button">Continuar cadastrando</a>
    </body>
    </html>
    `;
    res.end(ConteudoResultado);
}
function cadastrarDespesa(req, res) {
    if (req.query.produto && req.query.preco && req.query.categoria && req.query.descricao && req.query.data) {
        const despesa = {
            produto: req.query.produto,
            preco: req.query.preco,
            categoria: req.query.categoria,
            descricao: req.query.descricao,
            data: req.query.data
        }
        list.push(despesa);

        res.writeHead(302, {
            'Location': '/ControleFinanceiro' 
        });
        return res.end();
    }

    res.end(`
    <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <title>Controle Financeiro</title>
</head>
<body>
    <form class="row p-3 justify-content-center" action="/ControleFinanceiro" method="get">
      <h1 class="row justify-content-center m-3">Controle Financeiro</h1>
        <div class="col-auto">
          <label for="staticEmail2" class="visually-hidden">Nome do Produto</label>
          <input type="text" name="produto" class="form-control" id="inputPreco" placeholder="Nome do Produto">
        </div>
        <div class="col-auto">
          <label for="inputPassword2" class="visually-hidden">Valor</label>
          <input type="text" name="preco" class="form-control" id="InputValor" placeholder="Valor">
        </div>
        <div class="col-auto">
          <label for="inputDescricao" class="visually-hidden">Descrição</label>
          <input type="text" name="descricao" class="form-control" id="inputDescricao" placeholder="Descrição do Produto">
      </div>
      <div class="col-auto">
          <label for="inputCategoria" class="visually-hidden">Categoria</label>
          <select class="form-select" name="categoria" id="inputCategoria">
              <option selected>Selecione uma categoria</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Moradia">Moradia</option>
          </select>
      </div>
      <div class="col-auto">
          <label for="inputData" class="visually-hidden">Data</label>
          <input type="date" name="data" class="form-control" id="inputData">
      </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-success mb-3">Salvar</button>
        </div>
        <div class="col-auto">
          <button  class="btn btn-success mb-3" href="/ControleFinanceiro" role="button">Listar Despesas</button>
        </div>

      </form>
</body>
</html>
    `);
}

app.get('/cadastro', cadastrarDespesa);
app.get('/ControleFinanceiro', controller);

app.listen(port, host, () => {
    console.log(`Servidor executando na url http://${host}:${port}`)
}) 
