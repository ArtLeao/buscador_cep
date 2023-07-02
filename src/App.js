import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./style.css";
import api from "./services/api";

function App() {

  /* useState é usado para alterar o campo, sendo que a primeira variável é o valor do campo e a segunda é a função responsável por alterar o valor do campo em algum momento da aplicação, no caso, as variáveis input e cep estão recebendo valores vazios para limpar os campos da aplicação */ 
  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");

  async function handleSearch(){
    
    let response;

    if(input === ""){
      alert("Campo vazio!");
      return false
    }else if(Object.keys(input).length !== 8){
      alert("Ops, este CEP não existe! Certifique-se de digitar um CEP de 8 dígitos.");
      return false
    }
    
    response = await api.get(`${input}/json/`);

    if(response.data.hasOwnProperty("erro")){
      alert("Ops, CEP não encontrado!");
    }else{
      setCep(response.data);
    }
    
    setInput("");
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(evento) =>setInput(evento.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={20} color="white"/>
        </button>

      </div>

       {/* Object.keys.length permite pegar o tamanho da variável useState passada por parâmetro */}      
       {Object.keys(cep).length > 0 && (
        <main className="main">
          <h3>CEP:{cep.cep}</h3>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
