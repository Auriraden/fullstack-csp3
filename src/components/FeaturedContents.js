import { useState, useEffect } from "react";
import { CardGroup, Container } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedContents(){

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products/all`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // Create two empty array to be used to store random numbers and featured product data
          const numbers = [];
          const featured = [];

          // This function generates a random number between 0 and the length of the data array (the fetched product data).
          const generateRandomNums = () => {
            let randomNum = Math.floor(Math.random() * data.length);

            // Checks if the random number has already been added to the numbers array. If not, it adds the random number to the numbers array. If the random number already exist in the numbers array, it recursively calls itself to generate a new random number.
            if (numbers.indexOf(randomNum) === -1) {
              numbers.push(randomNum);
            } else {
              generateRandomNums();
            }
          };

          // A loop is used to iterate five items (from 0 - 4). Inside the loop, the generateRandomNums function is called to generate a random number
          for (let i = 0; i < 8; i++) {
            generateRandomNums();

            // For each iteration of the loop, the PreviewProductss component is rendered with the corresponding product data from the data array based on the random number
            featured.push(
              <PreviewProducts
                data={data[numbers[i]]}
                key={data[numbers[i]]._id}
                breakPoint={3}
              />
            );
          }

          // After the loop finishes, the setPreviews function is called to update the state of the component with the featured array.
          setPreviews(featured);
        });
    }, []);

    return (
      <>
        <Container className="mb-3">
          <h2
            className="text-center mb-3"
            style={{ fontFamily: "Lobster, cursive" }}
          >
            Featured Products
          </h2>
          <CardGroup className="justify-content-center">{previews}</CardGroup>
        </Container>
      </>
    );
}