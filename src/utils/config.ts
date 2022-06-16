type EnvType = 'development' | 'test' | 'prod'

const config = {
  development: {
    env: 'dev',
    hostname: '/api'
    // hostname: 'http://192.168.50.17/api'
  },
  test: {
    env: 'test',
    hostname: 'http://192.168.50.17/test'
  },
  prod: {
    env: 'prod',
    hostname: ''
  }
}

const ENV = import.meta.env.MODE as EnvType
export default config[ENV]
