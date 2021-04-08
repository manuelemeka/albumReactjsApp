import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './assets/scss/custom.scss';
import Header from './components/header';
import ImageCard from './components/imageCard';
import { FetchDocumentService } from './services/album';

const  App = () =>
 {
  const [data, setData] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  


  useEffect(()=>{

    async function getDocument(){
      try {
        const response = await FetchDocumentService({
          "skip": skip,
      "limit": limit
        });
        
        setData(response?.documents);
  
      } catch (e) {
  
      }
      setLoading(false);
    }
    getDocument();
  
  },[]);

  

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await FetchDocumentService({
        "skip": skip+25,
    "limit": limit
      });
      
      setHasMore(response?.documents.length>=25);
      setData([...data, ...response?.documents]);
      //console.log([...data, {page:response?.documents}]);
      setSkip(skip+25);
      setLimit(limit);
      setLoading(false);

    } catch (e) {

    }
    //executeScroll();
  }

  return (
    
    
    <div className="App">
    <Header />
    <div className="my-container mt-5">

    <InfiniteScroll
  dataLength={data.length} //This is important field to render the next data
  next={loadMore}
  hasMore={hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
  // below props only if you need pull down functionality
  refreshFunction={loadMore}
  pullDownToRefresh
  pullDownToRefreshThreshold={50}
  pullDownToRefreshContent={
    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  }
  releaseToRefreshContent={
    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  }
>
  <div className="row">
  {data.map((doc: any)=>{
          
          return <div className="col-lg-2"><p><ImageCard data={doc}/></p></div>
        })}
        </div>
</InfiniteScroll>

    {/* {
    data && data.map((item)=>{
      //console.log(document)
      return <div className="row">

      {
        item.document.map((doc: any)=>{
          
          return <div className="col-lg"><p><ImageCard data={doc}/></p></div>
        })
      }
      </div>
    })
  } */}


</div>
{/* {!loading&&<div className="row mt-5 mb-5">
  <div className="col-lg-12 text-center" ref={myRef}>
    <Button onClick={loadMore} >Load More</Button>
  </div>
</div>} */}
    </div>
    
  );
}

export default App;
function FectDocumentService(arg0: { skip: number; limit: number; }) {
  throw new Error('Function not implemented.');
}

