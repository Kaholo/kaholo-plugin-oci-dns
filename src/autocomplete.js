const identity = require("oci-identity");
const { getProvider } = require('./helpers');

function mapSettings(pluginSettings){
  const settings = {};
  pluginSettings.foreach(setting => {
    settings[setting.id] = setting.value;
  });
  return settings;
}

async function listCompartments(query, pluginSettings) {
  const settings = mapSettings(pluginSettings);
  const rootCompartment = settings.compartment;
  const provider = getProvider(settings);
  const identityClient = await new identity.IdentityClient({
    authenticationDetailsProvider: provider
  });
  const request = {
    compartmentId: rootCompartment
  };
  const response = await identityClient.listCompartments(request);
  let options = response.items.map((item) => ({ id: item.id, value: item.name}));
  if (!query) {
      return options;
  }
  const filteredList = options.filter(val => val.value.includes(query))
  return filteredList;
}

module.exports = {
    listCompartments
}
