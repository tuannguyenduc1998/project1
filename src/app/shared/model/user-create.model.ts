export class UserCreate {
  fullNameUser: string;
  userName: string;
  fullName: string;
  shortName: string;
  email: string;
  password: string;
  images:
    string[];
  cellPhoneNumber: string;
  identityCard: string;
  userType: string;
  supplyChainTypes:
    {
      key: string;
      value: string;
      displayText: string;
      code: string;
      typeGroup: string
    }[];
  enterpriseType: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  businessTypes:
    {
      id: string;
      name: string;
      description: string;
      parentId: string;
      sortOrder: 0;
      registFor: string
    }[];
  country: {
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
  district: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  commune: {
    key: string;
    value: string;
    displayText: string;
    code: string;
    typeGroup: string
  };
  village: string;
  street: string;
  taxCode: string;
  representativeName: string;
  phoneNumber: string;
  fax: string;
  website: string;
}
