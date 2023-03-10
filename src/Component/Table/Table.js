// This component wil make the necessary calculations and display the outputs after the states are handled by Menu.js

import './Table.css';
import React from 'react';

class Table extends React.Component{
    constructor(props){
        super(props);
        this.defineComissao = this.defineComissao.bind(this);
        this.defineFrete = this.defineFrete.bind(this);
        this.calculaFrete = this.calculaFrete.bind(this);
        this.defineSaldo = this.defineSaldo.bind(this);
    }

    defineComissao() {
        let tipoAnuncio = this.props.tipoAnuncio;
        if(tipoAnuncio === 'normal'){
            return 0.13

        } else{
            return 0.18
        }
        
    }
    calculaFrete() {
        // An array containing the minimun weight param to calculate freight cost:
        const min = [0, 0.3, 0.5, 1, 2, 5, 9, 13, 17, 23, 30];

        // An array containing the maximun weight param to calculate freight cost:
        const max = [0.3, 0.5, 1, 2, 5, 9, 13, 17, 23, 30, 1000];

        // An array with the freight cost for products between min and max params
        // so, for example, the freight cost of a product with a weight betwween min[0] and max[0] is valor[0]
        const valor = [18, 18.5, 20.5, 21.5, 26.5, 39, 61, 68, 79.5, 91.5, 101.5]

        //loop to check which range of weight the product fits in and apply the corresponding freight cost
        for(let i = 0; i < valor.length; i++){
            if(this.props.peso > min[i] && this.props.peso <= max[i]){
                return valor[i]
            }
        }
    }

    // if product price is bellow BRL 79, freight cost will be BRL 5.50, else apply valur from calculeFrete() method
    defineFrete(){
        let precoVenda = this.props.precoVenda
        if(precoVenda < 79){
            return 5.5
        } else{
            return this.calculaFrete();
        }
    }

    // method adding up all expenses and incomes to calculate profit
    defineLucro() {
        let venda = this.props.precoVenda;
        let custo = this.props.precoCusto;
        let frete = this.defineFrete();
        let comissao = this.defineComissao();
        let imposto = this.props.imposto;
        // the ternary bellow is just so the program doesn't display Null before user sets the params
        let lucro = venda === 0 || custo === 0 ? 0: (venda - (venda * (comissao + imposto)) - custo - frete) / venda;
        return lucro;

    }

    
    defineSaldo() {
        let venda = this.props.precoVenda;
        let custo = this.props.precoCusto;
        let frete = this.defineFrete();
        let comissao = this.defineComissao();
        let imposto = this.props.imposto;
        let saldo = (venda - (venda * (comissao + imposto)) - custo - frete);
        return saldo;
    }

    
    render(){
        return(
            <div id="table">
                
                <table border="1" id="results">
                    <thead>
                        <tr>
                            <th>Natureza</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pre??o de Venda</td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.props.precoVenda)}</td>
                        </tr>
                        <tr>
                            <td>Imposto sobre Venda </td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.props.imposto * this.props.precoVenda)}</td>
                        </tr>
                        <tr>
                            <td>Comiss??o </td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.defineComissao() * this.props.precoVenda)}</td>
                        </tr>
                        <tr>
                            <td>Frete </td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.defineFrete())}</td>
                        </tr>
                        <tr>
                            <td>Custo</td> 
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.props.precoCusto)}</td>
                        </tr>
                        <tr>
                            <td>L??quido</td> 
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.defineSaldo())}</td>
                        </tr>
                        <tr>
                            <td>Margem sobre Venda</td>
                            <td>{
                            Number(this.defineSaldo() / this.props.precoVenda).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                            }</td>
                        </tr>
                        <tr>
                            <td>Margem sobre Custo</td>
                            <td>{Number(this.defineSaldo() / this.props.precoCusto).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})}</td>
                        </tr>
                    </tbody>
                    
                    
                </table>
                
            </div>
        )
    }
}

export default Table;