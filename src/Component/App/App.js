import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'
import Table from '../Table/Table';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tipoAnuncio: 'normal', //can switch from normal or premium, each with a different commission rate
      // Number inputs from user:
      peso: 0, 
      precoVenda: 0,
      precoCusto: 0,
      imposto: 0
      
      
    } 
    this.changeAnuncio = this.changeAnuncio.bind(this);
    this.changePeso = this.changePeso.bind(this);
    this.changeVenda = this.changeVenda.bind(this);
    this.changeCusto = this.changeCusto.bind(this);
    this.changeImposto = this.changeImposto.bind(this);
  }

  //change state methods:
  changeAnuncio(tipo) {
    this.setState({
      tipoAnuncio: tipo
    });
  };

  changePeso(peso){
    this.setState({
      peso: peso
    });
  };

  changeVenda(newPreco){
    this.setState({
      precoVenda: newPreco
    })
  }

  changeCusto(newCusto){
    this.setState({
      precoCusto: newCusto
    })
  }

  changeImposto(imposto){
    this.setState({
      imposto: imposto
    })
  }

  render(){
    return(
      <div id="App">
        
        <Header />
        <main>
          {/* Sending state change methods to Menu Component*/}
          <Menu changeAnuncio={this.changeAnuncio} changePeso={this.changePeso} changeVenda={this.changeVenda} changeCusto={this.changeCusto} changeImposto={this.changeImposto}/>
          {/* Sending state values to Table Component */}
          <Table tipoAnuncio={this.state.tipoAnuncio} peso={this.state.peso} precoVenda={this.state.precoVenda} precoCusto={this.state.precoCusto} imposto={this.state.imposto}/>
        </main>
        
        
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

export default App;
