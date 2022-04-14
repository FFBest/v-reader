export default {
  user: {
    USER_CONFIG_LOAD: 'user.config.load',
    USER_CONFIG_LOAD_REPLY: 'user.config.load.reply',
  },
  userDefaultConfig: {
    app: {
      client_id: '',
      client_secret: '',
      scope: 'read write',
      redirect_uri: 'http://rr-inoreader',
      state: 'welcome rr-inoreader',
      use_proxy: false,
      proxy: '',
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
