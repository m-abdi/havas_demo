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
    supportCompany: Place
    supportTelephone1: String
    supportTelephone2: String
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
  # type Level {
  #   stageID     :           ID!
  #   stageName     :         String!
  #   byUser         :        Person
  #   byUserId       :        String
  #   byUsersWithRoles  :     [Person]
  #   byUsersWithPermissions: [Role]
  #   Process             :   Process
  #   processProcessNumber  : String
  # }

  type Havaleh {
    id: String
    date: String
    deliverer: String
    transportationName: String
    transportationTelephone: String
    transportationTelephone2: String
    description: String
    receivingDescription: String
    assets: AggregatedTransferedAssetsOutput
  }

  type Stage {
    stageID: String
    stageName: String
    submittedByUser: Person
    havaleh: Havaleh
    dateCreated: String
    dateModified: String
  }

  # type Process {
  #   processNumber: ID!
  #   processName: String!
  #   ignoreStage: Int
  #   levels: [Level]
  # }

  type Workflow {
    id: ID!
    workflowNumber: String
    # instanceOfProcess: Process
    nextStageName: String
    passedStages: [Stage]
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
    supportCompany: RelatedFieldFilter!
    supportTelephone1: ContainsSearchType!
    supportTelephone2: ContainsSearchType!
  }
  input AssetFilter {
    equipment: RelatedFieldFilter!
    publicPropertyCode: ContainsSearchType!
    place: RelatedFieldFilter!
  }
  type TransferedAssetsOutput {
    oxygen_50l_factory: Int
    bihoshi_50l_factory: Int
    shaft_50l_factory: Int
    controlValve_50l_factory: Int
    co2_50l_factory: Int
    argon_50l_factory: Int
    azete_50l_factory: Int
    dryAir_50l_factory: Int
    entonox_50l_factory: Int
    acetylene_50l_factory: Int
    lpg_50l_factory: Int
    oxygen_50l_customer: Int
    bihoshi_50l_customer: Int
    shaft_50l_customer: Int
    controlValve_50l_customer: Int
    co2_50l_customer: Int
    argon_50l_customer: Int
    azete_50l_customer: Int
    dryAir_50l_customer: Int
    entonox_50l_customer: Int
    acetylene_50l_customer: Int
    lpg_50l_customer: Int
    oxygen_40l_factory: Int
    bihoshi_40l_factory: Int
    shaft_40l_factory: Int
    controlValve_40l_factory: Int
    co2_40l_factory: Int
    argon_40l_factory: Int
    azete_40l_factory: Int
    dryAir_40l_factory: Int
    entonox_40l_factory: Int
    acetylene_40l_factory: Int
    lpg_40l_factory: Int
    oxygen_40l_customer: Int
    bihoshi_40l_customer: Int
    shaft_40l_customer: Int
    controlValve_40l_customer: Int
    co2_40l_customer: Int
    argon_40l_customer: Int
    azete_40l_customer: Int
    dryAir_40l_customer: Int
    entonox_40l_customer: Int
    acetylene_40l_customer: Int
    lpg_40l_customer: Int
  }
  
  input TransferedAssets {
    oxygen_50l_factory: Int
    bihoshi_50l_factory: Int
    shaft_50l_factory: Int
    controlValve_50l_factory: Int
    co2_50l_factory: Int
    argon_50l_factory: Int
    azete_50l_factory: Int
    dryAir_50l_factory: Int
    entonox_50l_factory: Int
    acetylene_50l_factory: Int
    lpg_50l_factory: Int
    oxygen_50l_customer: Int
    bihoshi_50l_customer: Int
    shaft_50l_customer: Int
    controlValve_50l_customer: Int
    co2_50l_customer: Int
    argon_50l_customer: Int
    azete_50l_customer: Int
    dryAir_50l_customer: Int
    entonox_50l_customer: Int
    acetylene_50l_customer: Int
    lpg_50l_customer: Int
    oxygen_40l_factory: Int
    bihoshi_40l_factory: Int
    shaft_40l_factory: Int
    controlValve_40l_factory: Int
    co2_40l_factory: Int
    argon_40l_factory: Int
    azete_40l_factory: Int
    dryAir_40l_factory: Int
    entonox_40l_factory: Int
    acetylene_40l_factory: Int
    lpg_40l_factory: Int
    oxygen_40l_customer: Int
    bihoshi_40l_customer: Int
    shaft_40l_customer: Int
    controlValve_40l_customer: Int
    co2_40l_customer: Int
    argon_40l_customer: Int
    azete_40l_customer: Int
    dryAir_40l_customer: Int
    entonox_40l_customer: Int
    acetylene_40l_customer: Int
    lpg_40l_customer: Int
  }
  type AggregatedTransferedAssetsOutput {
    oxygen_50l: Int
    bihoshi_50l: Int
    shaft_50l: Int
    controlValve_50l: Int
    co2_50l: Int
    argon_50l: Int
    azete_50l: Int
    dryAir_50l: Int
    entonox_50l: Int
    acetylene_50l: Int
    lpg_50l: Int
    oxygen_40l: Int
    bihoshi_40l: Int
    shaft_40l: Int
    controlValve_40l: Int
    co2_40l: Int
    argon_40l: Int
    azete_40l: Int
    dryAir_40l: Int
    entonox_40l: Int
    acetylene_40l: Int
    lpg_40l: Int
  }
  input AggregatedTransferedAssets {
    oxygen_50l: Int
    bihoshi_50l: Int
    shaft_50l: Int
    controlValve_50l: Int
    co2_50l: Int
    argon_50l: Int
    azete_50l: Int
    dryAir_50l: Int
    entonox_50l: Int
    acetylene_50l: Int
    lpg_50l: Int
    oxygen_40l: Int
    bihoshi_40l: Int
    shaft_40l: Int
    controlValve_40l: Int
    co2_40l: Int
    argon_40l: Int
    azete_40l: Int
    dryAir_40l: Int
    entonox_40l: Int
    acetylene_40l: Int
    lpg_40l: Int
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
    enterWorkflows(limit: Int, offset: Int): [Workflow]!
    enterWorkflowsCount: Int
    role(roleId: ID!): Role
    roles(limit: Int!, offset: Int!): [Role!]
    hasNextRole(limit: Int!, offset: Int!): Boolean!
    countAllRoles(limit: Int!, offset: Int!): Int
    getWorkflowNumber: String!
    tagData(tagId: ID!): Tag
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
    createEquipment(
      name: String!
      model: String
      factory: String
      serialNumber: String
      productionYear: String
      installationYear: String
      terminologyCode: String!
      hasInstructions: Boolean
      supportCompanyId: String
      supportTelephone1: String
      supportTelephone2: String
      edit: String
    ): Equipment!
    createAsset(
      equipmentId: String!
      publicPropertyCode: String!
      placeId: String!
      edit: String
    ): Place!
    createCategory(name: String!, superPlaceId: String!): ID!
    createEnterWorkflow(
      workflowNumber: String!
      havalehId: String!
      deliverer: String
      description: String
      transportationName: String!
      transportationTelephone: String!
      transportationTelephone2: String
      corporationRepresentativeId: String!
      date: String!
      assets: TransferedAssets
    ): String
    confirmReceiptByHospital(
      workflowNumber: String!
      havalehId: String
      deliverer: String
      description: String
      transportationName: String
      transportationTelephone: String
      transportationTelephone2: String
      date: String
      assets: AggregatedTransferedAssets
    ): Workflow
  }
`;

export default typeDefs;
