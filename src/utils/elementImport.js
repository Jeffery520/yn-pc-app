// 按需加载ElementUi
import "element-ui/lib/theme-chalk/index.css";
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Container,
  Header,
  Aside,
  Main,
  Avatar,
  Select,
  Tooltip,
  Button
} from "element-ui";

export default Vue => {
  Vue.component(Menu.name, Menu);
  Vue.component(Submenu.name, Submenu);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(MenuItemGroup.name, MenuItemGroup);
  Vue.component(Icon.name, Icon);
  Vue.component(Container.name, Container);
  Vue.component(Header.name, Header);
  Vue.component(Aside.name, Aside);
  Vue.component(Main.name, Main);
  Vue.component(Avatar.name, Avatar);
  Vue.component(Select.name, Select);
  Vue.component(Tooltip.name, Tooltip);
  Vue.component(Button.name, Button);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
};
