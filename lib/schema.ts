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
    subset: [Place]
    isCategory: Boolean
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
    economicalCode: String
    registeredNumber: String
    description: String
    createdAt: String
    editedAt: String
  }

  type Equipment {
    name: String
    model: String
    factory: String
    serialNumber: String
    productionYear: String
    installationYear: String
    terminologyCode: String
    hasInstructions: Boolean
    instruction: String
    picture: String
    supportCompany: String
    supportMobile: String
    supportTelephone: String
    createdAt: String
    editedAt: String
    assets: [Asset]
  }
  type Asset {
    id: ID!
    equipment: Equipment
    equipmentId: String
    publicPropertyCode: String
    place: Place
    placeId: String
    createdAt: String
    editedAt: String
    tag: Tag
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
  input RelatedFieldFilter {
    name: ContainsSearchType!
  }
  input RelatedPersonFilter {
    firstNameAndLastName: ContainsSearchType!
    role: RelatedFieldFilter
  }
  input ContainsSearchType {
    contains: String!
  }
  input PersonFilter {
    id: ContainsSearchType!
    firstNameAndLastName: ContainsSearchType!
    place: RelatedFieldFilter!
    state: ContainsSearchType!
    city: ContainsSearchType!
    postalCode: ContainsSearchType!
    address: ContainsSearchType!
    telephone: ContainsSearchType!
    mobileNumber: ContainsSearchType!
    website: ContainsSearchType!
    role: RelatedFieldFilter!
  }
  input PlaceFilter {
    id: ContainsSearchType!
    name: ContainsSearchType!
    superPlace: RelatedFieldFilter!
    representative: RelatedPersonFilter!
    isCategory: Boolean
    typeOfWork: ContainsSearchType!
    state: ContainsSearchType!
    city: ContainsSearchType!
    postalCode: ContainsSearchType!
    address: ContainsSearchType!
    telephone: ContainsSearchType!
    mobileNumber: ContainsSearchType!
    website: ContainsSearchType!
    nationalId: ContainsSearchType!
    economicalCode: ContainsSearchType!
    registeredNumber: ContainsSearchType!
    description: ContainsSearchType!
  }
  input EquipmentFilter {
    name: ContainsSearchType!
    model: ContainsSearchType!
    factory: ContainsSearchType!
    serialNumber: ContainsSearchType!
    productionYear: ContainsSearchType!
    installationYear: ContainsSearchType!
    terminologyCode: ContainsSearchType!
    hasInstructions: Boolean
    supportCompany: ContainsSearchType!
    supportMobile: ContainsSearchType!
    supportTelephone: ContainsSearchType!
  }
  input AssetFilter {
    equipment: RelatedFieldFilter!
    publicPropertyCode: ContainsSearchType!
    place: RelatedFieldFilter!
  }
  type Query {
    persons(limit: Int, offset: Int, filters: PersonFilter): [Person]!
    personsCount(filters: PersonFilter): Int
    places(limit: Int, offset: Int, filters: PlaceFilter): [Place]!
    placesCount(filters: PlaceFilter): Int
    equipments(limit: Int, offset: Int, filters: EquipmentFilter): [Equipment]!
    equipmentsCount(filters: EquipmentFilter): Int
    assets(limit: Int, offset: Int, filters: AssetFilter): [Asset]!
    assetsCount(filters: AssetFilter): Int
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
    deletePersons(personIds: [String!]!): Int!
    deletePlaces(placeIds: [String!]!): Int!
    deleteEquipments(equipmentIds: [String!]!): Int!
    deleteAssets(assetIds: [String!]!): Int!
    createPlace(
      name: String!
      superPlaceId: String
      representativeId: String
      typeOfWork: String
      state: String
      city: String
      postalCode: String
      address: String
      telephone: String
      mobileNumber: String
      website: String
      nationalId: String
      economicalCode: String
      registeredNumber: String
      description: String
      edit: String
    ): Place!
    createCategory(name: String!, superPlaceId: String!): ID!
  }
`;

export default typeDefs;
