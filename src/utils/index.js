import Contentstack from "contentstack"
import ContentstackLivePreview from "@contentstack/live-preview-utils"

const stackConfig = {
  api_key: "blt607a8e5058108ef4",
  delivery_token: "cs5097e57102ec8d1408def9d7",
  environment: "development",
  live_preview: {
    enable: true,
    host: "eu-api.contentstack.com",
    management_token: "cs415f5b61a0674c94fef7cacf",
    clientUrlParams: {
      host: "eu-app.contentstack.com",
    },
  },
}

const Stack = Contentstack.Stack(stackConfig)
Stack.setHost("eu-api.contentstack.com")

ContentstackLivePreview.init({
  enable: true,
  stackDetails: {
    apiKey: "blt607a8e5058108ef4",
  },
  stackSdk: Stack,
  ssr: false,
})

export default Stack
export const onEntryChange = ContentstackLivePreview.onEntryChange

export const gatsbyData = ContentstackLivePreview.getGatsbyDataFormat

export const addEditableTags = Contentstack.Utils.addEditableTags
