import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/header';
import ImageCard from './components/imageCard';
import Loader from './components/loader';
import UploadModal from './components/uploader';
import { FetchDocumentService } from './services/album';
import { getCurrentColor } from './util/util';

const color = getCurrentColor();
const  App = () =>
 {
  const [data, setData] = useState<any[]>([]);
  const [toDelete, setToDelete] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [uploader, setUploader] = useState(false);
  


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

  const refresh = async () =>{
    try {
      const response = await FetchDocumentService({
        "skip": skip,
    "limit": limit
      });
      
      setData(response?.documents);
      setHasMore(true);
      setLoading(false);
    } catch (e) {

    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await FetchDocumentService({
        "skip": skip+25,
    "limit": limit
      });
      
      setHasMore(response?.documents.length>=25);
      setData([...data, ...response?.documents]);
      setSkip(skip+25);
      setLimit(limit);
      setLoading(false);

    } catch (e) {

    }

  }

  const addToDelete = (album:string, documents:string) =>{
     setToDelete([...toDelete, {album:album,documents:documents}]);
  };

  
  const removeToDelete = (album:string, documents:string) =>{
    const newList = toDelete.filter((item) => item.documents !== documents);
    setToDelete(newList);
  };

  return (
    
    
    <div className="App">
    <Header color={color} toggle={setUploader} toDelete={toDelete}/>
    <div className="my-container mt-5">

    <InfiniteScroll

    className="window"
  dataLength={data.length}
  next={loadMore}
  hasMore={hasMore}
  loader={<Loader />}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>No more photos to show</b>
    </p>
  }
  refreshFunction={refresh}
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
          
          return <div className="col-lg-2"><p><ImageCard data={doc} addToDelete={addToDelete} removeToDelete={removeToDelete}/></p></div>
        })}
        </div>
</InfiniteScroll>
</div>
  <UploadModal modal={uploader} toggle={setUploader} />
    </div>
    
  );
}

export default App;


