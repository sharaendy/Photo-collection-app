import React from 'react';
import Collection from './Collection';
import './styles.scss';

export default function App() {
  const [collections, setCollections] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : null;

    fetch(
      `https://6300667134344b6431080692.mockapi.io/collections?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  const categoryList = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];

  const updateInput = (e) => setSearchValue(e.target.value);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categoryList.map(({ name }, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : null}
              key={name}
              aria-hidden="true"
            >
              {name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={updateInput}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>

      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter(({ name }) => name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
            .map(({ name, photos }, index) => (
              <Collection key={index} name={name} images={photos} />
            ))
        )}
      </div>

      <ul className="pagination">
        {[...Array(3)].map((_, index) => (
          <li
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : null}
            aria-hidden="true"
            key={index}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
