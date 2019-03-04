import React, { Component } from 'react';

class App extends Component {

	constructor(props){
		super(props)
		this.currencies = ["AUD", "CAD", "CHF", "CNY", "INR", "USD", "EUR", "GBP", "JPY", "NZD",]
		this.state = 	{
			base: "USD",
			other: "INR",
			value: 0,
			converted: 0,
		}
	}

	render(){
		return(
			<div>
				<div>
					<select onChange={this.makeSelection} name="base" value={this.state.base}>
						{this.currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
					</select>
					<input onChange={this.changeValue} value={this.state.value}/>
				</div>
				<div>
					<select onChange={this.makeSelection} name="other" value={this.state.other}>
						{this.currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
					</select>
					<input disabled={true} value={this.state.converted === null ? "Calculating..." : this.state.converted}/>
				</div>
			</div>
		)
	}

	makeSelection = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		}, this.reCalculate)
	}

	changeValue = (event) => {
		this.setState({
			value: event.target.value,
			converted: null,
		}, this.reCalculate)
	}

	reCalculate = () => {
		const value = parseFloat(this.state.value)
		if (value === isNaN){
			return
		} else {
			fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					converted: data.rates[this.state.other] * value
				})
			})
		}
	}
}

export default App;
