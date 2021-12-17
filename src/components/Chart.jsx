import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';

import cise from 'cytoscape-cise';
import { useState, useEffect } from 'react';
import { Thread, getThread } from './Thread';

Cytoscape.use(cise);

const Chart = (props) => {
  const [threadData, setThreadData] = useState();

  useEffect(() => {
    let defaultFilters = {};

    getThread({ site: '4chan', board: 'ck', thread: '17130545' }).then(
      setThreadData
    );
  }, []);

  if (!threadData) return <b>Loading!</b>;

  return (
    <CytoscapeComponent
      cy={(cy) => {
        cy.ready(function (event) {
          cy.fit();
        });

        // system to show relations when selected
        cy.on('select', 'node', function (event) {
          this.incomers().addClass('neighbor-selected incoming');
          this.outgoers().addClass('neighbor-selected outgoing');
        });
        cy.on('unselect', 'node', function (event) {
          //unselected event
          this.incomers().removeClass('neighbor-selected incoming');
          this.outgoers().removeClass('neighbor-selected outgoing');
        });

        cy.on('unselect', function (event) {});

        cy.on('mouseover', 'edge.neighbor-selected', function (event) {
          this.addClass('hover');
        });
        cy.on('mouseout', 'edge.neighbor-selected', function (event) {
          this.removeClass('hover');
        });

        cy.on('select', 'node', function (event) {});
      }}
      zoom={2}
      style={{
        zIndex: '-1',
        top: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
      }}
      style={{ width: '100%', height: '600px' }}
      minZoom={0.5}
      maxZoom={5}
      elements={CytoscapeComponent.normalizeElements(Thread({ threadData }))}
    />
  );
};

export default Chart;
