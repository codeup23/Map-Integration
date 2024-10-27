import React from 'react';
import Description from './Description';
import Form from './Form';

const Wrapper = () => {
  return (
    <div>
        <MapComponent ref={mapComponentRef} id={"mapComponent"} />

        <Description/>

        <Form/>
    </div>
  )
}

export default Wrapper