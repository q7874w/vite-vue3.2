type EnvType = 'development' | 'test' | 'prod'

const config = {
  development: {
    env: 'dev',
    hostname: '/api'
    // hostname: 'http://www.ylwl.com/test'
  },
  test: {
    env: 'test',
    hostname: 'http://www.ylwl.com/test'
  },
  prod: {
    env: 'prod',
    hostname: ''
  }
}

const ENV = import.meta.env.MODE as EnvType
export default config[ENV]
