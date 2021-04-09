import Brightness3Icon from '@material-ui/icons/Brightness3';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import React from 'react';
import swal from 'sweetalert';
import { DeleteDocumentService } from '../services/album';
import { setCurrentColor } from '../util/util';


function Header({color,toggle,toDelete}:any,) {

  const switchTheme =() => {
    if(color === "dark"){
      setCurrentColor('light');
    }
    else{
      setCurrentColor('dark');
    }
    window.location.reload();
  };

const handleDelete =async (e:any) => {
  e.preventDefault();
  
  swal({
    title: "Deleting...",
    text: "Please wait",
    closeOnClickOutside:false,
    closeOnEsc:false,
    button: false,
    className:"swal"
  });
try {
    const response = await DeleteDocumentService(toDelete);
    if(response?.status === 200)
    {
      swal("Good job!", "Photo(s) deleted successfully",{className:"swal"}).then(()=>{
        window.location.reload();
      });
      
    }
    else{
        
    swal("Error!", response?.data?.message ?? "Error Encountered", {className:"swal"});
    }
  } catch (e) {
    swal("Error!", e.message, {className:"swal"});
  }
  
};


  return (
<header  className="headroom headroom--pinned"  >
 <div className="row ml-2 mr-2 pt-2 ">
    <div className="col-8">
    <h1>Photos</h1>
    
    </div>

    <div className="col-2 d-md-none .d-lg-none d-xl-none justify-content-center align-self-center">
    <div className="float-right">

    {color === "dark" && <a href="#" className="ml-2 " onClick={switchTheme}><WbSunnyIcon /></a>}
      {color === "light" && <a href="#" className="ml-2 " onClick={switchTheme} ><Brightness3Icon /></a>}

    </div>
    </div>
    
    <div className="col-4 d-none d-sm-block justify-content-center align-self-center">
    <div className="float-right ">

    {toDelete.length>0 && <a href="#" className="mr-3 " onClick={handleDelete}><DeleteIcon />&nbsp;&nbsp;Delete&nbsp;({toDelete.length})</a>}
      
      <a href="#" className="ml-3 mr-3 "  onClick={(e:any)=>{ e.preventDefault(); toggle(true)}}><CloudUploadIcon />&nbsp;&nbsp;upload</a>
      
      {color === "dark" && <a href="#" className="ml-2 " onClick={switchTheme}><WbSunnyIcon /></a>}
      {color === "light" && <a href="#" className="ml-2 " onClick={switchTheme} ><Brightness3Icon /></a>}
    </div>
    </div>
 </div>
</header>
  );
}

export default Header;
