export class SignUpData {
  userTypes:
    {
      key: string;
      value: string;
      displayText: string;
      code: string;
      typeGroup: string
    }[];
  supplyChainTypes:
    {
      id: string;
      name: string;
      description: string;
      type: number;
      sortOrder: number
    }[];
  businessTypes:
    {
      item: {
        id: string;
        name: string;
        description: string;
        parentId: string;
        sortOrder: number;
        registFor: string
      };
      children: {
        id: string;
        name: string;
        description: string;
        parentId: string;
        sortOrder: number;
        registFor: string
      }[]
    }[];
  enterpriseTypes:
    {
      key: string;
      value: string;
      displayText: string;
      code: string;
      typeGroup: string
    }[];
}
