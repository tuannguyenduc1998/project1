export class RoleModel {
  roles:
    string[];
  groups:
    {
      id: string;
      name: string;
      description: string;
      otherDescription: string;
      canRequest: boolean;
      permissionRequestStatus: string;
    }[];
}
