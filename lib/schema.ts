const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    status: String!
  }
  # Users of the app
  type Person {
    id: ID!
    firstName: String
    lastName: String
    place: Place
    title: String
    responsibility: String
    state: String
    city: String
    postalCode: String
    address: String
    telephone: String
    phoneNumber: String
    permissions: Permission!
    createdAt: String
    editedAt: String
    email: String!
  }

  type Place {
    id: ID!
    name: String!
    subPlace: Place
    representative: Person
    typeOfWork: String
    state: String
    city: String
    postalCode: String
    address: String
    telephone: String
    phoneNumber: String
    website: String
    nationalId: String
    economicCode: String
    registeredNumber: String
    description: String
    createdAt: String
    editedAt: String
  }

  type Query {
    viewer: User!
    person(id: ID!): Person!
  }

  type Equipment {
    id: ID!
    name: String!
    technicalSpecification: String
    createdAt: String
    editedAt: String
  }
  type Asset {
    id: ID!
    equipment: Equipment
    numberOfAssets: Int
    createdAt: String
    editedAt: String
  }

  type Tag {
    id: ID!
    asset: Asset
    createdAt: String
    editedAt: String
  }

  type License {
    id: ID!
    fromPerson: Person
    toPerson: Person
    fromPlace: Place
    toPlace: Place
    type: String
    numbers: Int
    date: String
    description: String
    createdAt: String
    editedAt: String
    confirmedAt: String
  }

  type Mutation {
    updateName(name: String!): User!
  }
`;

export default typeDefs;
