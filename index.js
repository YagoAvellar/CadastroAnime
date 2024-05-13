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
                <li><a href="ControleFinanceiro.html">Cadastrar novas despesas</a></li>
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

app.get('/ControleFinanceiro', controller);

app.listen(port, host, () => {
    console.log(`Servidor executando na url http://${host}:${port}`)
}) 
