import React from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';


const ImageCard = ({data}:any) => {
  return (
    <Card>
        
        <CardBody style={{backgroundImage:`url('${data.raw}')`, backgroundRepeat: 'no-repeat', backgroundSize:'100% 100%', height:'300px'}}>
            <div >
               checked
            </div>
        </CardBody>
        <CardFooter className="text-center">
        <p>{data.name}</p>
        <p>{data.album}</p>
        </CardFooter>
    </Card>
  );
}

export default ImageCard;
