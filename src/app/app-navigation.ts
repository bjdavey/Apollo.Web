import { UserInfo } from "./shared/infrastructure/interfaces";
import { LoggedUser } from "./shared/services/auth.service";

export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
    auth: (user) => { return true; }
  },
  {
    text: 'Vehicles',
    path: '/vehicles',
    icon: 'car',
    auth: (user) => { return true; }
  },
  {
    text: 'Orders',
    path: '/orders',
    icon: 'bookmark',
    auth: (user) => { return true; }
  },
  {
    text: 'Customers',
    path: '/customers',
    icon: 'card',
    auth: (user) => { return true; }
  },
  {
    text: 'Providers',
    path: '/providers',
    icon: 'product',
    auth: (user) => { return true; }
  },
  {
    text: 'Users',
    path: '/users',
    icon: 'group',
    auth: (user) => { return true; }
  }
];

export interface NavigationItem {
  text: string,
  path?: string,
  icon?: string,
  auth: (user: UserInfo) => boolean,
  items?: NavigationItem[]
}

export function IsPathAuthorized(navigationItem: NavigationItem): boolean {
  return navigationItem.auth(LoggedUser);
}

export function getItemByPath(navigationItems: NavigationItem[], path: string) {
  for (var item of navigationItems) {
    if (item.path == "/" + path)
      return item;
    else if (item.items) {
      var res = getItemByPath(item.items, path);
      if (res)
        return;
    }
  }
  return null;
}
