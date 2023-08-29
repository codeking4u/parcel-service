Assignment project has been completed.

## Technologies used:

1. **React wityh TypeScript** for UI.
2. **Redux Toolkit** for State Management.
3. **SCSS (Sass)** for styling.
4. **react-router-dom** for routing.
5. **.env** contains the API URLs and future Project vars.
6. **jest** for testing.
7. **Hosted on Netlify CI/CD - shipping-app.netlify.app**

## Project structure

1. _src/pages_ - contains pages of the project, currently two pages- Parcel Info page and Order page.
2. _src/components_ - Contains the components used in the pages
3. _src/components_ - Contains common UI elelments used in components, at the moment it has only Dropdown, I could also add for Input type text field.
4. _src/types_ - Contains Interfaces used.
5. _src/features_ - Contains Redux slices.

## Project Flow

Entry point index.tsx has the App component , which has the react-router. There are two paths at the moment

1. ParcelInfoPage - This loads the Parcel/Package info related components
   1.1 Country Selection: Implemented a feature to select source and destination countries using countries API managed by Redux store.
   1.2 Parcel Info Form and ParcelInput: Created a reusable ParcelInput component for entering parcel details.
   1.3 OrderReview: Created to display the orderview that single parcel price and total and make an order button, which calls an order API and navigate to Order page.
2. OrderPage - This calls loads the finalized data from order api.
3. Responsive design.

## Things lacking

1. Only one test configured for App.test.tsx
2. Did not get time for form validation.

# Eurosender Assignment

This is a take-home assignment for the Frontend Engineer role at Eurosender.

## Description

The goal of this task is to create a frontend application for a simple parcel ordering form, where users can add, change and remove packages, update their dimensions and see the updated price. Finally, by submitting the form, user should be able to make an order and see a confirmation screen.

For the form to work, we have prepared a mock API, which is documented below.

## Details

### Order form

- The form should contain 2 select fields, each representing an origin and destination countries.
- The form should allow users to add and remove packages from the order
- Each package needs to have 4 fields: weight, height, width and length, whereas each is required to be filled by the user
- After each change, user should see prices for individual packages as well as a total price for the order. The price can be fetched from the `/api/quote` endpoint (see API documentation below)
- Make sure that the prices displayed are in a proper 2 decimals format
- By pressing on the "Make an order" button, a new order should be created by calling the `/api/order` endpoint (see documentation below) and a confirmation screen displayed
- As a bonus, you can implement a form validation based on the response from the API.

Note, that for the simplicity's sake, there is no need to add full address details. In this case only countries are fine.

### Technology

- The app should be written with React and TypeScript
- No need to change anything in the `api` folder
- You are free to choose any method for processing CSS (LESS/SASS)
- Try to avoid using CSS/styles frameworks (such as Bootstrap or Material UI). The styles don't need to be perfect, but need to be **yours**.
- You can install external libraries

### Process

1. Clone the repository
2. Run the API server
   `npm run api`
3. Start the app in the development mode: `npm start`
4. Make changes as per the instructions above
5. Update the `README.md` file with your overview on the solution. Please document your journey as you work on the task. You can also justify and explain your choices or challenges that you had during the task.
6. Zip the folder and send it back (make sure to remove the node_modules folder beforehand)
7. Let us know that your task is ready

## API

The api can be started with the following command:

```
npm run api
```

This will start an API server on port `8000`.

### Documentation

---

**GET** **/api/countries**  
Returns a list of available countries between which users can book parcels.

Example response:

```json
[
  {
    "id": "SI",
    "name": "Slovenia"
  },
  {
    "id": "UA",
    "name": "Ukraine"
  },
  {
    "id": "LX",
    "name": "Luxembourg"
  },
  {
    "id": "FR",
    "name": "France"
  },
  {
    "id": "DE",
    "name": "Germany"
  }
]
```

---

**POST** **/api/quote**  
An endpoint that calculates the price for a given order criteria.

It expects a JSON payload in a following schema:

- **countryFrom** - country ID (the same as the one from the countries endpoint)
- **countryTo** - country ID (the same as the one from the countries endpoint)
- **packages** - an array of objects, each representing a single package. Every package object is required to contain a `width`, `weight`, `length` and `height` integer values.

Example payload:

```json
{
  "countryFrom": "SI",
  "countryTo": "SI",
  "packages": [
    {
      "width": 100,
      "weight": 8,
      "length": 80,
      "height": 20
    },
    {
      "width": 120,
      "weight": 2,
      "length": 40,
      "height": 200
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "quote": {
    "packages": [
      {
        "price": 154
      },
      {
        "price": 230
      }
    ],
    "totalPrice": 384
  }
}
```

**Note**, that the `quote.packages` contains an array of objects with individual prices for each package (in the same order as it was sent in the payload). `totalPrice` contains a sum of all the individual prices.

---

**POST** **/api/order**  
An endpoint that creates an order.

It accepts exactly same payload as the `/api/quote` endpoint, and returns the following response:

```json
{
  "success": true,
  "message": "Order successfully created",
  "totalPrice": 384
}
```

---

The project was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
