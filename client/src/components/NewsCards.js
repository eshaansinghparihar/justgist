import React from 'react';

const Info = ({data}) => {
return (
<div>
  {(data.length!==0 && data!==undefined)?(data.map((n) => <p>{n.title}</p>)):(<div>Loading</div>)}
</div>
  );
};
export default Info;