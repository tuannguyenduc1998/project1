export class User {
  id: string;
  fullName: string;
  shortName: string;
  userType: string;
  userId: string;
  taxCode: string;
  representativeName: string;
  representativePosition: string;
  representativeIdCard: string;
  representativePhoneNumber: string;
  representativeEmail: string;
  cellphoneNumber: string;
  phoneNumber: string;
  fax: string;
  webSite: string;
  updatedDate: number;
  enterpriseType: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  supplyChainTypes:
    {
      key: string;
      value: string;
      displayText: string;
      code: string;
      typeGroup: string
    }[];
  businessTypes:
    {
      id: string;
      name: string;
      description: string;
      parentId: string;
      sortOrder: number;
      registFor: string
    }[];
  commune: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  district: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  province: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  village: string;
  street: string;
  logoImage: string;
  coCode: string;
  ownershipType: string;
  ownershipTypeDescription: string;
  establishmentDate: number;
  registrationCertificateDate: number;
  registrationCertificatePlace: string;
  contactName: string;
  contactPosition: string;
  organizationType: string;
  organizationTypeDescription: string;
  identityCard: string;
  identityCardIssuedDate: number;
  identityCardIssuedBy: string;
  permanentAddressCommune: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  permanentAddressDistrict: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  permanentAddressProvince: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  permanentAddressVillage: string;
  permanentAddressStreet: string;
  diffrentAddressReason: string;
  images:
    string[];
  houseRegistrationImages:
    string[];
  forestOwnerType: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  groups:
    {
      id: string;
      name: string;
      description: string;
      otherDescription: string;
      canRequest: true
    }[];
  forestProfileCount: number;
  accountEmail: string;
  fullNameUser: string;
  waitingApproveGroups:
    {
      id: string;
      name: string;
      description: string;
      otherDescription: string;
      canRequest: true
    }[];
}

export class UserLoginData {
  id: string;
  userName: string;
  fullName: string;
  userId: string;
  email: string;
  status: string;
  coCode: string;
  jwtToken: string;
  userType: string;
  userTypeVi: string;
  avatar: {
    guid: string;
    thumbSizeUrl: string;
    largeSizeUrl: string
  };
  roles: [
    string
  ];
  businessTypes:
    {
      id: string;
      name: string;
      description: string;
      parentId: string;
      sortOrder: number;
      registFor: string
    }[];
}

export class ImgeFiles {
  id: string;
  orgFileName: string;
  orgFileExtension: string;
  fileUrl: string;
  container: string;
}
