import { IconType } from '../enums/icon-types.enum';

export class Location {
  id: number;
  parentId?: number;
  name: string;
  isoCode: string;
  flagUrl: string;
  selected?: number;
  children: Location[];

  constructor(id: number,name: string,isoCode: string, flagUrl: string,children: Location[],parentId?: number) {
    this.id = id;
    this.parentId = (parentId != undefined && parentId != null) ? parentId : undefined;
    this.name = name;
    this.flagUrl = flagUrl;
    this.isoCode = isoCode;
    this.selected = 0;
    this.children = children;
  }
}
