import React, { Component } from 'react';
import logo from './logo.svg';
import Lokka from 'lokka';
import Transport from 'lokka-transport-http';
import './App.css';

class GraphQLBanner extends React.Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>GraphQL with React and  Lokka</h2>
        </div>
        <p className="App-intro"/>
      </div>
    );
  }
}

class GraphQLConference extends React.Component {

  constructor(props) {
    super(props);
  }

  createItemTicket(itemText, index) {
    return (
      <div  className="App-li" key={index}>
        <span  className="App-name">{itemText.name}</span> 
        <span  className="App-price">{itemText.price}</span>
        <span  className="App-date">{itemText.availableUntil}</span> 
      </div>
    );
  }

  render() {

    if(!this.props.conference) {
      return (
        <div className="App-ticket-square"></div>
      );
    }

    return (
      <div className="App-ticket-square">
        <h3>{this.props.conference.name}</h3>
        <p>Conference edition <b>'{this.props.conference.edition}'</b> date start on <b>'{this.props.conference.dateStart}'</b></p>
        <div className="App-title">Tickets</div>
        <div>
          {this.props.conference.tickets.map(this.createItemTicket)}
        </div>
      </div>
    );
  }
}

class DisplayMessage extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.info) {
      return (
        <h3 className="App-Title-Message">please select a confecence</h3>
      );
    }

    return (
      <h3 className="App-Title-Message">{this.props.info}</h3>
    );
}
}
  
class SelectConferece extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {value: ''};
    this.onChange = this.onChange.bind(this);
    this.onChangeAction = this.props.onChangeAction;
  }

  onChange(e) {
    e.preventDefault();
    this.onChangeAction(e.target.value);
  }

  render() {
    return (
      <select className="App-dropdown" onChange={this.onChange} >
        <option value="">Select conference</option>
        <option value="Berlin2017">Berlin on 2017</option>
      </select>
    );
  }
}  

class App extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.model = this.props.model;
    this.state = {
      conference: null,
      info: null
    };  
  }

  setConference(value) {

    this.setState({
      info: 'looking for information...'
    });

    this.model.getConference(value)
      .then(conference => {
        this.setState({
          conference,
          info: 'conference information'
        });
      })
  }

	render() {
		return (
			<div className="App">
        <GraphQLBanner />
        <SelectConferece onChangeAction={this.setConference.bind(this)}/>
        <DisplayMessage info={this.state.info}/>
        <GraphQLConference conference={this.state.conference}/>
			</div>
		);
	}
}

export default App;