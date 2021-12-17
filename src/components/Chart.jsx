import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import Poppercontainer from './Poppercontainer';

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

const MakePopup = (node) => {
  return node.popper({
    content: () => {
      var id = node.data('no');
      // check if we have made this already

      var find = document.querySelector(`#id-${id}`);

      if (find) {
        var ele = find;
      } else {
        // if not, make and return
        let div = document.createElement('div');
        div.id = `id-${id}`;
        div.className = 'pop';
        // this is stupid
        div.innerHTML = ReactDOMServer.renderToStaticMarkup(
          <Poppercontainer node={node} colours={colours} />
        );
        document.body.appendChild(div);
        var ele = div;
      }
      [...document.querySelectorAll(`.pop`)].forEach((c) =>
        c.classList.add('hidden')
      );

      ele.classList.remove('hidden');
      return ele;
    },
  });
};

const Chart = (props) => {
  const [threadData, setThreadData] = useState();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    let defaultFilters = {};

    console.log({ ...params });

    var thread = params.get('thread');

    if (thread) {
      var site = params.get('site') || '4chan';

      var [thread, , board] = thread.split('/').reverse();

      var url = {
        site,
        thread,
        board,
      };
      if ([site, board, thread].includes(undefined))
        url = { site: '4chan', board: 'ck', thread: '17130545' };
    } else {
      var url = { site: '4chan', board: 'ck', thread: '17130545' };
    }

    console.log('Calling', url);
    getThread(url).then(setThreadData);
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

        cy.on('mouseover', 'node', function (event) {
          this.data('popper', MakePopup(this));
        });

        cy.on('mouseout', 'node', function (event) {
          var p = this.data('popper');
          if (p) {
            p.destroy();
            this.data('popper', undefined);
          }
        });

        cy.on('node', 'position', function (event) {
          cy.$('[?popper]').data('popper')?.update();
        });

        cy.on('pan zoom resize', function (event) {
          cy.$('[?popper]').data('popper')?.update();
        });
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
