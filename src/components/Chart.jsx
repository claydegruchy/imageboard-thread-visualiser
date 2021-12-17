import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

import { useState, useEffect } from 'react';
import { Thread, getThread } from './Thread';
import { Chartstyle, colours } from './Chartstyle';

import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import cise from 'cytoscape-cise';

Cytoscape.use(cise);
Cytoscape.use(cola);
Cytoscape.use(COSEBilkent);
Cytoscape.use(klay);

Cytoscape.use(popper);

var layout = {
  // name: 'cose-bilkent',
  // name: 'cola',
  // name: 'cise',
  name: 'klay',
  klay: {
    // direction: 'horizontal', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
    direction: 'UP', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
    fixedAlignment: 'RIGHTDOWN',
    edgeSpacingFactor: 0.1,
    // crossingMinimization: 'INTERACTIVE',
  },
};

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
          console.log(this.data('id'), this.data('com'));
          this.incomers().addClass('neighbor-selected incoming');
          this.outgoers().addClass('neighbor-selected outgoing');
          this.successors().addClass('neighbor-selected successor');
        });
        cy.on('unselect', 'node', function (event) {
          //unselected event
          this.incomers().removeClass('neighbor-selected incoming');
          this.outgoers().removeClass('neighbor-selected outgoing');
          this.successors().removeClass('neighbor-selected successor');
        });
        cy.on('mouseover', 'node', function (event) {});
      }}
      zoom={2}
      style={{
        width: '100%',
        height: '600px',
        backgroundColor: colours.background,
      }}
      minZoom={0.5}
      maxZoom={5}
      elements={CytoscapeComponent.normalizeElements(Thread({ threadData }))}
      layout={layout}
      stylesheet={Chartstyle}
    />
  );
};

export default Chart;
