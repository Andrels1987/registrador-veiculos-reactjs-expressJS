import { useEffect, useState } from "react"
import { Veiculo } from "../modelos/Veiculo"
import { Link } from "react-router-dom"
import { useRegistrarentradadevisitantesMutation } from "../features/api/apiSlice"
import ItemDaLista from "./ItemDaLista"
import Loading from "./Loading"

type Props = {
    collection: Array<Veiculo> | undefined,
    mostrarInfo: Function,
    isLoading: boolean,
    isSuccess: boolean,
    isFetching: boolean
}

const ListaDeVeiculos = ({ collection, mostrarInfo, isLoading, isFetching }: Props): JSX.Element => {
    const [pesquisaVeiculo, setPesquisaVeiculo] = useState(collection);
    const [registrarEntradaDeVisitante] = useRegistrarentradadevisitantesMutation();
    const [placa, setPlaca] = useState("");

    useEffect(() => {
        handlePesquisaVeiculo();

    }, [placa, collection])




    const handlePesquisaVeiculo = () => {
        let newCollection: Array<Veiculo> | undefined = collection?.filter(c => {
            if (c.placa?.toUpperCase().includes(placa.toUpperCase()) && c?.placa !== null) {
                return c;
            }
        })
        if (newCollection) {
            setPesquisaVeiculo([...newCollection]);
        }
    }



    const registrarEntrada = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let retorno = registrarEntradaDeVisitante({ id })
        retorno.then(res => {
            if ('data' in res)
                alert("Message: " + res.data)
            else
                console.error("Unexpected response format:", res);
        }).catch(error => {
            console.log("ERROR: ", error);
        })
    }



    return (
        <div>
            <form action="" id="form-pesquisar-veiculo">
                <fieldset>
                    <legend>Pesquisar veiculo</legend>
                    <div>
                        <label htmlFor="placa">Placa</label>
                        <input type="text" onChange={(e) => setPlaca(e.target.value)} name="placa" id="placa" placeholder="pesquisar veiculo pela placa" />
                    </div>
                </fieldset>

            </form>
            {isFetching ?
                (
                    <Loading />
                ) :
                (
                    pesquisaVeiculo?.length === 0 ?
                        (
                            placa === "" ?
                                (
                                    <p> {!isLoading ? "" : "Sem veiculos cadastrados"}</p>
                                )
                                :
                                (
                                    <div>
                                        <h5>Nenhum veiculo encontrado com essa placa</h5>
                                        <Link to={{ pathname: '/cadastrodeveiculos' }}>Cadastrar</Link>
                                    </div>
                                )
                        ) :
                        (

                            pesquisaVeiculo
                                ?.map((v) =>
                                    <div key={v?._id} onClick={(e) => mostrarInfo(e)} className="veiculo-list-item">

                                        <ItemDaLista v={v} />
                                        <div>
                                            <Link style={{ border: 'solid 1px white', borderRadius: '5px', padding: '3px 5px' }} to={`/atualizar/${v._id}`}>Atualizar</Link>
                                            <button onClick={(e) => registrarEntrada(v._id, e)}>Registrar Entrada</button>
                                        </div>
                                    </div>
                                )


                        )

                )

            }



        </div>

    )


}


export default ListaDeVeiculos;