import "./Category.css";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const categories = [
  { id: 1, name: "Dog", img: "/pets/dog.png", bgColor: "#f7b885" },
  { id: 2, name: "Cat", img: "/pets/cat.png", bgColor: "#D4E157" },
  { id: 3, name: "Rabbit", img: "/pets/rabbit.png", bgColor: "#f78c6c" },
  { id: 4, name: "Bird", img: "/pets/bird.png", bgColor: "#90CAF9" },
  { id: 5, name: "Fish", img: "/pets/fish.png", bgColor: "#7efc83" },
];

const Category = () => {
  return (
    <section id="shop-by" className="section-p1">
      <h2>Shop By Pet</h2>
      <div className="pet">
        {categories.map((category) => (
          <Link
          onClick={() => window.scrollTo(0, 0)}
            to={`/category/${category.name.toLowerCase()}`} // Use lowercase for URL
            key={category.id}
            className="by-pet"
            style={{ backgroundColor: category.bgColor }}
          >
            <img src={category.img} alt={category.name} />
            <h6>{category.name}</h6>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
