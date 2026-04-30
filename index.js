const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/analisar', (req, res) => {
    const rawSalarios = req.query.salarios;

    if (!rawSalarios) {
        return res.send("Nenhum salário enviado. <a href='/'>Voltar</a>");
    }

    const listaSalarios = rawSalarios.split(',')
        .map(s => parseFloat(s))
        .filter(n => !isNaN(n));

    const maiorSalario = Math.max(...listaSalarios);
    const listaFormatada = listaSalarios.map(s => `R$ ${s.toFixed(2)}`).join(' | ');

    res.send(`
        <body style="font-family: sans-serif; padding: 20px;">
            <h2>Relatório de Salários</h2>
            <p><strong>Total de itens:</strong> ${listaSalarios.length}</p>
            <p><strong>Lista:</strong> ${listaFormatada}</p>
            <hr>
            <p style="font-size: 1.2em; color: green;">
                <strong>O maior salário é:</strong> R$ ${maiorSalario.toFixed(2)}
            </p>
            <br>
            <a href="/">Fazer nova análise</a>
        </body>
    `);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));