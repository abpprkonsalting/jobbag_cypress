import { IconType } from '../enums/icon-types.enum';

export class Avatar {
  iconType: IconType;
  url: string;
}

export class Profession {
  id: number;
  parentId?: number;
  //countryIds: number[];
  name: string;
  avatar: Avatar;
  selected?: boolean;

  constructor(id: number,countryIds: number[],name: string,avatar: Avatar,parentId?: number) {
    this.id = id;
    this.parentId = (parentId != undefined && parentId != null) ? parentId : undefined;
    //this.countryIds = countryIds;
    this.name = name;
    this.avatar = avatar;
    this.selected = false;
  }
}
