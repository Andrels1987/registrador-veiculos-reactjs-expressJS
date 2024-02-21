import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import  { Veiculo }  from '../../../src/modelos/Veiculo';
import { Registro } from '../../modelos/Registros';
import { MessageResponse } from '../../modelos/MessageResponse';


// Define a service using a base URL and expected endpoints
export const veiculoApi = createApi({
  reducerPath: 'api',
  tagTypes: ['veiculos'],
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8023/' }),
  //baseQuery: fetchBaseQuery({ baseUrl: 'https://registrador-de-veiculos.onrender.com' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/' }),
  endpoints: (builder) => ({
    getVeiculos: builder.query<Veiculo[], any>({
      query: () => ({
        //url : '/todosveiculos',
        url : '/api/todosveiculos',
        method: 'GET',
        headers : {
          'Content-Type': 'application/json'
        }
        
      }),
      transformResponse: (response:Veiculo[]) => response,
      providesTags: ['veiculos']
    }),
    cadastrarVeiculo: builder.mutation<MessageResponse, any>({
      query: ({veiculo}) =>({
        url: "/api/salvarveiculo",
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff',
        },
        body: {
          placa: veiculo.placa, 
          modelo: veiculo.modelo, 
          marca: veiculo.marca,
          cor: veiculo.cor, 
          foto: veiculo.foto, 
          vaga: veiculo.vaga,
          tipoDeAutorizacao: veiculo.tipoDeAutorizacao, 
          statusDeAcesso: veiculo.status_de_acesso, 
          observacao: veiculo.observacao, 
          //motorista/condutor/morador
          nomeProprietario: veiculo.motorista.nome, 
          bloco: veiculo.motorista.bloco,
          apartamento: veiculo.motorista.apartamento, 
          documentoProprietario: veiculo.motorista.numeroDocumento
        }
      }),
      transformResponse: (response: {status: MessageResponse}) => {
        console.log("RESULT -> ", response);
        return response.status;
      },
      invalidatesTags: ['veiculos']
    }),
    getVeiculoPeloId: builder.query<Veiculo, any>({
      query: ({id}) => ({
        url: `/api/veiculo/${id}`,
        method: 'GET',
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
      }),
      providesTags: ['veiculos']
    }),
    atualizarVeiculo: builder.mutation<MessageResponse, any>({
      query: ({veiculo}) => ({
        url: `/api/atualizarveiculo/${veiculo?._id}`,
        method: 'PUT',
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
        body: {
          modelo: veiculo.modelo, 
          cor: veiculo.cor, 
          marca: veiculo.marca,
          placa: veiculo.placa, 
          nomeProprietario: veiculo.motorista.nome, 
          foto: veiculo.foto, 
          vaga: veiculo.vaga,
          tipoDeAutorizacao: veiculo.tipoDeAutorizacao, 
          statusDeAcesso: veiculo.status_de_acesso, 
          observacao: veiculo.observacao, 
          bloco: veiculo.motorista.bloco,
          apartamento: veiculo.motorista.apartamento, 
          documentoProprietario: veiculo.motorista.numeroDocumento
        }
      }),
      transformResponse: (response: {status: MessageResponse}) => {
        console.log("RESULT -> ", response.status);
        return response.status;
      },
      invalidatesTags: ['veiculos']
    }),
    registrarentradadevisitantes: builder.mutation<MessageResponse, any>({
      query: ({id}) =>({
        url: `/api/registrarentradadevisitantes/${id}`,
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff'
        }    
      }),
      transformResponse: (response: {status: MessageResponse}) => {
        console.log("RESULT -> ", response.status);
        return response.status;
      },
      invalidatesTags: ['veiculos']
    }),
    buscarRegistroDeEntradasDeVeiculos: builder.query<Registro[], any>({
      query: () =>({
        url: '/api/registrosdeentrada',
        method: 'GET',
        headers:{
          "Cache-control": "no-cache",
          'Content-Type': 'text/x-typescript',
          'X-Content-Type-Options': 'nosniff'
        }
       }),
      transformResponse: (response:Registro[]) => response,
      providesTags:['veiculos']
    }),
    registrarSaidaDeVisitante: builder.mutation<MessageResponse, any>({
      query: ({id}) =>({
        url: `/api/registrarsaidadevisitantes/${id}`,
        method: "PUT",
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
      }),
      transformResponse: (response: {status: MessageResponse}) => {
        console.log("RESULT -> ", response.status);
        return response.status;
      },
      invalidatesTags:['veiculos']
    }) 
}),
})


export const {
    useGetVeiculosQuery,
     useGetVeiculoPeloIdQuery,
    useCadastrarVeiculoMutation,
    useAtualizarVeiculoMutation,
    useRegistrarentradadevisitantesMutation,
    useBuscarRegistroDeEntradasDeVeiculosQuery,
    useRegistrarSaidaDeVisitanteMutation 
} = veiculoApi