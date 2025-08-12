import "../styles/Card.css";

function Card({ title, subtitle, description, image, actions = [] }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <h3>{title}</h3>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <p>{description}</p>

      {actions.length > 0 && (
        <div className="card-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="card-button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;