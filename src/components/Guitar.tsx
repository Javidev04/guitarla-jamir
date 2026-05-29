import type {Guitar} from '../types'
import type { CartActions } from '../reducers/cart-reducers'

type GuitarProps = {
    guitar: Guitar,
    dispatch: React.Dispatch<CartActions>
}

export default function Guitar({guitar, dispatch} : GuitarProps) {

    const {name, image, description, price} = guitar

    return (
        <article className="product-card">
            <div className="product-card__media">
                <img
                    className="product-card__img"
                    src={`/img/${image}.jpg`}
                    alt={`Guitarra ${name}`}
                    loading="lazy"
                />
            </div>
            <div className="product-card__body">
                <h3 className="product-card__title">{name}</h3>
                <p className="product-card__desc">{description}</p>
                <div className="product-card__footer">
                    <span className="product-card__price">${price}</span>
                    <button
                        type="button"
                        className="btn btn-primary product-card__btn"
                        onClick={() => dispatch({type: 'add-to-cart', payload: {item:guitar}})}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    )
}
