import React from 'react';
import parse from 'html-react-parser';
const Poppercontainer = ({ node, colours }) => {
  var { no, name, com, now, tim, sub } = node.data();
  console.log(node.data());
  // if (!com) return <div />;
  return (
    <div
      style={{
        backgroundColor: colours.reply,
        padding: 10,
        maxWidth: '35vw',
        pointerEvents: 'none',
      }}
    >
      {tim ? <img src={`https://i.4cdn.org/ck/${tim}s.jpg`} /> : <div />}
      <div style={{ color: colours.name, fontWeight: 'bold' }}>{name}</div>
      <div style={{ fontFamily: 'arial,helvetica,sans-serif' }}>
        {com ? parse(com) : ''}
      </div>
      {sub ? <div style={{color: colours.subject, fontWeight: 'bold'}}> {parse(sub)} </div> : ''}
    </div>
  );
};

export default Poppercontainer;
