const typeDefs = /* GraphQL */ `
  # Users of the app
  type Person {
    id: ID!
    firstNameAndLastName: String
    place: Place
    state: String
    city: String
    postalCode: String
    address: String
    telephone: String
    mobileNumber: String
    website: String
    role: Role!
    roleId: ID
    createdAt: String
    editedAt: String
  }

  type Place {
    id: ID!
    name: String!
    superPlace: Place
    superPlaceId: ID
    subset: [Place!]
    representative: Person
    typeOfWork: String
    state: String
    city: String
    postalCode: String
    address: String
    telephone: String
    mobileNumber: String
    website: String
    nationalId: String
    economicCode: String
    registeredNumber: String
    description: String
    createdAt: String
    editedAt: String
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
  input Permissions {
    viewPerson: Boolean!
    createPerson: Boolean!
    editPerson: Boolean!
    deletePerson: Boolean!
    viewPlace: Boolean!
    createPlace: Boolean!
    editPlace: Boolean!
    deletePlace: Boolean!
    viewEquipment: Boolean!
    createEquipment: Boolean!
    editEquipment: Boolean!
    deleteEquipment: Boolean!
    viewAsset: Boolean!
    createAsset: Boolean!
    editAsset: Boolean!
    deleteAsset: Boolean!
    viewLicense: Boolean!
    createLicense: Boolean!
    editLicense: Boolean!
    deleteLicense: Boolean!
    viewTag: Boolean!
    createTag: Boolean!
    editTag: Boolean!
    deleteTag: Boolean!
    viewRole: Boolean!
    createRole: Boolean!
    editRole: Boolean!
    deleteRole: Boolean!
  }
  type Role {
    id: ID!
    name: String!
    viewPerson: Boolean
    createPerson: Boolean
    editPerson: Boolean
    deletePerson: Boolean
    viewPlace: Boolean
    createPlace: Boolean
    editPlace: Boolean
    deletePlace: Boolean
    viewEquipment: Boolean
    createEquipment: Boolean
    editEquipment: Boolean
    deleteEquipment: Boolean
    viewAsset: Boolean
    createAsset: Boolean
    editAsset: Boolean
    deleteAsset: Boolean
    viewLicense: Boolean
    createLicense: Boolean
    editLicense: Boolean
    deleteLicense: Boolean
    viewTag: Boolean
    createTag: Boolean
    editTag: Boolean
    deleteTag: Boolean
    viewRole: Boolean
    createRole: Boolean
    editRole: Boolean
    deleteRole: Boolean
    createdAt: String
  }

  type Query {
    persons: [Person!]
    places: [Place!]
    role(roleId: ID!): Role
    roles(limit: Int!, offset: Int!): [Role!]
    hasNextRole(limit: Int!, offset: Int!): Boolean!
    countAllRoles(limit: Int!, offset: Int!): Int
  }
  type Mutation {
    createRole(name: String!, permissions: Permissions!, edit: String): Role!
    createPerson(
      id: String
      firstNameAndLastName: String
      roleId: ID!
      placeId: ID!
      state: String
      city: String
      postalCode: String
      address: String
      telephone: String
      mobileNumber: String
      website: String
      edit: String
    ): Person!
    
    deleteRoles(roleIds: [String!]!): [String!]!
  }
`;

export default typeDefs;
