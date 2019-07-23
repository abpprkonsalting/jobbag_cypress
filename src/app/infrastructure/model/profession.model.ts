import { IconType } from '../enums/icon-types.enum';

export class Avatar {
  type: IconType;
  url: string;
}

export class Profession {
  id: number;
  parentId?: number;
  countryIds: number[];
  name: string;
  avatar: Avatar;

  constructor(id: number,countryIds: number[],name: string,avatar: Avatar,parentId?: number) {
    this.id = id;
    this.parentId = parentId != null ? parentId : undefined;
    this.countryIds = countryIds;
    this.name = name;
    this.avatar = avatar;
  }
}
