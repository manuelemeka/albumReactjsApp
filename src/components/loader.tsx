import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getCurrentColor } from '../util/util';

const color = getCurrentColor();
function Loader() {



  return (
      <>
<div className="row">

<div className="col-lg-2"></div>
<div className="col-lg-2 text-center">
    
<SkeletonTheme color={color === 'dark'?"#202020":""} highlightColor={color === 'dark'?"#444":""}>
    <Skeleton height={200} className="skeleton"/>
    <Skeleton width={200}/>
    <Skeleton width={200}/>
    </SkeletonTheme>
    
    </div>
<div className="col-lg-2 text-center">
    
<SkeletonTheme color={color === 'dark'?"#202020":""} highlightColor={color === 'dark'?"#444":""}>
    <Skeleton height={200} className="skeleton"/>
    <Skeleton width={200}/>
    <Skeleton width={200}/>
    </SkeletonTheme>
    
    </div>
<div className="col-lg-2 text-center">
    
<SkeletonTheme color={color === 'dark'?"#202020":""} highlightColor={color === 'dark'?"#444":""}>
    <Skeleton height={200} className="skeleton"/>
    <Skeleton width={200}/>
    <Skeleton width={200}/>
    </SkeletonTheme>
    
    </div>
<div className="col-lg-2 text-center">
    <SkeletonTheme color={color === 'dark'?"#202020":""} highlightColor={color === 'dark'?"#444":""}>
    <Skeleton height={200} className="skeleton"/>
    <Skeleton width={200}/>
    <Skeleton width={200}/>
    </SkeletonTheme>
    
    </div>

<div className="col-lg-2"></div>

</div>
<div className="row">
    <div className="col-lg-12 text-center"><h1 className="text-muted">Loading</h1></div>
</div>
</>
  );
}

export default Loader;
