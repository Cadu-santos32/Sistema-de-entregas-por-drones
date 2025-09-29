// src/utils/utils.js

// src/components/utils/utils.js
export const parsePos = (posString) => {
    if (!posString || typeof posString !== 'string') {
        console.error("Posição inválida recebida em parsePos:", posString); // <--- AVISO DE UNDEFINED AQUI
        return null; // <--- RETORNA NULL, que causa o erro de leitura
    }
    const [x, y] = posString.split(',').map(Number);
    return [x, y];
};


// Distância Manhattan: |x1 - x2| + |y1 - y2|
export const calcularDistancia = (origemPos, destinoPos) => {
    const [origemX, origemY] = parsePos(origemPos);
    const [destinoX, destinoY] = parsePos(destinoPos);
    return Math.abs(origemX - destinoX) + Math.abs(origemY - destinoY);
};