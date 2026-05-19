import React, { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');

  const [logradouro, setLogradouro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const buscaCep = async () => {
    if (!cep) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data || data.erro) return;
      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setLocalidade(data.localidade || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
    } catch (err) {
      console.error('Erro ao buscar CEP', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidato = {
      nomeCompleto: nome,
      telefone,
      cep,
      endereco: logradouro,
      localidade,
      bairro,
      cidade,
      estado,
    };
    console.log('Candidato inscrito:', candidato);
    alert('Inscrição enviada! Veja console para dados.');
    // Reset opcional
    setNome('');
    setTelefone('');
    setCep('');
    setLogradouro('');
    setLocalidade('');
    setBairro('');
    setCidade('');
    setEstado('');
  };

  return (
    <div className="container">
      <h1>Formulário de Inscrição de Candidatos</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label>Nome completo</label>
          <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome completo"
            className="input"
          />
        </div>

        <div className="field">
          <label>Telefone</label>
          <br />
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            placeholder="(XX) XXXXX-XXXX"
            className="input"
          />
        </div>

        <div className="field cep-row">
          <div className="cep-group">
            <label>CEP</label>
            <br />
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="00000-000"
              className="input cep-input"
            />
          </div>
          <div className="cep-action">
            <button type="button" onClick={buscaCep}>Buscar CEP</button>
          </div>
        </div>

        <div className="field">
          <label>Endereço</label>
          <br />
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            placeholder="Logradouro / Rua"
            className="input"
          />
        </div>

        <div className="row">
          <div className="flex1 field">
            <label>Localidade</label>
            <br />
            <input
              type="text"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
              placeholder="Localidade"
              className="input"
            />
          </div>

          <div className="flex1 field">
            <label>Bairro</label>
            <br />
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
              className="input"
            />
          </div>
        </div>

        <div className="row">
          <div className="flex1 field">
            <label>Cidade</label>
            <br />
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade"
              className="input"
            />
          </div>

          <div className="state field">
            <label>Estado</label>
            <br />
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="UF"
              className="input"
            />
          </div>
        </div>

        <button type="submit" className="submit">Enviar inscrição</button>
      </form>
    </div>
  );
}

export default App;