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
  public username: string;
  public password: string;
}
