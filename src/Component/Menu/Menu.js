// This component will handle all status changes to App component

import './Menu.css'
import React from "react";

class Menu extends React.Component{

    constructor(props){
        super(props);

        this.handleClickAnuncio = this.handleClickAnuncio.bind(this);
        this.handleChangePeso = this.handleChangePeso.bind(this);
        this.handleChangeVenda = this.handleChangeVenda.bind(this);
        this.handleChangeCusto = this.handleChangeCusto.bind(this);
        this.handleChangeImposto = this.handleChangeImposto.bind(this);
    }

    // Event handlers methods:
    handleChangePeso(e){
        let peso = Number(e.target.value);
        this.props.changePeso(peso);
    }

    handleChangeVenda(e){
        let newPreco = Number(e.target.value);
        this.props.changeVenda(newPreco);
    }

    handleChangeCusto(e){
        let custo = Number(e.target.value);
        this.props.changeCusto(custo);
    }

    handleChangeImposto(e){
        let stringImposto = e.target.value;
        //user will make this input in percentage format (like 10%), 
        //this line is to remove the % sign and dividing it to 100 so the result would have this format: 0.10:
        let imposto = Number(stringImposto.slice(0, -1)) / 100; 
        this.props.changeImposto(imposto);
    }

    handleClickAnuncio(e){
        let tipo = e.target.value;
        this.props.changeAnuncio(tipo);
    }

    render() {
        return(
            <div id="Menu">
                <fieldset class="ctn">
                    <legend>Tipo de Anúncio</legend>
                    <form onClick={this.handleClickAnuncio}>
                        <input type="radio" name="tipoAnuncio" value="normal"/>Clássico
                        <input type="radio" name="tipoAnuncio" value="premium"/>Premium
                    </form>
                </fieldset>
                <form id="inputs" class="ctn">
                    <legend>Preço de Venda</legend>
                    <input onChange={this.handleChangeVenda} type="number" placeholder="Digite o valor de venda"/>
                    <legend>Preço de Custo</legend>
                    <input onChange={this.handleChangeCusto} type="number" placeholder='Custo do produto'/>
                    <legend>Imposto de Venda</legend>
                    <input onChange={this.handleChangeImposto} type="text" placeholder='Imposto nesse formato: 10%'/>
                    <legend>Peso do Produto (em Kg)</legend>
                    <input onChange={this.handleChangePeso} type="number" placeholder='Peso do produto em quilos'/>
                    
                </form>
                
                
                
            </div>
        );
    };
};

export default Menu;
