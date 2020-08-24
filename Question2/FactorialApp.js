import React, { Component } from 'react';

class FactorialApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            number: 0,
            fact: 0
        }
    }

    handleChangeNumber = event =>{
        this.setState({
            number: event.target.value
        })
    }

    handleSubmit = event =>{
        let val = this.state.number;
        let fact = this.factorial(val);
        this.setState({
            fact: fact
        });
        event.preventDefault();
    }

    factorial = value =>{
        let fact=1;
        if(value<0){
            alert('Not possible, Put a positive integer');
        }
        else if(value===0){
            return 1;
        }else{
            for(let i=1;i<=value;i++){
                fact = fact*i;
            }
            return fact;
        }
    }

    render() {
        return (
            <div>
                <h1>Factorial Calculator</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="number"
                        placeholder="Enter a number..."
                        value={this.state.number}
                        onChange={this.handleChangeNumber}    
                    />
                    <br/>
                    <button type='submit'>Calculate Factorial</button>
                </form>
                <h2>Factorial: {this.state.fact}</h2>
            </div>
        );
    }
}

export default FactorialApp;