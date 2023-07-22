const GenerateOrderID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let productID = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    productID += characters.charAt(randomIndex);
  }
  return productID;
};

export default GenerateOrderID;
