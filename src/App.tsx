import {useReducer, useEffect} from 'react'
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import {cartReducer, initialState} from "./reducers/cart-reducers"

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />

      <main className="catalog">
        <div className="container-xl">
          <header className="catalog__header">
            <h2 className="catalog__title">Nuestra colección</h2>
            <p className="catalog__subtitle">
              {state.data.length} modelos disponibles — envío a todo el país
            </p>
          </header>

          <div className="catalog__grid">
            {state.data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container-xl site-footer__inner">
          <img className="site-footer__logo" src="/img/logo.svg" alt="GuitarLA" width="120" />
          <p className="site-footer__copy">
            GuitarLA — Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
