import './style.css';
import Header from './components/Header';
import ImageItemList from './components/ImageItemList';
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState<string>('red');
  const [page, setPage] = useState<number>(1);

  return (
    <div className={`App ${keyword}`}>
      <Header keyword={keyword} setKeyword={setKeyword} setPage={setPage} />
      <ImageItemList keyword={keyword} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
