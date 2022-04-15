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
  Switch,
  Button,
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
      .use(Switch)
      .use(Button);
  },
};
