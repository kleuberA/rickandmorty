import { useEffect, useState } from "react";
import "./App.css";

type ResultProps = {
  results: any;
  info: any;
};

function App() {
  const [data, setData] = useState<ResultProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [page, setPage] = useState(1);

  let [next, setNext] = useState<ResultProps | null>(null);
  let [prev, setPrev] = useState<ResultProps | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
        setNext(actualData.info.next);
        setPrev(actualData.info.prev);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function AtualizaPage(page: number) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
        setNext(actualData.info.next);
        setPrev(actualData.info.prev);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="App bg-slate-800">
      {loading && <div>Aguarde um Momento</div>}
      {error && <div>{`Ocorreu um erro ao buscar os dados - ${error}`}</div>}

      <main className="py-6 bg- flex items-center justify-center flex-wrap">
        {data &&
          data.results.map((element: any, key: any) => {
            return (
              <div
                key={key}
                className="bg-slate-700 w-72 h-auto shadow-md rounded m-3 hover:bg-opacity-30"
              >
                <div className="h-3/4 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-t hover:scale-125 transition"
                    src={element.image}
                    alt="piña"
                  />
                </div>
                <div className="w-full h-20 p-3">
                  <a href="#" className=" hover:text-yellow-600 text-slate-300">
                    <span className="text-sm font-semibold uppercase tracking-wide ">
                      {element.name}
                    </span>
                  </a>
                  <div className="infosPersonagem flex">
                    <div className="h-auto bg-amber-600 w-28 rounded-md text-center text-white flex justify-center items-center ">
                      {element.species}
                    </div>
                    <div
                      className={`h-8 w-28 text-white rounded-md text-center flex justify-center items-center ${
                        element.gender === "Female" ? "bg-pink-600" : ""
                      } ${
                        element.gender === "unknown"
                          ? "bg-yellow-600"
                          : "bg-sky-600"
                      }`}
                    >
                      {element.gender}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-white w-32 h-11 rounded-md relative inline-flex left-2/4 -top-36 items-center justify-center ${
                    element.status == "Dead" ? "bg-red-600" : "bg-green-600"
                  } ${element.status == "unknown" ? "bg-yellow-600" : ""}`}
                >
                  {element.status}
                </div>
              </div>
            );
          })}
      </main>
      <div className="cotnainerButtons w-full h-20">
        <div className="styleButtons w-4/5 m-auto flex justify-around">
          <button
            className="b w-40 h-14 rounded-md bg-gray-900 text-white disabled:opacity-25"
            disabled={prev === null}
            onClick={() => {
              if (page <= 42) {
                page -= 1;
                setPage(page);
                AtualizaPage(page);
              } else {
                prev = null;
                setPrev(prev);
              }
            }}
          >
            Prev
          </button>

          <button
            className="b w-40 h-14 rounded-md bg-gray-900 text-white disabled:opacity-25"
            disabled={next === null}
            onClick={() => {
              if (page <= 42) {
                page += 1;
                setPage(page);
                AtualizaPage(page);
              } else {
                next = null;
                setNext(next);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
