const image = document.querySelector("#image");
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  image.src = `https://source.unsplash.com/random/350x450?sig=${
    Math.random() * 9999
  }`;
  console.log(image);
});
