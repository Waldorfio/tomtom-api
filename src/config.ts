interface Config {
  apiKey: string
  apiVer: string
}

export const tomtomConfig = (): Config => {
  const apiKey = process.env.TOMTOM_API_KEY
  const apiVer = process.env.TOMTOM_API_VERSION

  if (!apiKey) {
    throw new Error('Missing TOMTOM_API_KEY! Have you set up your .env file?')
  }
  if (!apiVer) {
    throw new Error('Missing TOMTOM_API_VERSION! Have you set up your .env file?')
  }

  return {
    apiKey,
    apiVer,
  }
}
