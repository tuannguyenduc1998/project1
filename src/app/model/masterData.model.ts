export class MasterData {
  groupName: string;
  childs: MasterDataChild[];
}

export class MasterDataChild {
  key: string;
  value: string;
  displayText: string;
  code: string;
  typeGroup: string;
}

export class MasterDataAddress {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: string;
  childs: MasterDataAddressChildProvince[];
}

export class MasterDataAddressChildProvince {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: string;
  childs: MasterDataAddressChildDistrict[];
}

export class MasterDataAddressChildDistrict {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: string;
  childs: MasterDataAddressChildWard[];
}

export class MasterDataAddressChildWard {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: string;
  childs: null;
}

export class CreateFromForest{
  value: string;
  code: boolean;
}

export const createFromForest = [
  {
    value: 'Hs rừng',
    code: true,
  },
  {
    value: 'Hs mua bán cây đứng',
    code: false,
  }
];
