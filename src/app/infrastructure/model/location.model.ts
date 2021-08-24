import { avatarType } from '../enums/icon-types.enum';
import { StringifyOptions } from 'querystring';

export class Location {
  id: number;
  parentId?: number;
  name: string;
  isoCode: string;
  flagUrl: string;
  selected?: number;
  children: Location[];

  constructor(id: number, name: string, isoCode: string, flagUrl: string, children: Location[], parentId?: number) {
    this.id = id;
    this.parentId = (parentId !== undefined && parentId != null) ? parentId : undefined;
    this.name = name;
    this.flagUrl = flagUrl;
    this.isoCode = isoCode;
    this.selected = 0;
    this.children = children.map(child => new Location(child.id, child.name, child.isoCode, child.flagUrl, child.children, child.parentId));
  }

  public flaten() {

    let children = [];
    if (this.children.length > 0) {
      children = this.children.map(child => child.flaten());
    }

    const parentId = this.parentId != null ? String(this.parentId) : null;
    return {
      id: String(this.id),
      parentId,
      name: this.name,
      isoCode: this.isoCode,
      flagUrl: this.flagUrl,
      children
    };
  }

}
