// import antdv v3
import {
  ConfigProvider,
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Modal,
  Form,
  FormItem,
  Input,
  InputPassword,
  Switch,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
} from 'ant-design-vue';

export default {
  use(app) {
    app
      .use(ConfigProvider)
      .use(Layout)
      .use(LayoutHeader)
      .use(LayoutSider)
      .use(LayoutContent)
      .use(Modal)
      .use(Form)
      .use(FormItem)
      .use(Input)
      .use(InputPassword)
      .use(Switch)
      .use(Button)
      .use(Menu)
      .use(MenuItem)
      .use(MenuDivider);
  },
};
