import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState ={
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component{

    // Para poder chamar no render somente os nomes das funções da classes
    // foi necessário fazer o bind para que eles soubessem o contexto, uma
    // vez que a função não é uma arrow function
        
    state = { ...initialState }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory (){
        this.setState({ ...initialState })
    }

    setOperation(operation){
        if (this.state.current === 0){
            //próximo número será o segundo (current 1)
            //e vai limpar para receber o novo número
            this.setState({ operation, current:1, clearDisplay: true })
        }
        else{
            //se ele clicar em igual
            const equals = operation === '='
            //pega a operação atual
            const currentOperation = this.state.operation
            //clona o vetor de números
            const values = [...this.state.values]
            //resolve a operação
            try{
                // values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                switch(currentOperation){
                    case '+': values[0] += values[1];
                    break;
                    case '-': values[0] -= values[1];
                    break;
                    case '*': values[0] *= values[1];
                    break;
                    case '/': values[0] /= values[1];
                    break;
                    default:
                    values[0] = this.state.values[0];
                }
            }catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0 // vai ser zerado

            this.setState({
                displayValue: values[0], //resultado da operação
                operation: equals ? null : operation, // se for = não tem operação
                current: equals ? 0 : 1, // se for = o valor corrente é em 0
                clearDisplay: !equals, // se não for =
                values //valores
            })
        }
    }

    addDigit(n){
        //Se já digitou um . não adicionar mais
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }
        //limpa o display quando necessário ou quando estamos
        //digitando o primeiro número
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        //se o limpar tela estiver ativado é '', caso contrário retorna o valor
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //novo valor que vai ser digitado
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay:false })
        //Atualiza o estado com o número digitado
        if (n !== '.') {
            const i = this.state.current
            //Converte o valor em número
            const newValue = parseFloat(displayValue)
            //Clona o array
            const values = [...this.state.values]
            values[i] = newValue
            //substitui o vetor e atualiza o estado
            this.setState({ values })
            // console.log(values)
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        );
    }
}
