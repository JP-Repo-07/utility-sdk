import { groupedSum } from '../src/utils/number'

const data = [
  {
    id: 1,
    name: "Alice",
    hours: 2,
    items: {
      quantity: 3,
      price: 10
    },
    status: "active"
  },
  {
    id: 1,
    name: "Alice",
    hours: 4,
    items: {
      quantity: 2,
      price: 15
    },
    status: "active"
  },
  {
    id: 1,
    name: "Alice",
    hours: 7,
    items: {
      quantity: 4,
      price: 2
    },
    status: "Inactive"
  },
  {
    id: 2,
    name: "Tim",
    hours: 5,
    items: {
      quantity: 6,
      price: 15
    },
    status: "active"
  },
  {
    id: 3,
    name: "Tim",
    hours: 3,
    items: {
      quantity: 6,
      price: 15
    },
    status: "active"
  }
]

console.log(groupedSum(data, "id", 1, "items.quantity", "status", "active"))