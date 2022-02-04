
import Button from '@restart/ui/esm/Button';
import React from 'react';

const Demo = () => {
    return (
        <><h1> redux demo </h1>
        <div className='container'>
        <div className='quantity'>
            <Button type='button' onClick={()=> console.log('a')}> - </Button>
            <input name='quantity' type='text'  value='0' />
            <Button type='button' onClick={()=> console.log('b')}>  +  </Button> 

        </div>
        </div>
        </>
    );

};



export default Demo;