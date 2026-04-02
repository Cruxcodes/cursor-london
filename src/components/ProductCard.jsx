import React from 'react';

const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="card" onClick={() => onBuy(product.id)}>
      <img src={product.image} />
      <div className="title" style={{color: '#999', fontSize: '12px'}}>
        {product.name}
      </div>
      <div className="price">${product.price}</div>
      <div className="buy-btn" onClick={() => onBuy(product.id)}>
        Buy Now
      </div>
    </div>
  );
};

export default ProductCard;
