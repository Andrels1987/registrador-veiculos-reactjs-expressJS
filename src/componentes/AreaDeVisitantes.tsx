import {useRegistrarSaidaDeVisitanteMutation } from "../features/api/apiSlice"
import { useEffect, useState } from "react";
import ItemDaLista from "./ItemDaLista";
import { Link } from "react-router-dom";
import { Registro } from "../modelos/Registros";

type Props = {
    registros : any,
    mostrarInfo: Function
}
const AreaDeVisitantes = ({registros, mostrarInfo}: Props): JSX.Element => {
    //let registrosFiltrados: Array<any> = []
    const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([])
    const [registrarSaidaDeVisitante] = useRegistrarSaidaDeVisitanteMutation()

    useEffect(() => {
        let registrosFiltrados;
        if (registros) {
            registrosFiltrados = registros.filter((registro:any) => registro.statusVisita === "presente")
        }
        setRegistrosFiltrados(registrosFiltrados);
    }, [registros])



    const registrarSaida = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let retorno = registrarSaidaDeVisitante({ id })
        retorno.then(res =>{
            if('data' in res)
                alert("Message: " + res.data)
            else
            console.error("Unexpected response format:", res);
        }).catch(error => {
            console.log("ERROR: ", error);            
        })
    }
    
    
    return (      
           
         <div className="areadevisitantes">
            <h4>Veiculos sem autorização</h4>
                {registrosFiltrados?.length > 0 ? registrosFiltrados.map(v => (
                    <div className="veiculo-list-item" key={v._id} onClick={(e) => mostrarInfo(e)}>
                        <ItemDaLista   v={v.veiculo} />
                        <button onClick={(e) => registrarSaida(v._id, e)}>Registrar Saida</button>
                    </div>
                )) : (
                    <p style={{pointerEvents: "auto"}}>Nenhum registro encontrado <Link to={"/veiculos"}>Voltar</Link></p>
                )}
        </div>
    )
}

export default AreaDeVisitantes