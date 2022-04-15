export default {
  user: {
    USER_CONFIG_LOAD: 'user.config.load',
    USER_CONFIG_LOAD_REPLY: 'user.config.load.reply',
    USER_CONFIG_SAVE: 'user.config.save',
    USER_CONFIG_SAVE_REPLY: 'user.config.save.reply',
  },
  userDefaultConfig: {
    app: {
      app_id: '',
      app_key: '',
      scope: 'read write',
      redirect_uri: 'http://rr-inoreader',
      state: 'welcome rr-inoreader',
      use_proxy: false,
      proxy_protocol: 'socks5',
      proxy_ip: '',
      proxy_port: '',
    },
    token: {
      access_token: '',
      expires_in: '',
      token_type: '',
      scope: 'read write',
      refresh_token: '',
      code: '',
      expirse_time: '',
    },
  },
};
