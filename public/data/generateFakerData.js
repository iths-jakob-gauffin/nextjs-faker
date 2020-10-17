import faker from "faker";
import data from "../public/data/data.json";

const generator = (schema, min = 1, max) => {
  max = max || min
  return Array.from({ length: faker.random.number({ min, max }) }).map(() => Object.keys(schema).reduce((entity, key) => {
    entity[key] = faker.fake(schema[key])
    return entity
  }, {}))
}

// your schema
const clientsSchema = {
  id: '{{random.number}}',
  // name: '{{name.firstName}} {{name.lastName}}',
  // company: '{{company.companyName}} {{company.companySuffix}}',
  // address: '{{address.streetAddress}}',
  // phone: '{{phone.phoneNumber}}',
  // email: '{{internet.email}}',
  // avatar: '{{image.imageUrl}}',
  product: '{{commerce.product}}',
  color: '{{commerce.color}}',
  department: '{{commerce.department}}',
  price: '{{commerce.price}}',
  productName: '{{commerce.productName}}',
  productAdjective: '{{commerce.productAdjective}}',
  productMaterial: '{{commerce.productMaterial}}',
  productDescription: '{{commerce.productDescription}}',
}

const data = generator(clientsSchema, 5, 5)
const json = JSON.stringify(data);

const fakeStoreData = (async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data =  JSON.stringify(await res.json());
  // console.log("OUTPUT ÄR: fakeStoreData -> res", res)
  console.log("OUTPUT ÄR: fakeStoreData -> data", data)
  
})();
