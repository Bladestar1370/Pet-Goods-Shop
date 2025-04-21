import "./ProductType.css";
import { Link } from "react-router-dom";

const productTypes = [
  { id: 1, name: "Food", img: "/PType/food.png", bgColor: "#FFD700" },
  { id: 2, name: "Toy", img: "/PType/toys.png", bgColor: "#FF6347" },
  { id: 3, name: "Medicine", img: "/PType/medicine.png", bgColor: "#4682B4" },
  { id: 4, name: "Accessory", img: "/PType/accessory.png", bgColor: "#32CD32" },
  { id: 5, name: "Grooming", img: "/PType/grooming.png", bgColor: "#DA70D6" },
];

const ProductType = () => {
  return (
    <section id="shop-by-type" className="section-p1">
      <h2>Shop By Product Type</h2>
      <div className="product-type">
        {productTypes.map((type) => (
          <Link
          onClick={() => window.scrollTo(0, 0)}
            to={`/product-type/${type.name.toLowerCase()}`}
            key={type.id}
            className="by-type"
            style={{ backgroundColor: type.bgColor }}
          >
            <img src={type.img} alt={type.name} />
            <h6>{type.name}</h6>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductType;