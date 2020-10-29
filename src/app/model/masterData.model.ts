export class MasterData{
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

