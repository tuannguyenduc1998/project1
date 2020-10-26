export class Employees {
  public id: number;
  public active: boolean;
  public avatar: string;
  public namecode: number;
  public name: string;
  public email: string;
  public nation: string;
  public status: string;
  public comment: string;
  public birthday: number;
  public works: WorkItem[];
}

export class WorkItem {
  item: Work;
  child: WorkItem[];
}

export class Work {
  id: string;
  nameWork: string;
  descriptionWork: string;
}

export const status = [
  'Độc thân',
  'Đã kết hôn'
];

export class EmployeeWorks {
  public id: number;
  public nameWork: string;
  public descriptionWork: string;
}

export class UserLogin{
  public userName: string;
  public password: string;
  public deviceType: string;
  public token: any;
}

