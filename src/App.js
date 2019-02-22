import React, { Component } from 'react';

import Page from './UI/Page'

import AddEvent from './components/AddEvent'

export default class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="background" />
        <Page>
          <h1>Название задачи</h1>
        </Page>

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
