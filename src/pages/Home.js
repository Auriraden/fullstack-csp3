import Banner from "../components/Banner";
import FeaturedContents from "../components/FeaturedContents";

export default function Home() {
  const data = {
    title: "READY TO BE: Twice in Bulacan 2023",
    content:
      "This is it, Once! TWICE is coming to the Philippines for the TWICE 5TH WORLD TOUR ‘READY TO BE’ IN BULACAN! ",
    destination: "/products",
    label: "Buy Tickets Now!",
  };

  return (
    <>
      <div style={{ width: "auto", height: "100%" }}>
        <Banner data={data} />
        <div className="container">
          <img
            className="img-fluid mb-4"
            src="/concert.jpg"
            alt="Concert Image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <FeaturedContents />
    </>
  );
}