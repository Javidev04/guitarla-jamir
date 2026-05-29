import {useMemo} from 'react'
import type {CartItem} from '../types'
import type { CartActions } from '../reducers/cart-reducers'

type HeaderProps = {
    cart: CartItem[]
    dispatch: React.ActionDispatch<[action: CartActions]>
}

export default function Header ({cart, dispatch} : HeaderProps) {

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    )
    const itemCount = useMemo(
        () => cart.reduce((total, item) => total + item.quantity, 0),
        [cart]
    )

    return (
        <header className="site-header">
            <div className="site-header__bar">
                <div className="container-xl site-header__inner">
                    <a href="/" className="site-header__logo" aria-label="GuitarLA — inicio">
                        <img className="img-fluid" src="/img/logo.svg" alt="GuitarLA" />
                    </a>

                    <div className="carrito">
                        <button
                            type="button"
                            className="carrito__trigger"
                            aria-label={`Carrito, ${itemCount} artículos`}
                        >
                            <img className="carrito__icon" src="/img/carrito.png" alt="" />
                            {itemCount > 0 && (
                                <span className="carrito__badge" aria-hidden="true">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        <div id="carrito" className="carrito__panel">
                            <p className="carrito__panel-title">Tu carrito</p>

                            {isEmpty ? (
                                <p className="carrito__empty">El carrito está vacío</p>
                            ) : (
                                <>
                                    <div className="carrito__items">
                                        {cart.map(guitar => (
                                            <div key={guitar.id} className="carrito__item">
                                                <img
                                                    className="carrito__item-img"
                                                    src={`/img/${guitar.image}.jpg`}
                                                    alt=""
                                                />
                                                <div className="carrito__item-info">
                                                    <span className="carrito__item-name">{guitar.name}</span>
                                                    <span className="carrito__item-price">${guitar.price}</span>
                                                    <div className="carrito__qty">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark btn-sm"
                                                            aria-label="Disminuir cantidad"
                                                            onClick={() => dispatch({type: 'decrease-quantity', payload: {id: guitar.id}})}
                                                        >
                                                            −
                                                        </button>
                                                        <span>{guitar.quantity}</span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark btn-sm"
                                                            aria-label="Aumentar cantidad"
                                                            onClick={() => dispatch({type: 'increase-quantity', payload: {id: guitar.id}})}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-sm carrito__remove"
                                                    type="button"
                                                    aria-label={`Quitar ${guitar.name}`}
                                                    onClick={() => dispatch({type: 'remove-from-cart', payload: {id: guitar.id}})}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="carrito__total">
                                        Total: <strong>${cartTotal}</strong>
                                    </p>
                                </>
                            )}

                            {!isEmpty && (
                                <button
                                    type="button"
                                    className="btn btn-dark w-100 carrito__clear"
                                    onClick={() => dispatch({type: 'clear-cart'})}
                                >
                                    Vaciar carrito
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-header__hero container-xl">
                <div className="site-header__hero-content">
                    <p className="site-header__eyebrow">Instrumentos de leyenda</p>
                    <h1 className="site-header__title">Encuentra tu sonido</h1>
                    <p className="site-header__subtitle">
                        Guitarras eléctricas seleccionadas para músicos que buscan calidad y carácter.
                    </p>
                </div>
            </div>
        </header>
    )
}