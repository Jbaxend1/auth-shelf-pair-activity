import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [item, setItem] = useState('');
  const [url, setUrl] = useState('');
  const [itemId, setId] = useState('');

  useEffect(() => {
    fetchPets();
    
  }, []);

  const fetchPets = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }
  
  const addItem = (e) => {
    e.preventDefault();
    axios.post('/api/shelf', {item: item, url: url})
    .then(() => {
      fetchPets();
  }).catch((e) => {
      console.log(e);
      alert('something went wrong in  add item')
  })
}

const deleteItem = (e) => {
  const itemId = e.target.value;
  axios.delete(`/api/shelf/${itemId}`)
      .then(() => {
        fetchPets();
      }).catch((e) => {
        console.log(e);
        alert('Something wrong in Delete');
      })
}

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <div>
      <form onSubmit={addItem}>
          <input onChange={(e) => setItem(e.target.value)} value={item} type="text" />
          <input onChange={(e) => setUrl(e.target.value)} value={url} type="text" />
          <input type="submit" />     
      </form>
      </div>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button value={item.id} onClick={deleteItem} style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;