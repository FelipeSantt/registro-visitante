import styled from "styled-components";


import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState, useRef } from "react";
import { useBuscarCidades, useBuscarEstados } from "../../hooks/IBGEHooks";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
        
              
const HomeContainer = styled.section `
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    & form {
        width: 400px;
        & h3 {
            text-align: center;
        }
        & label {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
            color: #777;
            display: block;
        }
        & input {
            width: 100%;
            margin-bottom: 10px;
        }
        & .lado-a-lado {
            display: flex;
            justify-content: space-between;
        }
        & .lado {
            width: calc(50% - 8px);
        }
    }
    & .p-dropdown {
        width: 100%;
    }
    & .p-button {
        width: 100%;
        margin-top: 16px;
    }
`;

const Home = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Sucesso', detail:'Sua visita foi registrada', life: 3000});
    }
    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Tivemos um erro', life: 3000});
    }
    
      
      const [genero, setGenero] = useState();
      const [estado, setEstado] = useState();
      const [cidade, setCidade] = useState();
      
      const onSubmit = async (data) => {
        // criar use state para loading...
        console.log(data);

        let request = {
            name: data.name,
            cpf: data.cpf,
            occupation: data.occupation,
            age: data.age,
            city: cidade,
            state: estado,
            gender: genero
        }

        await api.post('/visitor', request).then((response) =>{
            console.log(response.data);
            // toast
            showSuccess();
        }).catch((error) => {
            console.log(error);
            //toast
            showError();
        }).finally(() => {
            //set loading false
        })
      }

    const generos = [
        {
          label: 'Masculino',
          value: 'Homem'
        },
        {
          label: 'Feminino',
          value: 'Mulher'
        },
        {
          label: 'Outros',
          value: 'Outro'
        },
        {
          label: 'Prefiro nao informar',
          value: 3
        },
    ]

    const {data: estados} = useBuscarEstados();
    const {data: cidades, refetch: cidadesRefetch} = useBuscarCidades(estado);
    
    useEffect(() =>{
        cidadesRefetch();
    },[estado, cidadesRefetch]);

    return (
        <HomeContainer>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Seja bem-vindo(a) visitante</h2>
                <label htmlFor="nome">Nome</label>
                <InputText {...register('name')}
                    id="nome"
                    placeholder="Digite seu nome"
                />
                <label htmlFor="cpf">CPF</label>
                <InputMask {...register('cpf')}
                   id="cpf"
                   placeholder="000.000.000.00"
                   mask="999.999.999-99" 
                />
                <label htmlFor="profissao">Profissão</label>
                <InputText {...register('occupation')}
                    id="profissao"
                    placeholder="Digite sua Profissão"
                />
                <div className="lado-a-lado">
                    <div className="lado">
                        <label htmlFor="genero">Gênero</label>
                        <Dropdown
                          id="genero"
                          placeholder="Escolha um gênero"
                          value={genero}
                          onChange={(e)=> setGenero(e.target.value)}
                          options={generos}
                          optionLabel="label"
                          optionValue="value"
                        />

                    </div>
                    <div className="lado">
                        <label htmlFor="idade">Idade</label>
                            <InputText {...register('age')}
                              id="idade"
                              type="number"
                            />
                    </div>
                </div>
                <div className="lado-a-lado">
                    <div className="lado">
                        <label htmlFor="estado">Estado</label>
                        <Dropdown
                          id="estado"
                          placeholder="Escolha um estado"
                          value={estado}
                          onChange={(e)=> setEstado(e.target.value)}
                          options={estados}
                          optionLabel="nome"
                          optionValue="sigla"
                        />
                    </div>
                    <div className="lado">
                        <label htmlFor="cidade">Cidade</label>
                        <Dropdown
                          id="cidade"
                          placeholder="Escolha uma cidade"
                          value={cidade}
                          onChange={(e)=> setCidade(e.target.value)}
                          options={cidades}
                          optionLabel="nome"
                          optionValue="nome"
                        />
                    </div>
                </div>
            <Button
              type="submit"
              label="Enviar"
            />
            </form>
        </HomeContainer>
    );
}

export default Home;