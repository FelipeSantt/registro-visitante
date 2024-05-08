import { useQuery } from "react-query"

export const useBuscarEstados = () => {
    return useQuery(['estados'], async () => {
        const request = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        const response = await request.json();
        return response;
    });
}
export const useBuscarCidades = (estadoId) => {
    return useQuery(['cidades'], async () => {
        const request = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios
        `)
        const response = await request.json();
        return response;
    }, {
        enabled: !estadoId
    });
}