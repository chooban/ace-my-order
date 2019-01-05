import React, { Component } from 'react';
import { PreviewsItem } from './PreviewsItemType'
import PreviewsTable from './PreviewsTable'
import logo from './logo.svg';
import './App.css';

type AppState = {
	items: PreviewsItem[]
}

class App extends Component<any, AppState> {

	state = {
		items: [],
	}

  componentDidMount() {
    fetch('.netlify/functions/latest')
      .then(response => response.json())
      .then(items => this.setState({
				items
			}))
  }

  render() {

		if (this.state.items.length === 0) {
			return (
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
					</header>
				</div>
			)
		}
    return (
      <div className="App">
        <header className="App-header">
          <PreviewsTable rows={this.state.items} />
        </header>
      </div>
    );
  }
}

export default App;
