import React from 'react';
import Headroom from 'react-headroom';


function Header() {
  return (
<Headroom style={{backgroundColor:"black"}}>
 <div className="row ml-2 mr-2 pt-2 ">
    <div className="col-10">
    <h1>Photos</h1>
    
    </div>

    <div className="col-2 d-md-none .d-lg-none d-xl-none justify-content-center align-self-center">
    <div className="float-right">

    <a href="#" className="mr-2 " >bar</a>

    </div>
    </div>
    
    <div className=" d-none d-sm-block justify-content-center align-self-center">
    <div className="float-right ">

    <a href="#" className="mr-2 " >Delete</a>
      |
      <a href="#" className="ml-2 mr-2 " >upload</a>
      |
      <a href="#" className="ml-2 ">25</a>
    </div>
    </div>
 </div>
</Headroom>
  );
}

export default Header;
