import { avatarType } from '../enums/icon-types.enum';

export class Avatar {
  avatarType: avatarType;
  url: string;
}

export class Profession {
  id: number;
  categories?: Profession[];
  childrenProfessions?: Profession[];
  name: string;
  avatar: Avatar;
  selected?: boolean;

  constructor(id: number,name: string,avatar: Avatar,categories?: Profession[],childrenProfessions?: Profession[]) {
    this.id = id;
    this.categories = categories != undefined ? categories : undefined;
    this.childrenProfessions = childrenProfessions != undefined ? childrenProfessions : undefined;
    this.name = name;
    this.avatar = avatar;
    this.selected = false;
  }
}
