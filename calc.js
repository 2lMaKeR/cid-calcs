// Função para calcular o valor financiado (q0)
function calcularValorFinanciado(p, j, n) {
    const q0 = ((1 - Math.pow((1 + j), -n)) / j) * p;
    return q0;
}

// Função para calcular a taxa de juros por aproximação
function calcularTaxaDeJuros(p, q0, n, precisao = 0.000001) {
    let j = 0.01; // Chute inicial para a taxa de juros
    let diferenca = 1;
    
    while (diferenca > precisao) {
        let q0Calculado = calcularValorFinanciado(p, j, n);
        diferenca = Math.abs(q0Calculado - q0);
        if (q0Calculado < q0) {
            j += 0.0001; // Ajuste da taxa de juros
        } else {
            j -= 0.0001;
        }
    }
    return j;
}

// Função principal para calcular q0 e j
function calcularFinanciamento(p, n, taxaDeJuros = null) {
    let q0, j;
    if (taxaDeJuros === null) {
        // Se a taxa de juros não for fornecida, calcular por aproximação
        q0 = 10000; // Chute inicial para o valor financiado
        j = calcularTaxaDeJuros(p, q0, n);
    } else {
        j = taxaDeJuros;
        q0 = calcularValorFinanciado(p, j, n);
    }
    
    return { valorFinanciado: q0, taxaDeJuros: j };
}

// Exemplo de uso:
const p = 500; // Valor da prestação
const n = 24;  // Número de meses
const taxaDeJuros = 0.01; // Taxa de juros mensal (1%)

// Se a taxa de juros não for conhecida, passe null no terceiro argumento
const resultado = calcularFinanciamento(p, n, taxaDeJuros);

console.log("Valor Financiado (q0):", resultado.valorFinanciado);
console.log("Taxa de Juros (j):", resultado.taxaDeJuros);
