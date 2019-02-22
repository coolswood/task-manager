import React, { Component } from 'react';

import AddEvent from './components/AddEvent'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Название задачи</h1>
        <section>
          <main>
            <AddEvent />
          </main>
          <aside>

          </aside>
        </section>
      </div>
    );
  }
}
